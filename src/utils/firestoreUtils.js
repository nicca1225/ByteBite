/**
 * Firestore Utilities for ByteBite
 *
 * Centralized data operations for meal plans and calorie entries.
 * All data is organized by user and collection type.
 */

import { db } from '@/config/firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';

/**
 * MEAL PLANS OPERATIONS
 * Collection Structure: users/{userEmail}/mealPlans/{mealId}
 */

/**
 * Load all meal plans for a user
 * @param {string} userEmail - User email address
 * @returns {Promise<Array>} Array of meal plan objects
 */
export async function loadUserMealPlans(userEmail) {
  try {
    if (!userEmail) {
      console.error('❌ No userEmail provided');
      return [];
    }

    console.log('📦 Loading meal plans for user:', userEmail);

    const mealPlansRef = collection(db, `users/${userEmail}/mealPlans`);
    const q = query(mealPlansRef);

    const querySnapshot = await getDocs(q);

    const mealPlans = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toMillis() || Date.now(),
      updatedAt: doc.data().updatedAt?.toMillis() || Date.now(),
    }));

    console.log('✅ Loaded', mealPlans.length, 'meal plans');
    return mealPlans;
  } catch (error) {
    console.error('❌ Error loading meal plans:', error);
    throw new Error(`Failed to load meal plans: ${error.message}`);
  }
}

/**
 * Get meals for a specific date
 * @param {string} userEmail - User email address
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {Promise<Array>} Array of meals for that date
 */
export async function getMealsForDate(userEmail, date) {
  try {
    if (!userEmail || !date) {
      console.error('❌ Missing userEmail or date');
      return [];
    }

    console.log('🔍 Getting meals for date:', date);

    const mealPlansRef = collection(db, `users/${userEmail}/mealPlans`);
    const q = query(mealPlansRef, where('date', '==', date));

    const querySnapshot = await getDocs(q);

    const meals = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log('✅ Found', meals.length, 'meals for', date);
    return meals;
  } catch (error) {
    console.error('❌ Error getting meals for date:', error);
    throw new Error(`Failed to get meals: ${error.message}`);
  }
}

/**
 * Add a new meal plan
 * @param {string} userEmail - User email address
 * @param {Object} mealData - { date, type, name, calories?, time? }
 * @returns {Promise<string>} Document ID of the new meal
 */
