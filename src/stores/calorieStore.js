import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { useAuthStore } from './auth';
import {
  addCalorieEntry,
  updateCalorieEntry,
  deleteCalorieEntryWithCascade,
  getDailyCalorieGoal,
  updateDailyCalorieGoal,
} from '@/utils/firestoreUtils';
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  doc,
} from 'firebase/firestore';
import { db } from '@/config/firebase';

export const useCalorieStore = defineStore('calorie', () => {
  const authStore = useAuthStore();

  // State
  const entries = ref([]);
  const dailyGoal = ref(2000);
  const isLoadingEntries = ref(false);
  const isLoadingGoal = ref(false);
  const error = ref(null);
  const unsubscribeEntries = ref(null);
  const unsubscribeGoal = ref(null);

  // Computed - Filter entries by period
  const todaysEntries = computed(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayEnd = new Date(today);
    todayEnd.setHours(23, 59, 59, 999);

    const filtered = entries.value.filter(entry => {
      const entryDate = new Date(entry.timestamp);
      const isInRange = entryDate >= today && entryDate <= todayEnd;
      return isInRange;
    }).sort((a, b) => b.timestamp - a.timestamp);

    if (entries.value.length > 0 && filtered.length === 0) {
      console.warn('⚠️ All entries filtered out for today. Total entries:', entries.value.length);
      console.warn('Today range:', new Date(today).toISOString(), '-', new Date(todayEnd).toISOString());
      console.warn('Sample entry timestamps:', entries.value.slice(0, 2).map(e => new Date(e.timestamp).toISOString()));
    }

    return filtered;
  });

  const thisWeekEntries = computed(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    const mondayDate = new Date(today);
    mondayDate.setDate(today.getDate() - daysToMonday);
    mondayDate.setHours(0, 0, 0, 0);

    const sundayDate = new Date(mondayDate);
    sundayDate.setDate(mondayDate.getDate() + 6);
    sundayDate.setHours(23, 59, 59, 999);

    return entries.value.filter(entry => {
      const entryDate = new Date(entry.timestamp);
      return entryDate >= mondayDate && entryDate <= sundayDate;
    }).sort((a, b) => b.timestamp - a.timestamp);
  });

  const thisMonthEntries = computed(() => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    lastDay.setHours(23, 59, 59, 999);

    return entries.value.filter(entry => {
      const entryDate = new Date(entry.timestamp);
      return entryDate >= firstDay && entryDate <= lastDay;
    }).sort((a, b) => b.timestamp - a.timestamp);
  });

  const todaysCalorieTotal = computed(() => {
    return todaysEntries.value.reduce((total, entry) => total + (entry.calories || 0), 0);
  });

  const weekCalorieTotal = computed(() => {
    return thisWeekEntries.value.reduce((total, entry) => total + (entry.calories || 0), 0);
  });

  const monthCalorieTotal = computed(() => {
    return thisMonthEntries.value.reduce((total, entry) => total + (entry.calories || 0), 0);
  });

  // Setup real-time listener for entries
  function setupEntriesListener() {
    if (!authStore.user) {
      console.error('❌ No user logged in');
      return;
    }

    // Unsubscribe from previous listener if exists
    if (unsubscribeEntries.value) {
      unsubscribeEntries.value();
    }

    try {
      isLoadingEntries.value = true;
      const userEmail = authStore.user.email;
      console.log('🔄 Setting up entries listener for user:', userEmail);
      const entriesRef = collection(db, `users/${userEmail}/calorieEntries`);

      // Try with orderBy first, with detailed error handling
      let q;
      try {
        q = query(entriesRef, orderBy('timestamp', 'desc'));
        console.log('📋 Query created with orderBy timestamp');
      } catch (queryErr) {
        console.warn('⚠️ OrderBy query failed, falling back to unordered query:', queryErr.message);
        q = query(entriesRef);
      }

      unsubscribeEntries.value = onSnapshot(q, (snapshot) => {
        console.log('📡 onSnapshot fired! Docs count:', snapshot.docs.length);
        entries.value = snapshot.docs.map(doc => {
          const data = doc.data();
          let timestamp = Date.now();

          // Handle Firestore Timestamp object properly
          if (data.timestamp) {
            if (typeof data.timestamp.toMillis === 'function') {
              timestamp = data.timestamp.toMillis();
            } else if (typeof data.timestamp === 'number') {
              timestamp = data.timestamp;
            } else if (data.timestamp instanceof Date) {
              timestamp = data.timestamp.getTime();
            } else {
              console.warn('⚠️ Unknown timestamp type:', typeof data.timestamp, data.timestamp);
              timestamp = Date.now();
            }
          }

          return {
            id: doc.id,
            ...data,
            timestamp: timestamp,
          };
        });
        console.log('✅ Entries synced via real-time listener:', entries.value.length);
        if (entries.value.length > 0) {
          console.log('📊 Sample entries:', entries.value.slice(0, 2).map(e => ({ id: e.id, food: e.food, timestamp: new Date(e.timestamp).toISOString() })));
        }
        isLoadingEntries.value = false;
        error.value = null;
      }, (err) => {
        console.error('❌ ERROR in onSnapshot callback:', err.code, err.message);
        console.error('Full error:', err);
        error.value = `Failed to load entries: ${err.message}`;
        isLoadingEntries.value = false;

        // If it's a "failed-precondition" error, it's likely a missing index
        if (err.code === 'failed-precondition') {
          console.error('🔗 MISSING INDEX ERROR - Please create the index in Firebase Console');
          console.error('Collection: users/{userEmail}/calorieEntries');
          console.error('Field: timestamp (Descending)');
        }
      });

      console.log('✅ Listener subscription created');
    } catch (err) {
      console.error('❌ Error in setupEntriesListener (try block):', err.message);
      console.error('Full error:', err);
      error.value = `Failed to initialize entries listener: ${err.message}`;
      isLoadingEntries.value = false;
    }
  }

  // Setup real-time listener for daily goal
  function setupGoalListener() {
    console.log('🎯 setupGoalListener called');
    if (!authStore.user) {
      console.error('❌ No user logged in');
      return;
    }

    // Unsubscribe from previous listener if exists
    if (unsubscribeGoal.value) {
      console.log('🔄 Unsubscribing from previous goal listener');
      unsubscribeGoal.value();
    }

    try {
      isLoadingGoal.value = true;
      const userEmail = authStore.user.email;
      console.log('📡 Setting up real-time listener for goal at:', userEmail);
      // Check if the settings collection exists first
      const userDoc = collection(db, `users`);
      const userRef = doc(userDoc, userEmail);

      // Listen to the user document directly instead of a subcollection
      unsubscribeGoal.value = onSnapshot(userRef, (docSnapshot) => {
        console.log('🔔 Goal listener onSnapshot fired! Doc exists:', docSnapshot.exists());
        if (docSnapshot.exists()) {
          console.log('📋 Document data:', docSnapshot.data());
          if (docSnapshot.data().dailyCalorieGoal) {
            dailyGoal.value = docSnapshot.data().dailyCalorieGoal || 2000;
            console.log('✅ Daily goal synced:', dailyGoal.value);
          } else {
            console.log('⚠️ dailyCalorieGoal field missing in document');
          }
        }
        isLoadingGoal.value = false;
      }, (err) => {
        // Silently fail for goal listener - it's not critical
        console.warn('⚠️ Could not load goal (using default 2000):', err.message);
        isLoadingGoal.value = false;
      });
      console.log('✅ Goal listener subscription created');
    } catch (err) {
      console.error('❌ Error in setupGoalListener:', err);
      isLoadingGoal.value = false;
    }
  }

  // CRUD Actions
  async function addEntry(entryData) {
    console.log('➕ Adding new entry...');

    if (!authStore.user) {
      error.value = 'Please log in to add entries.';
      throw new Error('No user logged in');
    }

    try {
      const docId = await addCalorieEntry(authStore.user.email, entryData);
      console.log('✅ Entry added with ID:', docId);
      return docId;
    } catch (err) {
      console.error('❌ Error adding entry:', err);
      error.value = 'Failed to add entry. Please try again.';
      throw err;
    }
  }

  async function editEntry(entryId, entryData) {
    console.log('✏️ Editing entry:', entryId);

    if (!authStore.user) {
      error.value = 'Please log in to edit entries.';
      throw new Error('No user logged in');
    }

    try {
      await updateCalorieEntry(authStore.user.email, entryId, entryData);
      console.log('✅ Entry updated successfully');
      // Real-time listener will automatically update local state
    } catch (err) {
      console.error('❌ Error updating entry:', err);
      error.value = 'Failed to update entry. Please try again.';
      throw err;
    }
  }

  async function removeEntry(entryId) {
    console.log('🗑️ Deleting entry (cascade):', entryId);

    if (!authStore.user) {
      error.value = 'Please log in to delete entries.';
      throw new Error('No user logged in');
    }

    try {
      // Use cascade delete - will also delete linked meal if it exists
      await deleteCalorieEntryWithCascade(authStore.user.email, entryId);
      console.log('✅ Entry deleted successfully (and linked meal if it existed)');
      // Real-time listener will automatically update local state
    } catch (err) {
      console.error('❌ Error deleting entry:', err);
      error.value = 'Failed to delete entry. Please try again.';
      throw err;
    }
  }

  async function updateGoal(newGoal) {
    console.log('💾 Updating daily goal:', newGoal);

    if (!authStore.user) {
      error.value = 'Please log in to update your goal.';
      throw new Error('No user logged in');
    }

    try {
      await updateDailyCalorieGoal(authStore.user.email, newGoal);
      // Real-time listener will automatically update local state
      console.log('✅ Daily goal updated successfully');
    } catch (err) {
      console.error('❌ Error updating goal:', err);
      error.value = 'Failed to update goal. Please try again.';
      throw err;
    }
  }

  // Cleanup function
  function cleanup() {
    if (unsubscribeEntries.value) {
      unsubscribeEntries.value();
      unsubscribeEntries.value = null;
    }
    if (unsubscribeGoal.value) {
      unsubscribeGoal.value();
      unsubscribeGoal.value = null;
    }
  }

  // Initialize listeners when user logs in
  watch(() => authStore.user, (newUser) => {
    console.log('👀 calorieStore Watch triggered! newUser:', newUser?.email || 'null');
    if (newUser) {
      console.log('📝 calorieStore: User logged in, setting up listeners for:', newUser.email);
      setupEntriesListener();
      setupGoalListener();
    } else {
      console.log('🚪 calorieStore: User logged out, cleaning up listeners');
      cleanup();
      entries.value = [];
      dailyGoal.value = 2000;
    }
  }, { immediate: true });

  // Manual initialization - if user is already logged in when store is created
  if (authStore.user) {
    console.log('⚡ User already logged in at store creation, initializing listeners for:', authStore.user.email);
    setupEntriesListener();
    setupGoalListener();
  }

  return {
    // State
    entries,
    dailyGoal,
    isLoadingEntries,
    isLoadingGoal,
    error,

    // Computed
    todaysEntries,
    thisWeekEntries,
    thisMonthEntries,
    todaysCalorieTotal,
    weekCalorieTotal,
    monthCalorieTotal,

    // Methods
    setupEntriesListener,
    setupGoalListener,
    addEntry,
    editEntry,
    removeEntry,
    updateGoal,
    cleanup,
  };
});
