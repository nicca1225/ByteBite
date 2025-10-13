<template>
  <div class="calorie-tracker min-h-screen bg-gradient-to-br from-black to-gray-950 text-white p-4 sm:p-8">
    <div class="max-w-6xl mx-auto">
      
      <!-- Back Button -->
      <button 
        class="text-yellow-400 hover:text-yellow-300 font-semibold mb-8 flex items-center space-x-2 transition-colors"
        @click="$router.push('/')">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        <span>Back to Dashboard</span>
      </button>

      <h1 class="text-4xl font-extrabold text-yellow-400 mb-8 border-b border-yellow-400/20 pb-3">Daily Calorie Tracker 🔥</h1>
      
      <!-- Error Message Placeholder -->
      <div v-if="localError" class="bg-red-900/50 text-red-300 p-4 rounded-xl mb-6 border border-red-500">
        {{ localError }}
      </div>

      <!-- Calorie Summary Card with Progress Bar -->
      <div class="bg-gray-900 p-6 rounded-2xl shadow-xl border border-yellow-400/30 mb-10">
        <h2 class="text-2xl font-bold text-white mb-6">Today's Progress</h2>
        
        <!-- Progress Bar -->
        <div class="h-6 bg-gray-700 rounded-full mb-4 overflow-hidden">
            <div 
                class="h-full transition-all duration-700 ease-out" 
                :class="{'bg-red-600': caloriesRemaining < 0, 'bg-green-500': progressPercentage >= 100, 'bg-yellow-400': progressPercentage < 100}"
                :style="{ width: Math.min(progressPercentage, 100) + '%' }"
            ></div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          
          <!-- Goal -->
          <div class="p-6 bg-black rounded-xl border-2 border-gray-700 shadow-md">
            <div class="text-xl font-medium text-gray-400">Daily Goal</div>
            <div class="text-5xl font-extrabold text-white mt-2">{{ calorieGoal }}</div>
            <div class="text-sm text-gray-500">kcal</div>
          </div>

          <!-- Consumed -->
          <div class="p-6 bg-black rounded-xl border-2 border-green-500/50 shadow-md">
            <div class="text-xl font-medium text-gray-400">Consumed</div>
            <div class="text-5xl font-extrabold text-green-400 mt-2">{{ todaysCalorieTotal }}</div>
            <div class="text-sm text-gray-500">kcal</div>
          </div>
          
          <!-- Remaining -->
          <div 
            :class="{'border-red-500/50': caloriesRemaining < 0, 'border-yellow-500/50': caloriesRemaining >= 0}"
            class="p-6 bg-black rounded-xl border-2 shadow-md"
          >
            <div class="text-xl font-medium text-gray-400">Remaining</div>
            <div class="text-5xl font-extrabold mt-2" :class="{'text-red-400': caloriesRemaining < 0, 'text-yellow-400': caloriesRemaining >= 0}">
              {{ caloriesRemaining }}
            </div>
            <div class="text-sm text-gray-500">kcal</div>
          </div>
        </div>
      </div>

      <!-- Log Meal Form & Recent Entries Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Log Meal Form (2/3 width on large screens) -->
        <div class="lg:col-span-2 bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-700/50 h-fit log-meal-form">
          <h2 class="text-2xl font-bold text-white mb-6">{{ editingEntry ? 'Edit Entry' : 'Log New Entry' }}</h2>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            
            <div>
              <label for="food" class="block text-sm font-medium text-gray-300 mb-1">Food/Meal Description</label>
              <input 
                id="food" 
                type="text" 
                v-model="newEntry.food"
                placeholder="e.g., Avocado Toast with Egg" 
                required
                class="w-full p-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-yellow-400 focus:border-yellow-400"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="calories" class="block text-sm font-medium text-gray-300 mb-1">Calories (kcal)</label>
                <input 
                  id="calories" 
                  type="number" 
                  v-model.number="newEntry.calories"
                  min="1"
                  placeholder="350"
                  required
                  class="w-full p-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-yellow-400 focus:border-yellow-400"
                />
              </div>

              <div>
                <label for="mealType" class="block text-sm font-medium text-gray-300 mb-1">Meal Type</label>
                <select 
                  id="mealType" 
                  v-model="newEntry.mealType"
                  required
                  class="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:ring-yellow-400 focus:border-yellow-400 appearance-none"
                >
                  <option value="" disabled>Select Type</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
              </div>
            </div>

            <div class="flex space-x-4 mt-4">
                <button 
                  type="submit"
                  class="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold py-3 rounded-xl transition-colors duration-300 shadow-md flex items-center justify-center space-x-2"
                >
                  {{ editingEntry ? 'Update Meal' : 'Log Meal' }}
                </button>

                <!-- Cancel Edit Button -->
                <button 
                    v-if="editingEntry"
                    type="button"
                    @click="cancelEdit"
                    class="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-xl transition-colors duration-300 shadow-md flex items-center justify-center space-x-2"
                >
                    Cancel Edit
                </button>
            </div>
          </form>
        </div>

        <!-- Recent Entries List (1/3 width on large screens) -->
        <div class="lg:col-span-1 bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-700/50">
          <h2 class="text-2xl font-bold text-white mb-6">Recent Entries</h2>
          
          <ul class="space-y-4" v-if="dailyEntries.length > 0">
            <li 
              v-for="entry in dailyEntries" 
              :key="entry.id"
              class="flex justify-between items-center p-3 bg-black rounded-lg border border-gray-700 group hover:border-yellow-400 transition-colors"
            >
              <div class="flex flex-col truncate">
                <span class="font-semibold text-white truncate">{{ entry.food }}</span>
                <span class="text-xs text-gray-500">{{ formatTimestamp(entry.timestamp) }} &bull; {{ entry.mealType }}</span>
              </div>
              <div class="flex items-center flex-shrink-0 ml-4">
                  <span class="font-bold text-yellow-400">{{ entry.calories }} kcal</span>
                  
                  <!-- Edit Button (Interaction) -->
                  <button @click="editEntry(entry)" title="Edit" class="ml-2 p-1 text-gray-500 hover:text-blue-400 transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-9-3l9-9m-9 9l4 4"></path>
                      </svg>
                  </button>

                  <!-- Delete Button (Interaction) -->
                  <button @click="deleteEntry(entry.id)" title="Delete" class="ml-1 p-1 text-gray-500 hover:text-red-400 transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                  </button>
              </div>
            </li>
          </ul>
          <div v-else class="text-center text-gray-500 py-10">
            No meals logged today! Time to start tracking.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// --- LOCAL STATE ---