export async function addMealPlan(userEmail, mealData) {
  try {
    if (!userEmail) {
      console.error('❌ No userEmail provided');
      throw new Error('User email is required');
    }

    if (!mealData.date || !mealData.type || !mealData.name) {
      console.error('❌ Missing required fields');
      throw new Error('Date, type, and name are required');
    }

    console.log('➕ Adding meal plan:', mealData);

    const mealPlanData = {
      date: mealData.date,
      type: mealData.type,
      name: mealData.name,
      calories: mealData.calories || null,
      time: mealData.time || null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const mealPlansRef = collection(db, `users/${userEmail}/mealPlans`);
    const docRef = await addDoc(mealPlansRef, mealPlanData);

    console.log('✅ Meal plan added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error adding meal plan:', error);
    throw new Error(`Failed to add meal plan: ${error.message}`);
  }
}

/**
 * Update an existing meal plan
 * @param {string} userEmail - User email address
 * @param {string} mealId - Meal plan document ID
 * @param {Object} mealData - Fields to update
 * @returns {Promise<void>}
 */
export async function updateMealPlan(userEmail, mealId, mealData) {
  try {
    if (!userEmail || !mealId) {
      console.error('❌ Missing userEmail or mealId');
      throw new Error('User email and Meal ID are required');
    }

    console.log('✏️ Updating meal plan:', mealId);

    const mealRef = doc(db, `users/${userEmail}/mealPlans/${mealId}`);
    const updateData = {
      ...mealData,
      updatedAt: serverTimestamp(),
    };

    await updateDoc(mealRef, updateData);

    console.log('✅ Meal plan updated');
  } catch (error) {
    console.error('❌ Error updating meal plan:', error);
    throw new Error(`Failed to update meal plan: ${error.message}`);
  }
}

/**
 * Delete a meal plan
 * @param {string} userEmail - User email address
 * @param {string} mealId - Meal plan document ID
 * @returns {Promise<void>}
 */
export async function deleteMealPlan(userEmail, mealId) {
  try {
    if (!userEmail || !mealId) {
      console.error('❌ Missing userEmail or mealId');
      throw new Error('User email and Meal ID are required');
    }

    console.log('🗑️ Deleting meal plan:', mealId);

    const mealRef = doc(db, `users/${userEmail}/mealPlans/${mealId}`);
    await deleteDoc(mealRef);

    console.log('✅ Meal plan deleted');
  } catch (error) {
    console.error('❌ Error deleting meal plan:', error);
    throw new Error(`Failed to delete meal plan: ${error.message}`);
  }
}

/**
 * CALORIE ENTRIES OPERATIONS
 * Collection Structure: users/{userEmail}/calorieEntries/{entryId}
 */

/**
 * Load calorie entries for today
 * @param {string} userEmail - User email address
 * @returns {Promise<Array>} Array of today's calorie entries
 */
export async function loadTodaysCalorieEntries(userEmail) {
  try {
    if (!userEmail) {
      console.error('❌ No userEmail provided');
      return [];
    }

    console.log('📦 Loading today\'s calorie entries for user:', userEmail);

    // Get start of today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();

    const calorieEntriesRef = collection(db, `users/${userEmail}/calorieEntries`);
    const q = query(calorieEntriesRef);

    const querySnapshot = await getDocs(q);

    const entries = querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toMillis() || Date.now(),
      }))
      .filter(entry => entry.timestamp >= todayTimestamp)
      .sort((a, b) => b.timestamp - a.timestamp);

    console.log('✅ Loaded', entries.length, 'calorie entries for today');
    return entries;
  } catch (error) {
    console.error('❌ Error loading calorie entries:', error);
    throw new Error(`Failed to load calorie entries: ${error.message}`);
  }
}

/**
 * Load calorie entries for a specific period (day, week, month)
 * @param {string} userEmail - User email address
 * @param {string} period - 'day', 'week', or 'month'
 * @returns {Promise<Array>} Array of calorie entries for the period
 */
export async function loadCalorieEntriesByPeriod(userEmail, period) {
  try {
    if (!userEmail || !period) {
      console.error('❌ Missing userEmail or period');
      return [];
    }

    console.log(`📦 Loading calorie entries for period: ${period}`);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let startDate = new Date(today);
    let endDate = new Date(today);
    endDate.setHours(23, 59, 59, 999);

    if (period === 'week') {
      // Get start of current week (Monday)
      const dayOfWeek = today.getDay();
      const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysToSubtract);
      startDate.setHours(0, 0, 0, 0);

      // End of week is next Sunday
      endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
    } else if (period === 'month') {
      // Get start of current month
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      startDate.setHours(0, 0, 0, 0);

      // End of month
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      endDate.setHours(23, 59, 59, 999);
    }
    // For 'day', startDate and endDate are already set to today

    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();

    const calorieEntriesRef = collection(db, `users/${userEmail}/calorieEntries`);
    const q = query(calorieEntriesRef);

    const querySnapshot = await getDocs(q);

    const entries = querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toMillis() || Date.now(),
      }))
      .filter(entry => entry.timestamp >= startTimestamp && entry.timestamp <= endTimestamp)
      .sort((a, b) => b.timestamp - a.timestamp);

    console.log(`✅ Loaded ${entries.length} calorie entries for ${period}`);
    return entries;
  } catch (error) {
    console.error('❌ Error loading calorie entries by period:', error);
    throw new Error(`Failed to load calorie entries: ${error.message}`);
  }
}

