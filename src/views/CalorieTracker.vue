<template>
  <div class="calorie-tracker min-h-screen bg-black text-white p-4 sm:p-8">
    <div class="max-w-6xl mx-auto">

      <!-- Back Button -->
      <button
        class="text-gray-400 hover:text-yellow-400 font-mono uppercase tracking-wider text-sm mb-8 flex items-center gap-2 transition-colors"
        @click="$router.push('/')">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        <span>Back to Dashboard</span>
      </button>

      <div class="flex items-center justify-between mb-8">
        <div>
          <div class="inline-block mb-3">
            <span class="text-xs font-mono uppercase tracking-wider text-yellow-400/80 bg-yellow-400/10 px-3 py-1.5 rounded-full border border-yellow-400/20">
              Nutrition
            </span>
          </div>
          <h1 class="text-4xl sm:text-5xl font-light text-white">Calorie Tracker</h1>
        </div>
        <button
          @click="refreshEntries"
          class="w-10 h-10 rounded-lg border border-gray-700 hover:border-yellow-400/50 text-gray-400 hover:text-yellow-400 flex items-center justify-center transition-colors disabled:opacity-50"
          :disabled="isLoadingEntries"
          title="Refresh entries"
        >
          <svg class="w-5 h-5" :class="{'animate-spin': isLoadingEntries}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
        </button>
      </div>

      <!-- Time Period Selector -->
      <div class="flex gap-3 mb-8">
        <button
          v-for="period in ['day', 'week', 'month']"
          :key="period"
          @click="selectedPeriod = period; loadEntriesByPeriod()"
          :class="[
            'px-4 py-2 rounded-lg font-medium text-sm uppercase tracking-wider transition-all duration-200',
            selectedPeriod === period
              ? 'bg-yellow-400 text-black border border-yellow-400'
              : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:border-yellow-400/30 hover:text-yellow-400'
          ]"
        >
          {{ period === 'day' ? 'Today' : period === 'week' ? 'This Week' : 'This Month' }}
        </button>
      </div>

      <!-- Error Message Placeholder -->
      <div v-if="localError" class="bg-red-900/20 text-red-300 p-4 rounded-xl mb-6 border border-red-500/30">
        {{ localError }}
      </div>

      <!-- Overview Section with Graph and Metrics -->
      <CalorieTrackerOverview
        :selectedPeriod="selectedPeriod"
        @edit="editEntry"
        @delete="deleteEntry"
        class="mb-8"
      />

      <!-- Calorie Summary Card with Progress Bar - Day View Only -->
      <div v-if="selectedPeriod === 'day'" class="bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl p-6 sm:p-8 mb-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-light text-white">{{ periodTitle }}</h2>
          <span class="text-sm font-mono text-gray-500 uppercase tracking-wider">{{ periodDate }}</span>
        </div>

        <!-- Progress Bar -->
        <div class="h-3 bg-gray-800/50 rounded-full mb-8 overflow-hidden">
            <div
                class="h-full transition-all duration-700 ease-out"
                :class="{'bg-red-500': caloriesRemaining < 0, 'bg-green-500': progressPercentage >= 100, 'bg-yellow-400': progressPercentage < 100}"
                :style="{ width: Math.min(progressPercentage, 100) + '%' }"
            ></div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <!-- Goal -->
          <div class="bg-black border border-gray-800/50 rounded-xl p-6 group hover:border-yellow-400/30 transition-all duration-300 cursor-pointer" @click="openGoalEditor">
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm font-mono uppercase tracking-wider text-gray-500">{{ selectedPeriod === 'day' ? 'Daily' : selectedPeriod === 'week' ? 'Weekly' : 'Monthly' }} Goal</span>
              <button
                @click.stop="openGoalEditor"
                class="p-1.5 text-gray-600 hover:text-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300"
                title="Edit daily goal"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-9-3l9-9m-9 9l4 4"></path>
                </svg>
              </button>
            </div>
            <div class="text-4xl font-light text-white mb-2">{{ calorieGoal }}</div>
            <div class="text-sm text-gray-600 font-mono">kcal</div>
          </div>

          <!-- Consumed -->
          <div class="bg-black border border-gray-800/50 rounded-xl p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm font-mono uppercase tracking-wider text-gray-500">Consumed</span>
            </div>
            <div class="text-4xl font-light text-green-400 mb-2">{{ todaysCalorieTotal }}</div>
            <div class="text-sm text-gray-600 font-mono">kcal</div>
          </div>

          <!-- Remaining -->
          <div class="bg-black border border-gray-800/50 rounded-xl p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm font-mono uppercase tracking-wider text-gray-500">Remaining</span>
            </div>
            <div class="text-4xl font-light mb-2" :class="{'text-red-400': caloriesRemaining < 0, 'text-yellow-400': caloriesRemaining >= 0}">
              {{ caloriesRemaining }}
            </div>
            <div class="text-sm text-gray-600 font-mono">kcal</div>
          </div>
        </div>
      </div>

      <!-- Log Meal Form & Recent Entries Layout - Day View Only -->
      <div v-if="selectedPeriod === 'day'" class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- Log Meal Form (2/3 width on large screens) -->
        <div class="lg:col-span-2 bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl p-6 sm:p-8 h-fit log-meal-form">
          <h2 class="text-2xl font-light text-white mb-6">{{ editingEntry ? 'Edit Entry' : 'Log New Entry' }}</h2>
          <form @submit.prevent="handleSubmit" class="space-y-5">

            <div>
              <label for="food" class="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Food/Meal Description</label>
              <input
                id="food"
                type="text"
                v-model="newEntry.food"
                placeholder="e.g., Avocado Toast with Egg"
                required
                class="w-full p-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="calories" class="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Calories (kcal)</label>
                <input
                  id="calories"
                  type="number"
                  v-model.number="newEntry.calories"
                  min="1"
                  placeholder="350"
                  required
                  class="w-full p-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors"
                />
              </div>

              <div>
                <label for="mealType" class="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Meal Type</label>
                <select
                  id="mealType"
                  v-model="newEntry.mealType"
                  required
                  class="w-full p-3 bg-black border border-gray-800 rounded-lg text-white focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 appearance-none transition-colors"
                >
                  <option value="" disabled>Select Type</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
              </div>
            </div>

            <div class="flex gap-3 pt-2">
                <button
                  type="submit"
                  class="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-medium py-3 rounded-lg transition-colors flex items-center justify-center"
                >
                  {{ editingEntry ? 'Update Entry' : 'Log Entry' }}
                </button>

                <!-- Cancel Edit Button -->
                <button
                    v-if="editingEntry"
                    type="button"
                    @click="cancelEdit"
                    class="flex-1 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center"
                >
                    Cancel
                </button>
            </div>
          </form>
        </div>

        <!-- Recent Entries List (1/3 width on large screens) -->
        <div class="lg:col-span-1 bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl p-6">
          <h2 class="text-2xl font-light text-white mb-6">{{ selectedPeriod === 'day' ? 'Recent Entries' : selectedPeriod === 'week' ? 'Week Entries' : 'Month Entries' }}</h2>

          <div v-if="isLoadingEntries" class="text-center text-gray-500 py-10">
            <svg class="animate-spin h-8 w-8 mx-auto text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="mt-2 text-sm font-mono">Loading entries...</p>
          </div>

          <ul v-else-if="dailyEntries.length > 0" class="space-y-3">
            <li
              v-for="entry in dailyEntries"
              :key="entry.id"
              class="flex justify-between items-start p-4 bg-black border border-gray-800/50 rounded-lg group hover:border-yellow-400/30 transition-colors"
            >
              <div class="flex flex-col truncate flex-1">
                <span class="font-medium text-white truncate mb-1">{{ entry.food }}</span>
                <span class="text-xs text-gray-500 font-mono">{{ formatTimestamp(entry.timestamp) }} • {{ entry.mealType }}</span>
              </div>
              <div class="flex items-center flex-shrink-0 ml-4 gap-2">
                  <span class="font-mono text-sm text-yellow-400">{{ entry.calories }}</span>

                  <!-- Edit Button (Interaction) -->
                  <button @click="editEntry(entry)" title="Edit" class="p-1.5 text-gray-600 hover:text-yellow-400 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-9-3l9-9m-9 9l4 4"></path>
                      </svg>
                  </button>

                  <!-- Delete Button (Interaction) -->
                  <button @click="deleteEntry(entry.id)" title="Delete" class="p-1.5 text-gray-600 hover:text-red-400 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                  </button>
              </div>
            </li>
          </ul>

          <div v-else class="text-center text-gray-500 py-10">
            <div class="text-sm font-light">{{ selectedPeriod === 'day' ? 'No meals logged today' : selectedPeriod === 'week' ? 'No meals logged this week' : 'No meals logged this month' }}</div>
            <div class="text-xs text-gray-600 mt-1">Start tracking your nutrition</div>
          </div>
        </div>
      </div>

      <!-- Edit Daily Goal Modal -->
      <div v-if="isEditingGoal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div class="bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl p-8 w-full max-w-md">
          <h2 class="text-2xl font-light text-white mb-6">Edit Daily Goal</h2>

          <div class="mb-6">
            <label for="goalInput" class="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-3">
              Daily Calorie Goal (kcal)
            </label>
            <input
              id="goalInput"
              v-model.number="newGoalInput"
              type="number"
              min="1"
              placeholder="2000"
              class="w-full p-4 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors text-lg font-mono"
              @keyup.enter="saveNewGoal"
            />
            <p class="text-xs text-gray-500 mt-2">This is the daily target calories you want to consume.</p>
          </div>

          <div class="flex gap-3">
            <button
              @click="saveNewGoal"
              :disabled="isSavingGoal"
              class="flex-1 bg-yellow-400 hover:bg-yellow-300 disabled:bg-gray-600 text-black font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span v-if="isSavingGoal" class="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
              <span>{{ isSavingGoal ? 'Saving...' : 'Save Goal' }}</span>
            </button>
            <button
              @click="closeGoalEditor"
              :disabled="isSavingGoal"
              class="flex-1 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import CalorieTrackerOverview from '@/components/CalorieTrackerOverview.vue';