const calorieGoal = ref(2000);
const localError = ref(null);
const editingEntry = ref(null); 

// Initial data for display
const dailyEntries = ref([
  { id: 1, food: 'Protein Shake', calories: 250, mealType: 'Snack', timestamp: Date.now() - 3600000 },
  { id: 2, food: 'Chicken Salad', calories: 450, mealType: 'Lunch', timestamp: Date.now() - 7200000 },
  { id: 3, food: 'Oatmeal & Berries', calories: 300, mealType: 'Breakfast', timestamp: Date.now() - 10800000 },
]);

// Form state
const newEntry = ref({
  mealType: 'Breakfast',
  calories: null,
  food: '',
});

// --- COMPUTED PROPERTIES ---

const todaysCalorieTotal = computed(() => {
  return dailyEntries.value.reduce((total, entry) => total + entry.calories, 0);
});

const caloriesRemaining = computed(() => {
  return calorieGoal.value - todaysCalorieTotal.value;
});

const progressPercentage = computed(() => {
    return (todaysCalorieTotal.value / calorieGoal.value) * 100;
});

// --- ACTIONS ---

function handleSubmit() { // Handles both logging and updating
  localError.value = null;

  if (!newEntry.value.food || !newEntry.value.calories || !newEntry.value.mealType) {
    localError.value = "Please fill out all fields.";
    return;
  }
  
  const entryData = {
    food: newEntry.value.food,
    calories: parseInt(newEntry.value.calories),
    mealType: newEntry.value.mealType,
  };

  if (editingEntry.value) {
    // 1. UPDATE LOGIC
    const index = dailyEntries.value.findIndex(e => e.id === editingEntry.value.id);
    if (index !== -1) {
      // Update the entry in the array
      dailyEntries.value[index] = {
        ...dailyEntries.value[index], // Keep original ID and timestamp
        ...entryData, // Overwrite with new data
      };
    }
    editingEntry.value = null; // Exit edit mode

  } else {
    // 2. NEW ENTRY LOGIC (Creation)
    const entryToSave = {
      id: Date.now(), // Use timestamp as a simple unique ID
      ...entryData,
      timestamp: Date.now(),
    };

    // Add the new entry to the front of the list (newest first)
    dailyEntries.value.unshift(entryToSave);
  }
  
  // Reset form
  newEntry.value.food = '';
  newEntry.value.calories = null;
  newEntry.value.mealType = 'Breakfast'; 
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

function deleteEntry(id) {
    // Deletion
    dailyEntries.value = dailyEntries.value.filter(entry => entry.id !== id);
    console.log('Delete clicked for ID:', id);
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
</script>