/**
 * Add a new calorie entry
 * @param {string} userEmail - User email address
 * @param {Object} entryData - { food, calories, mealType }
 * @returns {Promise<string>} Document ID of the new entry
 */
export async function addCalorieEntry(userEmail, entryData) {
  try {
    if (!userEmail) {
      console.error('❌ No userEmail provided');
      throw new Error('User email is required');
    }

    if (!entryData.food || !entryData.calories || !entryData.mealType) {
      console.error('❌ Missing required fields');
      throw new Error('Food, calories, and meal type are required');
    }

    console.log('➕ Adding calorie entry:', entryData);

    const calorieData = {
      food: entryData.food,
      calories: parseInt(entryData.calories),
      mealType: entryData.mealType,
      timestamp: serverTimestamp(),
      createdAt: serverTimestamp(),
    };

    const calorieEntriesRef = collection(db, `users/${userEmail}/calorieEntries`);
    const docRef = await addDoc(calorieEntriesRef, calorieData);

    console.log('✅ Calorie entry added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error adding calorie entry:', error);
    throw new Error(`Failed to add calorie entry: ${error.message}`);
  }
}

/**
 * Update a calorie entry
 * @param {string} userEmail - User email address
 * @param {string} entryId - Calorie entry document ID
 * @param {Object} entryData - Fields to update
 * @returns {Promise<void>}
 */
export async function updateCalorieEntry(userEmail, entryId, entryData) {
  try {
    if (!userEmail || !entryId) {
      console.error('❌ Missing userEmail or entryId');
      throw new Error('User email and Entry ID are required');
    }

    console.log('✏️ Updating calorie entry:', entryId);

    const entryRef = doc(db, `users/${userEmail}/calorieEntries/${entryId}`);
    const updateData = {
      ...entryData,
      updatedAt: serverTimestamp(),
    };

    await updateDoc(entryRef, updateData);

    console.log('✅ Calorie entry updated');
  } catch (error) {
    console.error('❌ Error updating calorie entry:', error);
    throw new Error(`Failed to update calorie entry: ${error.message}`);
  }
}

/**
 * Delete a calorie entry
 * @param {string} userEmail - User email address
 * @param {string} entryId - Calorie entry document ID
 * @returns {Promise<void>}
 */
export async function deleteCalorieEntry(userEmail, entryId) {
  try {
    if (!userEmail || !entryId) {
      console.error('❌ Missing userEmail or entryId');
      throw new Error('User email and Entry ID are required');
    }

    console.log('🗑️ Deleting calorie entry:', entryId);

    const entryRef = doc(db, `users/${userEmail}/calorieEntries/${entryId}`);
    await deleteDoc(entryRef);

    console.log('✅ Calorie entry deleted');
  } catch (error) {
    console.error('❌ Error deleting calorie entry:', error);
    throw new Error(`Failed to delete calorie entry: ${error.message}`);
  }
}

/**
 * Get calorie entries for a specific date range
 * @param {string} userEmail - User email address
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {Promise<Array>} Array of calorie entries in date range
 */
export async function getCalorieEntriesForDateRange(userEmail, startDate, endDate) {
  try {
    if (!userEmail) {
      console.error('❌ No userEmail provided');
      return [];
    }

    console.log('📦 Loading calorie entries for date range');

    const calorieEntriesRef = collection(db, `users/${userEmail}/calorieEntries`);
    const q = query(calorieEntriesRef);

    const querySnapshot = await getDocs(q);

    const startTime = startDate.getTime();
    const endTime = endDate.getTime();

    const entries = querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toMillis() || Date.now(),
      }))
      .filter(entry => entry.timestamp >= startTime && entry.timestamp <= endTime)
      .sort((a, b) => b.timestamp - a.timestamp);

    console.log('✅ Loaded', entries.length, 'calorie entries for date range');
    return entries;
  } catch (error) {
    console.error('❌ Error loading calorie entries for date range:', error);
    throw new Error(`Failed to load calorie entries: ${error.message}`);
  }
}