import {
  loadTodaysCalorieEntries,
  addCalorieEntry,
  updateCalorieEntry,
  deleteCalorieEntry,
  getDailyCalorieGoal,
  updateDailyCalorieGoal,
} from '@/utils/firestoreUtils';

// --- AUTH ---
const authStore = useAuthStore();

// --- LOCAL STATE ---
const baseCalorieGoal = ref(2000); // Base daily goal
const localError = ref(null);
const editingEntry = ref(null);
const isLoadingEntries = ref(true);
const selectedPeriod = ref('day'); // 'day', 'week', or 'month'

// --- GOAL EDIT STATE ---
const isEditingGoal = ref(false);
const newGoalInput = ref(2000);
const isSavingGoal = ref(false);

// Initial data for display
const dailyEntries = ref([]);

// Form state
const newEntry = ref({
  mealType: 'Breakfast',
  calories: null,
  food: '',
});

// --- COMPUTED PROPERTIES ---

const calorieGoal = computed(() => {
  if (selectedPeriod.value === 'day') {
    return baseCalorieGoal.value;
  } else if (selectedPeriod.value === 'week') {
    return baseCalorieGoal.value * 7;
  } else {
    // Month - assume 30 days
    return baseCalorieGoal.value * 30;
  }
});

const todaysCalorieTotal = computed(() => {
  return dailyEntries.value.reduce((total, entry) => total + entry.calories, 0);
});

