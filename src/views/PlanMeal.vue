<template>
  <div class="plan-meal min-h-screen bg-black text-white p-4 sm:p-8">
    <div class="max-w-7xl mx-auto">

      <!-- Back Button -->
      <button
        class="text-gray-400 hover:text-yellow-400 font-mono uppercase tracking-wider text-sm mb-8 flex items-center gap-2 transition-colors"
        @click="$router.push('/')">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        <span>Back to Dashboard</span>
      </button>

      <div class="mb-8">
        <div class="inline-block mb-3">
          <span class="text-xs font-mono uppercase tracking-wider text-yellow-400/80 bg-yellow-400/10 px-3 py-1.5 rounded-full border border-yellow-400/20">
            Meal Planning
          </span>
        </div>
        <h1 class="text-4xl sm:text-5xl font-light text-white mb-4">Plan Your Meals</h1>
        <p class="text-gray-400 font-light">Click on any day to plan your meals</p>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-900/20 text-red-300 p-4 rounded-xl mb-6 border border-red-500/30">
        {{ error }}
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center py-20">
        <div class="w-12 h-12 border-4 border-gray-800 border-t-yellow-400 rounded-full animate-spin" aria-label="Loading"></div>
      </div>

      <!-- Calendar -->
      <div v-if="!isLoading" class="bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl overflow-hidden">
        <!-- Month Navigation -->
        <div class="flex items-center justify-between p-6 pb-4">
          <div class="flex items-center gap-3">
            <h2 class="text-2xl font-light text-white">{{ currentMonthYear }}</h2>
            <button
              @click="goToToday"
              class="px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider border border-gray-700 hover:border-yellow-400/50 text-gray-400 hover:text-yellow-400 transition-colors"
            >
              Today
            </button>
          </div>

          <div class="flex items-center gap-2">
            <button
              @click="previousMonth"
              class="w-9 h-9 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>

            <button
              @click="nextMonth"
              class="w-9 h-9 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Calendar Grid -->
        <div class="px-6 pb-6">
          <div class="border border-gray-800/50 rounded-lg overflow-hidden">
            <!-- Day Headers -->
            <div class="grid grid-cols-7 bg-gray-900/50">
              <div
                v-for="day in dayHeaders"
                :key="day"
                class="text-center py-2 text-xs font-medium text-gray-500 border-b border-gray-800/50"
              >
                {{ day }}
              </div>
            </div>

            <!-- Calendar Days -->
            <div class="grid grid-cols-7">
              <div
                v-for="(day, index) in calendarDays"
                :key="index"
                @click="day.date ? openDayDetail(day) : null"
                :class="[
                  'min-h-[120px] p-2 border-r border-b border-gray-800/50 transition-colors',
                  day.date ? 'cursor-pointer hover:bg-gray-900/30' : 'bg-gray-900/20',
                  day.isToday ? 'bg-yellow-400/5' : '',
                  index % 7 === 6 ? 'border-r-0' : '',
                  index >= 35 ? 'border-b-0' : ''
                ]"
              >
                <div v-if="day.date" class="h-full flex flex-col">
                  <div class="flex items-center justify-between mb-2">
                    <span :class="[
                      'text-sm w-6 h-6 flex items-center justify-center rounded-full',
                      day.isToday ? 'bg-yellow-400 text-black font-medium' : day.isCurrentMonth ? 'text-gray-300' : 'text-gray-600'
                    ]">
                      {{ day.dayNumber }}
                    </span>
                  </div>
                  <div class="flex-1 overflow-y-auto space-y-1">
                    <div
                      v-for="meal in getMealsForDay(day.date)"
                      :key="meal.id"
                      :class="[
                        'text-xs px-2 py-1 rounded truncate',
                        meal.type === 'Breakfast' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                        meal.type === 'Lunch' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                        meal.type === 'Dinner' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                        'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                      ]"
                      :title="meal.name"
                    >
                      {{ meal.name }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Day Detail Dialog -->
      <div
        v-if="showDayDetail"
        class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        @click.self="closeDayDetail"
      >
        <div class="bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-2xl font-light text-white">{{ selectedDay?.dayName }}</h2>
              <p class="text-sm font-mono text-gray-500 mt-1">{{ selectedDay?.dateStr }}</p>
            </div>
            <button
              @click="closeDayDetail"
              class="w-8 h-8 rounded-lg border border-gray-700 hover:border-gray-600 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Meals List -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-mono uppercase tracking-wider text-gray-500">Planned Meals</h3>
              <button
                @click="openAddMealDialog"
                class="px-4 py-2 rounded-lg bg-yellow-400 text-black text-sm font-medium hover:bg-yellow-300 transition-colors"
              >
                + Add Meal
              </button>
            </div>

            <div v-if="getMealsForDay(selectedDay?.date).length > 0" class="space-y-3">
              <div
                v-for="meal in getMealsForDay(selectedDay?.date)"
                :key="meal.id"
                class="bg-black border border-gray-800/50 rounded-lg p-4 flex items-center justify-between group hover:border-yellow-400/30 transition-colors"
              >
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-xs font-mono uppercase tracking-wider text-yellow-400/80 bg-yellow-400/10 px-2 py-1 rounded border border-yellow-400/20">
                      {{ meal.type }}
                    </span>
                  </div>
                  <h4 class="font-medium text-white mb-1">{{ meal.name }}</h4>
                  <div class="flex items-center gap-4 text-xs text-gray-500 font-mono">
                    <span v-if="meal.calories">{{ meal.calories }} kcal</span>
                    <span v-if="meal.time">{{ meal.time }}</span>
                  </div>
                </div>
                <button
                  @click="removeMeal(meal.id)"
                  class="p-2 text-gray-600 hover:text-red-400 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div v-else class="text-center py-12 text-gray-600">
              <p class="text-sm font-light">No meals planned for this day</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Meal Dialog -->
      <div
        v-if="showAddMealDialog"
        class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        @click.self="closeAddMealDialog"
      >
        <div class="bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl p-6 sm:p-8 max-w-md w-full">
          <h2 class="text-2xl font-light text-white mb-6">Add Meal</h2>

          <form @submit.prevent="addMeal" class="space-y-5">
            <div>
              <label class="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Meal Type</label>
              <select
                v-model="newMeal.type"
                required
                class="w-full p-3 bg-black border border-gray-800 rounded-lg text-white focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors"
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Meal Name</label>
              <input
                v-model="newMeal.name"
                type="text"
                placeholder="e.g., Grilled Chicken Salad"
                required
                class="w-full p-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Calories</label>
                <input
                  v-model.number="newMeal.calories"
                  type="number"
                  placeholder="450"
                  class="w-full p-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors"
                />
              </div>

              <div>
                <label class="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Time</label>
                <input
                  v-model="newMeal.time"
                  type="time"
                  class="w-full p-3 bg-black border border-gray-800 rounded-lg text-white focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors"
                />
              </div>
            </div>

            <div class="flex gap-3 pt-2">
              <button
                type="submit"
                class="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-medium py-3 rounded-lg transition-colors"
              >
                Add Meal
              </button>
              <button
                type="button"
                @click="closeAddMealDialog"
                class="flex-1 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white font-medium py-3 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import {
  loadUserMealPlans,
  addMealPlan,
  updateMealPlan,
  deleteMealPlan,
} from '@/utils/firestoreUtils'