/**
 * FAVOURITE RECIPES OPERATIONS
 * Collection Structure: users/{userEmail}/favouriteRecipes/{recipeId}
 */

/**
 * Load all favourite recipes for a user
 * @param {string} userEmail - User email address
 * @returns {Promise<Array>} Array of favourite recipe objects
 */
export async function loadFavouriteRecipes(userEmail) {
  try {
    if (!userEmail) {
      console.error('❌ No userEmail provided');
      return [];
    }

    console.log('📦 Loading favourite recipes for user:', userEmail);

    const favouriteRecipesRef = collection(db, `users/${userEmail}/favouriteRecipes`);
    const q = query(favouriteRecipesRef);

    const querySnapshot = await getDocs(q);

    const recipes = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: data.id,
        title: data.title,
        image: data.image,
        readyInMinutes: data.readyInMinutes,
        aggregateLikes: data.aggregateLikes || 0
      };
    });

    console.log('✅ Loaded', recipes.length, 'favourite recipes');
    return recipes;
  } catch (error) {
    console.error('❌ Error loading favourite recipes:', error);
    throw new Error(`Failed to load favourite recipes: ${error.message}`);
  }
}

/**
 * Add a recipe to user's favourites
 * @param {string} userEmail - User email address
 * @param {Object} recipeData - { id, title, image, readyInMinutes, aggregateLikes }
 * @returns {Promise<void>}
 */
export async function addFavouriteRecipe(userEmail, recipeData) {
  try {
    if (!userEmail) {
      console.error('❌ No userEmail provided');
      throw new Error('User email is required');
    }

    if (!recipeData.id) {
      console.error('❌ Missing recipe id');
      throw new Error('Recipe ID is required');
    }

    console.log('➕ Adding recipe to favourites:', recipeData.id);

    const recipeDoc = doc(db, `users/${userEmail}/favouriteRecipes/${recipeData.id}`);

    // Check if already exists
    const existingRecipe = await getDocs(query(
      collection(db, `users/${userEmail}/favouriteRecipes`),
      where('id', '==', recipeData.id)
    ));

    if (!existingRecipe.empty) {
      console.log('ℹ️ Recipe already in favourites');
      return;
    }

    const favouriteData = {
      id: recipeData.id,
      title: recipeData.title || '',
      image: recipeData.image || '',
      readyInMinutes: recipeData.readyInMinutes || null,
      aggregateLikes: recipeData.aggregateLikes || null,
      savedAt: serverTimestamp(),
    };

    // Use setDoc to add with custom ID (recipeId)
    await setDoc(recipeDoc, favouriteData);

    console.log('✅ Recipe added to favourites');
  } catch (error) {
    console.error('❌ Error adding favourite recipe:', error);
    throw new Error(`Failed to add favourite recipe: ${error.message}`);
  }
}

/**
 * Remove a recipe from user's favourites
 * @param {string} userEmail - User email address
 * @param {string} recipeId - Recipe ID to remove
 * @returns {Promise<void>}
 */
export async function removeFavouriteRecipe(userEmail, recipeId) {
  try {
    if (!userEmail || !recipeId) {
      console.error('❌ Missing userEmail or recipeId');
      throw new Error('User email and Recipe ID are required');
    }

    console.log('🗑️ Removing recipe from favourites:', recipeId);

    const recipeRef = doc(db, `users/${userEmail}/favouriteRecipes/${recipeId}`);
    await deleteDoc(recipeRef);

    console.log('✅ Recipe removed from favourites');
  } catch (error) {
    console.error('❌ Error removing favourite recipe:', error);
    throw new Error(`Failed to remove favourite recipe: ${error.message}`);
  }
}

/**
 * Check if a recipe is in user's favourites
 * @param {string} userEmail - User email address
 * @param {string} recipeId - Recipe ID to check
 * @returns {Promise<boolean>} True if recipe is favourited
 */