const caloriesRemaining = computed(() => {
  return calorieGoal.value - todaysCalorieTotal.value;
});

const progressPercentage = computed(() => {
    return (todaysCalorieTotal.value / calorieGoal.value) * 100;
});

const periodTitle = computed(() => {
  if (selectedPeriod.value === 'day') return "Today's Progress";
  if (selectedPeriod.value === 'week') return "This Week's Progress";
  return "This Month's Progress";
});

const periodDate = computed(() => {
  const today = new Date();
  if (selectedPeriod.value === 'day') {
    return today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  // Get start of week (Monday)
  if (selectedPeriod.value === 'week') {
    const dayOfWeek = today.getDay();
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysToSubtract);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  }

  // Month
  return today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
});

// --- ACTIONS ---

async function loadTodaysEntries() {
  console.log('🔄 Loading entries...');

  if (!authStore.user) {
    console.error('❌ No user logged in');
    localError.value = "Please log in to track calories.";
    isLoadingEntries.value = false;
    return;
  }

  try {
    isLoadingEntries.value = true;
    const entries = await loadTodaysCalorieEntries(authStore.user.email);
    dailyEntries.value = entries;
    console.log('✅ Today\'s entries loaded:', dailyEntries.value.length);
  } catch (error) {
    console.error('❌ Error loading entries:', error);
    localError.value = "Failed to load entries. Please try again.";
  } finally {
    isLoadingEntries.value = false;
  }
}

