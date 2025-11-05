import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useAuthStore } from './auth';
import { updateMonthlyBudget } from '@/utils/firestoreUtils';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/config/firebase';

export const usePreferencesStore = defineStore('preferences', () => {
  const authStore = useAuthStore();

  // State
  const monthlyBudget = ref(0);
  const isLoadingBudget = ref(false);
  const error = ref(null);
  const unsubscribeBudget = ref(null);

  /**
   * Setup real-time listener for monthly budget
   */
  function setupBudgetListener() {
    if (!authStore.user) {
      console.warn('⚠️ No user logged in, skipping budget listener setup');
      return;
    }

    try {
      isLoadingBudget.value = true;
      const userEmail = authStore.user.email;
      const userRef = doc(db, 'users', userEmail);

      // Listen to the user document for budget changes
      unsubscribeBudget.value = onSnapshot(userRef, (docSnapshot) => {
        if (docSnapshot.exists() && docSnapshot.data().monthlyBudget !== undefined) {
          monthlyBudget.value = docSnapshot.data().monthlyBudget || 0;
          console.log('✅ Monthly budget synced:', monthlyBudget.value);
        }
        isLoadingBudget.value = false;
      }, (err) => {
        // Silently fail for budget listener - it's not critical
        console.warn('⚠️ Could not load budget (using default 0):', err.message);
        isLoadingBudget.value = false;
      });
    } catch (err) {
      console.error('❌ Error in setupBudgetListener:', err);
      isLoadingBudget.value = false;
    }
  }

  /**
   * Update monthly budget
   * @param {number} newBudget - New budget amount
   */
  async function updateBudget(newBudget) {
    console.log('💾 Updating monthly budget:', newBudget);

    if (!authStore.user) {
      error.value = 'Please log in to update your budget.';
      throw new Error('No user logged in');
    }

    try {
      await updateMonthlyBudget(authStore.user.email, newBudget);
      // Real-time listener will automatically update local state
      console.log('✅ Monthly budget updated successfully');
    } catch (err) {
      console.error('❌ Error updating budget:', err);
      error.value = 'Failed to update budget. Please try again.';
      throw err;
    }
  }

  /**
   * Cleanup function - unsubscribe from listeners
   */
  function cleanup() {
    if (unsubscribeBudget.value) {
      unsubscribeBudget.value();
      unsubscribeBudget.value = null;
    }
  }

  // Automatically setup listener when user logs in
  watch(() => authStore.user, (newUser) => {
    if (newUser) {
      setupBudgetListener();
    } else {
      cleanup();
    }
  }, { immediate: true });

  return {
    // State
    monthlyBudget,
    isLoadingBudget,
    error,

    // Methods
    setupBudgetListener,
    updateBudget,
    cleanup,
  };
});