export async function isFavouriteRecipe(userEmail, recipeId) {
  try {
    if (!userEmail || !recipeId) {
      console.error('❌ Missing userEmail or recipeId');
      return false;
    }

    const recipeRef = doc(db, `users/${userEmail}/favouriteRecipes/${recipeId}`);
    const { getDoc } = await import('firebase/firestore');
    const docSnapshot = await getDoc(recipeRef);

    return docSnapshot.exists();
  } catch (error) {
    console.error('❌ Error checking favourite recipe:', error);
    return false;
  }
}

/**
 * USER PREFERENCES OPERATIONS
 * Collection Structure: users/{userEmail}
 */

/**
 * Get user's daily calorie goal
 * @param {string} userEmail - User email address
 * @returns {Promise<number>} Daily calorie goal (default: 2000)
 */
export async function getDailyCalorieGoal(userEmail) {
  try {
    if (!userEmail) {
      console.error('❌ No userEmail provided');
      return 2000; // Default goal
    }

    console.log('📦 Loading daily calorie goal for user:', userEmail);

    const userRef = doc(db, 'users', userEmail);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const dailyGoal = userSnapshot.data().dailyCalorieGoal;
      const goal = dailyGoal || 2000; // Default to 2000 if not set
      console.log('✅ Loaded daily calorie goal:', goal);
      return goal;
    } else {
      console.log('ℹ️ User document not found, using default goal: 2000');
      return 2000;
    }
  } catch (error) {
    console.error('❌ Error loading daily calorie goal:', error);
    return 2000; // Default goal on error
  }
}

/**
 * Update user's daily calorie goal
 * @param {string} userEmail - User email address
 * @param {number} goal - New daily calorie goal
 * @returns {Promise<void>}
 */
export async function updateDailyCalorieGoal(userEmail, goal) {
  try {
    if (!userEmail) {
      console.error('❌ No userEmail provided');
      throw new Error('User email is required');
    }

    if (!goal || goal < 1) {
      console.error('❌ Invalid calorie goal');
      throw new Error('Daily calorie goal must be greater than 0');
    }

    console.log('✏️ Updating daily calorie goal to:', goal);

    const userRef = doc(db, 'users', userEmail);

    // Use setDoc with merge: true to update or create the document
    await setDoc(userRef, {
      dailyCalorieGoal: parseInt(goal),
      updatedAt: serverTimestamp(),
    }, { merge: true });

    console.log('✅ Daily calorie goal updated to:', goal);
  } catch (error) {
    console.error('❌ Error updating daily calorie goal:', error);
    throw new Error(`Failed to update daily calorie goal: ${error.message}`);
  }
}

/**
 * Update user dietary preferences
 * @param {string} userEmail - User email address
 * @param {Object} preferencesData - { dietaryRestrictions: [], allergies: [], budget: number, fitnessGoals: string }
 * @returns {Promise<void>}
 */
export async function updateUserPreferences(userEmail, preferencesData) {
  try {
    if (!userEmail) {
      console.error('❌ No userEmail provided');
      throw new Error('User email is required');
    }

    console.log('📝 Updating user preferences for:', userEmail);
    console.log('Preferences:', preferencesData);

    const userRef = doc(db, 'users', userEmail);

    // Use setDoc with merge: true to update preferences while keeping other user data
    await setDoc(userRef, {
      preferences: {
        dietaryRestrictions: preferencesData.dietaryRestrictions || [],
        allergies: preferencesData.allergies || [],
        budget: preferencesData.budget || 0,
        fitnessGoals: preferencesData.fitnessGoals || '',
      },
      updatedAt: serverTimestamp(),
    }, { merge: true });

    console.log('✅ User preferences updated successfully');
  } catch (error) {
    console.error('❌ Error updating user preferences:', error);
    throw new Error(`Failed to update preferences: ${error.message}`);
  }
}