// Auth store
const authStore = useAuthStore()

// Current month/year
const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())

// Meals data
const meals = ref([])
const isLoading = ref(false)
const error = ref(null)

// Dialog state
const showDayDetail = ref(false)
const showAddMealDialog = ref(false)
const selectedDay = ref(null)
const newMeal = ref({
  type: 'Breakfast',
  name: '',
  calories: null,
  time: ''
})

// Day headers
const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Current month/year display
const currentMonthYear = computed(() => {
  const date = new Date(currentYear.value, currentMonth.value)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

// Generate calendar days
const calendarDays = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  const prevLastDay = new Date(currentYear.value, currentMonth.value, 0)

  const firstDayOfWeek = firstDay.getDay()
  const lastDateOfMonth = lastDay.getDate()
  const prevLastDate = prevLastDay.getDate()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const days = []

  // Previous month days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const dayNum = prevLastDate - i
    const date = new Date(currentYear.value, currentMonth.value - 1, dayNum)
    days.push({
      dayNumber: dayNum,
      date: date.toISOString().split('T')[0],
      dateStr: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
      isCurrentMonth: false,
      isToday: false
    })
  }

  // Current month days
  for (let i = 1; i <= lastDateOfMonth; i++) {
    const date = new Date(currentYear.value, currentMonth.value, i)
    date.setHours(0, 0, 0, 0)
    const isToday = date.getTime() === today.getTime()

    days.push({
      dayNumber: i,
      date: date.toISOString().split('T')[0],
      dateStr: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
      isCurrentMonth: true,
      isToday
    })
  }

  // Next month days
  const remainingDays = 42 - days.length // 6 rows × 7 days
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(currentYear.value, currentMonth.value + 1, i)
    days.push({
      dayNumber: i,
      date: date.toISOString().split('T')[0],
      dateStr: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
      isCurrentMonth: false,
      isToday: false
    })
  }

  return days
})

