import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { useAuthStore } from './auth';
import {
  addMealPlan,
  updateMealPlan,
  deleteMealPlanWithCascade,
} from '@/utils/firestoreUtils';
import {
  collection,
  query,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '@/config/firebase';

export const useMealPlanStore = defineStore('mealPlan', () => {
  const authStore = useAuthStore();

  // State
  const meals = ref([]);
  const isLoadingMeals = ref(false);
  const error = ref(null);
  const unsubscribeMeals = ref(null);

  // Computed - Get meals for a specific date
  const getMealsForDate = computed(() => {
    return (date) => {
      const dateString = new Date(date).toISOString().split('T')[0];
      return meals.value.filter(meal => {
        const mealDateString = new Date(meal.date).toISOString().split('T')[0];
        return mealDateString === dateString;
      });
    };
  });

  // Computed - Get meals for current week
  const thisWeekMeals = computed(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    const mondayDate = new Date(today);
    mondayDate.setDate(today.getDate() - daysToMonday);
    mondayDate.setHours(0, 0, 0, 0);

    const sundayDate = new Date(mondayDate);
    sundayDate.setDate(mondayDate.getDate() + 6);
    sundayDate.setHours(23, 59, 59, 999);

    return meals.value.filter(meal => {
      const mealDate = new Date(meal.date);
      return mealDate >= mondayDate && mealDate <= sundayDate;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  });

  // Computed - Get upcoming meals (from today onwards)
  const upcomingMeals = computed(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return meals.value.filter(meal => {
      const mealDate = new Date(meal.date);
      mealDate.setHours(0, 0, 0, 0);
      return mealDate >= today;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  });

  // Setup real-time listener for meals
  function setupMealsListener() {
    if (!authStore.user) {
      console.error('❌ No user logged in');
      return;
    }

    // Unsubscribe from previous listener if exists
    if (unsubscribeMeals.value) {
      unsubscribeMeals.value();
    }

    try {
      isLoadingMeals.value = true;
      const userEmail = authStore.user.email;
      console.log('🔄 Setting up meals listener for user:', userEmail);
      const mealsRef = collection(db, `users/${userEmail}/mealPlans`);

      const q = query(mealsRef);

      unsubscribeMeals.value = onSnapshot(q, (snapshot) => {
        console.log('📡 onSnapshot fired for meals! Docs count:', snapshot.docs.length);
        meals.value = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
          };
        });
        console.log('✅ Meals synced via real-time listener:', meals.value.length);
        if (meals.value.length > 0) {
          console.log('📊 Sample meals:', meals.value.slice(0, 2).map(m => ({ id: m.id, name: m.name, date: m.date })));
        }
        isLoadingMeals.value = false;
        error.value = null;
      }, (err) => {
        console.error('❌ ERROR in onSnapshot callback for meals:', err.code, err.message);
        error.value = `Failed to load meals: ${err.message}`;
        isLoadingMeals.value = false;
      });

      console.log('✅ Meals listener subscription created');
    } catch (err) {
      console.error('❌ Error in setupMealsListener:', err.message);
      error.value = `Failed to initialize meals listener: ${err.message}`;
      isLoadingMeals.value = false;
    }
  }

  // CRUD Actions
  async function addMeal(mealData) {
    console.log('➕ Adding new meal...');

    if (!authStore.user) {
      error.value = 'Please log in to add meals.';
      throw new Error('No user logged in');
    }

    try {
      const docId = await addMealPlan(authStore.user.email, mealData);
      console.log('✅ Meal added with ID:', docId);
      return docId;
    } catch (err) {
      console.error('❌ Error adding meal:', err);
      error.value = 'Failed to add meal. Please try again.';
      throw err;
    }
  }

  async function editMeal(mealId, mealData) {
    console.log('✏️ Editing meal:', mealId);

    if (!authStore.user) {
      error.value = 'Please log in to edit meals.';
      throw new Error('No user logged in');
    }

    try {
      await updateMealPlan(authStore.user.email, mealId, mealData);
      console.log('✅ Meal updated successfully');
      // Real-time listener will automatically update local state
    } catch (err) {
      console.error('❌ Error updating meal:', err);
      error.value = 'Failed to update meal. Please try again.';
      throw err;
    }
  }

  async function removeMeal(mealId) {
    console.log('🗑️ Deleting meal (cascade):', mealId);

    if (!authStore.user) {
      error.value = 'Please log in to delete meals.';
      throw new Error('No user logged in');
    }

    try {
      // Use cascade delete - will also delete linked calorie entry if it exists
      await deleteMealPlanWithCascade(authStore.user.email, mealId);
      console.log('✅ Meal deleted successfully (and linked calorie entry if it existed)');
      // Real-time listener will automatically update local state
    } catch (err) {
      console.error('❌ Error deleting meal:', err);
      error.value = 'Failed to delete meal. Please try again.';
      throw err;
    }
  }

  // Cleanup function
  function cleanup() {
    if (unsubscribeMeals.value) {
      unsubscribeMeals.value();
      unsubscribeMeals.value = null;
    }
  }

  // Initialize listeners when user logs in
  watch(() => authStore.user, (newUser) => {
    console.log('👀 Watch triggered for meals! newUser:', newUser?.email || 'null');
    if (newUser) {
      console.log('📝 User logged in, setting up meals listener for:', newUser.email);
      setupMealsListener();
    } else {
      console.log('🚪 User logged out, cleaning up meals listener');
      cleanup();
      meals.value = [];
    }
  }, { immediate: true });

  // Manual initialization - if user is already logged in when store is created
  if (authStore.user) {
    console.log('⚡ User already logged in at store creation, initializing meals listener for:', authStore.user.email);
    setupMealsListener();
  }

  return {
    // State
    meals,
    isLoadingMeals,
    error,

    // Computed
    getMealsForDate,
    thisWeekMeals,
    upcomingMeals,

    // Methods
    setupMealsListener,
    addMeal,
    editMeal,
    removeMeal,
    cleanup,
  };
});