async function loadEntriesByPeriod() {
  console.log(`🔄 Loading entries for period: ${selectedPeriod.value}`);

  if (!authStore.user) {
    console.error('❌ No user logged in');
    localError.value = "Please log in to track calories.";
    isLoadingEntries.value = false;
    return;
  }

  try {
    isLoadingEntries.value = true;
    const { loadCalorieEntriesByPeriod } = await import('@/utils/firestoreUtils');
    const entries = await loadCalorieEntriesByPeriod(authStore.user.email, selectedPeriod.value);
    dailyEntries.value = entries;
    console.log(`✅ Entries loaded for ${selectedPeriod.value}:`, dailyEntries.value.length);
  } catch (error) {
    console.error('❌ Error loading entries:', error);
    localError.value = "Failed to load entries. Please try again.";
  } finally {
    isLoadingEntries.value = false;
  }
}

async function handleSubmit() { // Handles both logging and updating
  console.log('💾 Submit triggered');
  localError.value = null;

  if (!authStore.user) {
    console.error('❌ No user logged in');
    localError.value = "Please log in to track calories.";
    return;
  }

  if (!newEntry.value.food || !newEntry.value.calories || !newEntry.value.mealType) {
    console.error('❌ Missing fields');
    localError.value = "Please fill out all fields.";
    return;
  }

  const entryData = {
    food: newEntry.value.food,
    calories: parseInt(newEntry.value.calories),
    mealType: newEntry.value.mealType,
  };

  try {
    if (editingEntry.value) {
      // UPDATE LOGIC
      console.log('✏️ Updating entry:', editingEntry.value.id);
      await updateCalorieEntry(authStore.user.email, editingEntry.value.id, entryData);
      console.log('✅ Entry updated successfully');

      // Update local array
      const index = dailyEntries.value.findIndex(e => e.id === editingEntry.value.id);
      if (index !== -1) {
        dailyEntries.value[index] = {
          ...dailyEntries.value[index],
          ...entryData,
        };
      }
      editingEntry.value = null;

    } else {
      // NEW ENTRY LOGIC
      console.log('➕ Creating new entry...');
      const docId = await addCalorieEntry(authStore.user.email, entryData);
      console.log('✅ Entry saved with ID:', docId);

      // Add the new entry to the front of the list (newest first)
      dailyEntries.value.unshift({
        id: docId,
        ...entryData,
        timestamp: Date.now(),
      });

      console.log('✅ Entry added to local list');
    }

    // Reset form
    newEntry.value.food = '';
    newEntry.value.calories = null;
    newEntry.value.mealType = 'Breakfast';

    console.log('✅ Form reset');

  } catch (error) {
    console.error('❌ Error saving entry:', error);
    localError.value = "Failed to save entry. Please try again.";
  }
}