// Get meals for a specific day
function getMealsForDay(date) {
  return meals.value.filter(meal => meal.date === date)
}

// Load meals from Firebase
async function loadMealsFromFirebase() {
  if (!authStore.user) {
    console.log('⏭️ No user logged in, skipping meal load')
    return
  }

  try {
    isLoading.value = true
    error.value = null
    console.log('📦 Loading meals from Firebase...')

    const loadedMeals = await loadUserMealPlans(authStore.user.email)
    meals.value = loadedMeals
    console.log('✅ Meals loaded:', loadedMeals.length)
  } catch (err) {
    console.error('❌ Error loading meals:', err)
    error.value = 'Failed to load meal plans. Please refresh the page.'
  } finally {
    isLoading.value = false
  }
}

// Navigation
function previousMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

function goToToday() {
  const today = new Date()
  currentMonth.value = today.getMonth()
  currentYear.value = today.getFullYear()
}

// Dialog functions
function openDayDetail(day) {
  selectedDay.value = day
  showDayDetail.value = true
}

function closeDayDetail() {
  showDayDetail.value = false
  showAddMealDialog.value = false
  selectedDay.value = null
}

function openAddMealDialog() {
  showAddMealDialog.value = true
}

function closeAddMealDialog() {
  showAddMealDialog.value = false
  newMeal.value = {
    type: 'Breakfast',
    name: '',
    calories: null,
    time: ''
  }
}

async function addMeal() {
  if (!selectedDay.value || !newMeal.value.name) return
  if (!authStore.user) {
    error.value = 'Please log in to add meal plans'
    return
  }

  try {
    error.value = null
    console.log('📝 Adding meal:', newMeal.value)

    // Add to Firebase
    const mealId = await addMealPlan(authStore.user.email, {
      date: selectedDay.value.date,
      type: newMeal.value.type,
      name: newMeal.value.name,
      calories: newMeal.value.calories,
      time: newMeal.value.time,
    })

    // Add to local array
    const meal = {
      id: mealId,
      date: selectedDay.value.date,
      type: newMeal.value.type,
      name: newMeal.value.name,
      calories: newMeal.value.calories,
      time: newMeal.value.time,
    }

    meals.value.push(meal)
    console.log('✅ Meal added successfully')
  } catch (err) {
    console.error('❌ Error adding meal:', err)
    error.value = 'Failed to add meal. Please try again.'
  }

  closeAddMealDialog()
}

async function removeMeal(mealId) {
  if (!authStore.user) {
    error.value = 'Please log in to remove meal plans'
    return
  }

  try {
    error.value = null
    console.log('🗑️ Removing meal:', mealId)

    // Delete from Firebase
    await deleteMealPlan(authStore.user.email, mealId)

    // Remove from local array
    meals.value = meals.value.filter(meal => meal.id !== mealId)
    console.log('✅ Meal removed successfully')
  } catch (err) {
    console.error('❌ Error removing meal:', err)
    error.value = 'Failed to remove meal. Please try again.'
  }
}

// Lifecycle hook
onMounted(() => {
  loadMealsFromFirebase()
})
</script>