function editEntry(entry) {
    // Enter edit mode
    editingEntry.value = entry;
    
    // Populate form with existing data
    newEntry.value.food = entry.food;
    newEntry.value.calories = entry.calories;
    newEntry.value.mealType = entry.mealType;

    // Optional: Scroll to the form for better UX
    document.querySelector('.log-meal-form')?.scrollIntoView({ behavior: 'smooth' });
}

function cancelEdit() {
    editingEntry.value = null;
    newEntry.value.food = '';
    newEntry.value.calories = null;
    newEntry.value.mealType = 'Breakfast'; 
    localError.value = null;
}

async function deleteEntry(id) {
    console.log('🗑️ Deleting entry:', id);

    if (!authStore.user) {
      console.error('❌ No user logged in');
      localError.value = "Please log in to delete entries.";
      return;
    }

    try {
      // Delete from Firebase
      await deleteCalorieEntry(authStore.user.email, id);
      console.log('✅ Entry deleted from Firestore');

      // Remove from local array
      dailyEntries.value = dailyEntries.value.filter(entry => entry.id !== id);
      console.log('✅ Entry removed from local list');

    } catch (error) {
      console.error('❌ Error deleting entry:', error);
      localError.value = "Failed to delete entry. Please try again.";
    }
}


// --- UTILITY ---
function formatTimestamp(timestamp) {
  if (!timestamp) return 'Time unknown';
  try {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  } catch (e) {
    return 'Time unknown';
  }
}

function refreshEntries() {
  // Manually refresh the entries from Firebase
  loadTodaysEntries();
}

// --- GOAL EDITING FUNCTIONS ---
function openGoalEditor() {
  newGoalInput.value = baseCalorieGoal.value;
  isEditingGoal.value = true;
}

function closeGoalEditor() {
  isEditingGoal.value = false;
  newGoalInput.value = 2000;
}

async function saveNewGoal() {
  if (!authStore.user) {
    console.error('❌ No user logged in');
    localError.value = "Please log in to update your calorie goal.";
    return;
  }

  if (!newGoalInput.value || newGoalInput.value < 1) {
    localError.value = "Daily calorie goal must be greater than 0.";
    return;
  }

  try {
    isSavingGoal.value = true;
    localError.value = null;

    console.log('💾 Saving new daily calorie goal:', newGoalInput.value);
    await updateDailyCalorieGoal(authStore.user.email, newGoalInput.value);

    // Update local state
    baseCalorieGoal.value = parseInt(newGoalInput.value);

    console.log('✅ Daily calorie goal updated successfully');
    closeGoalEditor();
  } catch (error) {
    console.error('❌ Error saving daily calorie goal:', error);
    localError.value = "Failed to update your calorie goal. Please try again.";
  } finally {
    isSavingGoal.value = false;
  }
}

async function loadUserDailyGoal() {
  if (!authStore.user) {
    console.error('❌ No user logged in');
    return;
  }

  try {
    console.log('🔄 Loading user daily calorie goal...');
    const goal = await getDailyCalorieGoal(authStore.user.email);
    baseCalorieGoal.value = goal;
    console.log('✅ Daily goal loaded:', goal);
  } catch (error) {
    console.error('❌ Error loading daily goal:', error);
    baseCalorieGoal.value = 2000; // Fall back to default
  }
}

// --- LIFECYCLE ---
onMounted(() => {
  loadUserDailyGoal();
  loadTodaysEntries();
});
</script>
