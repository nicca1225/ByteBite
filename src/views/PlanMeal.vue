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

      <!-- Recipe Selection Prompt -->
      <div v-if="isSelectingDayForRecipe && recipeFromSession" class="bg-green-900/20 text-green-300 p-4 rounded-xl mb-6 border border-green-500/30 flex items-center gap-3">
        <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <p class="font-medium">Click on a day to add "<strong>{{ recipeFromSession.name }}</strong>" to your meal plan</p>
          <p class="text-sm text-green-300/70 mt-1">Calories: {{ recipeFromSession.calories }} kcal</p>
        </div>
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

        <!-- Meal Type Legend -->
        <div class="px-6 py-4 border-b border-gray-800/50 bg-black/30">
          <div class="flex flex-wrap gap-4">
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded-full bg-blue-500/30 border border-blue-500/50"></div>
              <span class="text-xs text-gray-400">Breakfast</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded-full bg-green-500/30 border border-green-500/50"></div>
              <span class="text-xs text-gray-400">Lunch</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded-full bg-purple-500/30 border border-purple-500/50"></div>
              <span class="text-xs text-gray-400">Dinner</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded-full bg-yellow-500/30 border border-yellow-500/50"></div>
              <span class="text-xs text-gray-400">Snack</span>
            </div>
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
                class="bg-black border border-gray-800/50 rounded-lg overflow-hidden hover:border-yellow-400/30 transition-colors group"
              >
                <!-- Meal Details -->
                <div class="p-4">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-mono uppercase tracking-wider text-yellow-400/80 bg-yellow-400/10 px-2 py-1 rounded border border-yellow-400/20">
                      {{ meal.type }}
                    </span>
                    <div class="flex items-center gap-2">
                      <button
                        @click="openEditMealDialog(meal, selectedDay?.date)"
                        class="p-1 text-gray-500 hover:text-yellow-400 transition-colors hover:bg-yellow-400/10 rounded-lg"
                        title="Edit meal"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </button>
                      <button
                        @click="removeMeal(meal.id)"
                        class="p-1 text-gray-500 hover:text-red-400 transition-colors hover:bg-red-900/20 rounded-lg"
                        title="Delete meal"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <h4 class="font-medium text-white mb-1">{{ meal.name }}</h4>
                  <div class="flex items-center gap-4 text-xs text-gray-500 font-mono">
                    <span v-if="meal.calories">{{ meal.calories }} kcal</span>
                    <span v-if="meal.time">{{ meal.time }}</span>
                  </div>
                </div>
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

      <!-- Edit Meal Modal -->
      <div
        v-if="showEditMealDialog"
        class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        @click.self="closeEditMealDialog"
      >
        <div class="bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-light text-white">Edit Meal</h2>
            <button
              @click="closeEditMealDialog"
              class="w-8 h-8 rounded-lg border border-gray-700 hover:border-gray-600 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <form @submit.prevent="submitEditMeal" class="space-y-5">
            <!-- Image Upload Section -->
            <div>
              <label class="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Meal Image (Optional)</label>
              <div class="relative">
                <!-- Image Preview or Placeholder -->
                <div class="w-full h-40 bg-black border border-gray-800 rounded-lg overflow-hidden flex items-center justify-center mb-3">
                  <img
                    v-if="editMealPreview"
                    :src="editMealPreview"
                    :alt="editMealForm.name"
                    class="w-full h-full object-cover"
                  />
                  <div v-else class="text-4xl opacity-30">
                    {{ getMealTypeEmoji(editMealForm.type) }}
                  </div>
                </div>

                <!-- File Input -->
                <div class="flex items-center gap-2">
                  <input
                    ref="editFileInput"
                    type="file"
                    accept="image/*"
                    @change="handleEditImageUpload"
                    class="hidden"
                  />
                  <button
                    type="button"
                    @click="$refs.editFileInput.click()"
                    class="flex-1 px-3 py-2 bg-yellow-400 text-black text-sm font-medium rounded-lg hover:bg-yellow-300 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    <span>Upload Image</span>
                  </button>
                  <button
                    v-if="editMealPreview"
                    type="button"
                    @click="removeEditImage"
                    class="px-3 py-2 bg-red-900/20 text-red-300 border border-red-500/30 rounded-lg hover:bg-red-900/40 transition-colors text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <!-- Meal Type -->
            <div>
              <label class="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Meal Type</label>
              <select
                v-model="editMealForm.type"
                required
                class="w-full p-3 bg-black border border-gray-800 rounded-lg text-white focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors"
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
              </select>
            </div>

            <!-- Meal Name -->
            <div>
              <label class="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Meal Name</label>
              <input
                v-model="editMealForm.name"
                type="text"
                placeholder="e.g., Grilled Chicken Salad"
                required
                class="w-full p-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors"
              />
            </div>

            <!-- Calories and Time -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Calories</label>
                <input
                  v-model.number="editMealForm.calories"
                  type="number"
                  placeholder="450"
                  class="w-full p-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors"
                />
              </div>

              <div>
                <label class="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Time</label>
                <input
                  v-model="editMealForm.time"
                  type="time"
                  class="w-full p-3 bg-black border border-gray-800 rounded-lg text-white focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors"
                />
              </div>
            </div>

            <!-- Buttons -->
            <div class="flex gap-3 pt-2">
              <button
                type="submit"
                :disabled="editMealIsUploading"
                class="flex-1 bg-yellow-400 hover:bg-yellow-300 disabled:bg-gray-600 text-black font-medium py-3 rounded-lg transition-colors"
              >
                {{ editMealIsUploading ? 'Saving...' : 'Save Changes' }}
              </button>
              <button
                type="button"
                @click="closeEditMealDialog"
                class="flex-1 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white font-medium py-3 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>

            <!-- Delete Button -->
            <button
              type="button"
              @click="deleteEditMeal"
              class="w-full px-4 py-2 bg-red-900/20 text-red-300 border border-red-500/30 rounded-lg hover:bg-red-900/40 transition-colors text-sm font-medium"
            >
              Delete Meal
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useMealPlanStore } from '@/stores/mealPlanStore'
import { useCalorieStore } from '@/stores/calorieStore'
import {
  addMealPlan,
  updateMealPlan,
  addCalorieEntry,
  updateCalorieEntry,
} from '@/utils/firestoreUtils'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

// Stores
const authStore = useAuthStore()
const mealPlanStore = useMealPlanStore()
const calorieStore = useCalorieStore()

// Recipe data from RecipeDetail (if user clicked "Add to Meal Planner")
const recipeFromSession = ref(null)

// Current month/year
const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())

// Local state
const isLoading = computed(() => mealPlanStore.isLoadingMeals)
const error = computed(() => mealPlanStore.error)
const meals = computed(() => mealPlanStore.meals)

// Dialog state
const showDayDetail = ref(false)
const showAddMealDialog = ref(false)
const showEditMealDialog = ref(false)
const selectedDay = ref(null)
const isSelectingDayForRecipe = ref(false)

const newMeal = ref({
  type: 'Breakfast',
  name: '',
  calories: null,
  time: '',
  imageUrl: null
})

// Edit meal state
const editMealForm = ref({
  id: null,
  type: 'Breakfast',
  name: '',
  calories: null,
  time: '',
  linkedCalorieEntryId: null
})
const editMealPreview = ref(null)
const editMealFile = ref(null)
const editMealIsUploading = ref(false)
const editMealDate = ref(null)
const storage = getStorage()

// Day headers
const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Current month/year display
const currentMonthYear = computed(() => {
  const date = new Date(currentYear.value, currentMonth.value)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

// Generate calendar days
const calendarDays = computed(() => {
  // Helper function to format date in LOCAL timezone (not UTC)
  function formatLocalDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

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
      date: formatLocalDate(date),
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
      date: formatLocalDate(date),
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
    date.setHours(0, 0, 0, 0)
    days.push({
      dayNumber: i,
      date: formatLocalDate(date),
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
// Meals are now loaded automatically by mealPlanStore real-time listener

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

  // If user was adding a recipe from RecipeDetail, pre-fill and open the add meal dialog
  if (isSelectingDayForRecipe.value && recipeFromSession.value) {
    console.log('🎯 Day selected for recipe, opening add meal dialog with pre-filled data')
    newMeal.value.name = recipeFromSession.value.name
    newMeal.value.calories = recipeFromSession.value.calories
    // Store image URL internally for Firebase but don't show in dialog
    newMeal.value.imageUrl = recipeFromSession.value.imageUrl
    newMeal.value.type = 'Breakfast' // Default meal type
    newMeal.value.time = ''

    // Open the add meal dialog after a short delay to ensure day detail is ready
    setTimeout(() => {
      showAddMealDialog.value = true
    }, 100)
  }
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
    time: '',
    imageUrl: null
  }

  // Reset recipe selection if closing without adding
  if (isSelectingDayForRecipe.value) {
    isSelectingDayForRecipe.value = false
    recipeFromSession.value = null
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

    // First, handle calorie syncing - create calorie entry for ALL meal dates
    let linkedCalorieEntryId = null
    const [year, month, day] = selectedDay.value.date.split('-')
    const mealDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    mealDate.setHours(0, 0, 0, 0)

    try {
      console.log('📊 Adding calorie entry for meal:', newMeal.value.name, 'Calories:', newMeal.value.calories)
      const calorieValue = newMeal.value.calories ? parseInt(newMeal.value.calories) : 0

      // Add calorie entry with linkedMealId (will be set after meal is created)
      // Create entry with timestamp matching the meal date
      linkedCalorieEntryId = await addCalorieEntry(authStore.user.email, {
        food: newMeal.value.name,
        calories: calorieValue,
        mealType: newMeal.value.type || 'Meal',
        linkedMealId: null, // Will update this after meal is created
        timestamp: mealDate.getTime() // Use meal date as timestamp
      })
      console.log('✅ Calorie entry added with ID:', linkedCalorieEntryId, 'for date:', selectedDay.value.date)
    } catch (calorieErr) {
      console.error('❌ Error adding calorie entry:', calorieErr)
      console.warn('⚠️ Could not add calorie entry, continuing with meal creation:', calorieErr)
      // Don't fail the meal addition if calorie entry fails
    }

    // Add meal to Firebase with linkedCalorieEntryId
    const mealId = await addMealPlan(authStore.user.email, {
      date: selectedDay.value.date,
      type: newMeal.value.type,
      name: newMeal.value.name,
      calories: newMeal.value.calories,
      time: newMeal.value.time,
      imageUrl: newMeal.value.imageUrl || null,
      linkedCalorieEntryId: linkedCalorieEntryId // Link them together
    })

    console.log('✅ Meal added with ID:', mealId)

    // Update calorie entry with linked meal ID to complete bidirectional link
    if (linkedCalorieEntryId) {
      try {
        await updateCalorieEntry(authStore.user.email, linkedCalorieEntryId, {
          linkedMealId: mealId
        })
        console.log('✅ Calorie entry updated with linked meal ID')
      } catch (updateErr) {
        console.warn('⚠️ Could not update calorie entry with meal link:', updateErr.message)
      }
    }

    // Meal will be added automatically by mealPlanStore's real-time listener
    console.log('✅ Meal added successfully and linked to calorie entry')

    // Reset recipe selection after successful addition
    if (isSelectingDayForRecipe.value) {
      isSelectingDayForRecipe.value = false
      recipeFromSession.value = null
      console.log('✅ Recipe successfully added to meal planner and synced to calorie tracker')
    }
  } catch (err) {
    console.error('❌ Error adding meal:', err)
    error.value = 'Failed to add meal. Please try again.'
  }

  closeAddMealDialog()
}

async function removeMeal(mealId) {
  try {
    await mealPlanStore.removeMeal(mealId)
    // Real-time listener will automatically update meals
    console.log('✅ Meal deleted and real-time listener will update the UI')
  } catch (err) {
    console.error('❌ Error removing meal:', err)
  }
}

// Edit meal functions
function openEditMealDialog(meal, date) {
  editMealForm.value = {
    id: meal.id,
    type: meal.type || 'Breakfast',
    name: meal.name || '',
    calories: meal.calories || null,
    time: meal.time || '',
    linkedCalorieEntryId: meal.linkedCalorieEntryId || null
  }
  editMealPreview.value = meal.imageUrl || null
  editMealFile.value = null
  editMealDate.value = date
  showEditMealDialog.value = true
}

function closeEditMealDialog() {
  showEditMealDialog.value = false
  editMealForm.value = {
    id: null,
    type: 'Breakfast',
    name: '',
    calories: null,
    time: '',
    linkedCalorieEntryId: null
  }
  editMealPreview.value = null
  editMealFile.value = null
  editMealDate.value = null
}

function handleEditImageUpload(event) {
  const file = event.target.files?.[0]
  if (!file) return

  // Validate file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    error.value = 'Image must be less than 5MB'
    return
  }

  editMealFile.value = file
  const reader = new FileReader()
  reader.onload = (e) => {
    editMealPreview.value = e.target?.result
  }
  reader.readAsDataURL(file)
  error.value = ''
}

function removeEditImage() {
  editMealPreview.value = null
  editMealFile.value = null
}

function getMealTypeEmoji(type) {
  const emojis = {
    'Breakfast': '🥞',
    'Lunch': '🥗',
    'Dinner': '🍝',
    'Snack': '🍎'
  }
  return emojis[type] || '🍽️'
}

async function submitEditMeal() {
  if (!editMealForm.value.name) {
    error.value = 'Please enter a meal name'
    return
  }

  if (!editMealForm.value.calories || editMealForm.value.calories <= 0) {
    error.value = 'Please enter valid calories'
    return
  }

  editMealIsUploading.value = true
  error.value = ''

  try {
    let imageUrl = editMealPreview.value && !editMealFile.value ? editMealForm.value.imageUrl : null

    // Upload image if new one selected
    if (editMealFile.value) {
      const timestamp = Date.now()
      const filename = `meals/${editMealForm.value.id}_${timestamp}`
      const mealStorageRef = storageRef(storage, filename)

      const snapshot = await uploadBytes(mealStorageRef, editMealFile.value)
      imageUrl = await getDownloadURL(snapshot.ref)
    }

    // Update meal in Firebase
    await updateMealPlan(authStore.user.email, editMealForm.value.id, {
      type: editMealForm.value.type,
      name: editMealForm.value.name,
      calories: editMealForm.value.calories,
      time: editMealForm.value.time,
      imageUrl: imageUrl || null
    })

    // Update linked calorie entry if it exists
    if (editMealForm.value.linkedCalorieEntryId) {
      try {
        await updateCalorieEntry(authStore.user.email, editMealForm.value.linkedCalorieEntryId, {
          food: editMealForm.value.name,
          calories: editMealForm.value.calories,
          mealType: editMealForm.value.type
        })
        console.log('✅ Linked calorie entry updated successfully')
      } catch (calorieError) {
        console.warn('⚠️ Could not update linked calorie entry:', calorieError.message)
      }
    }

    // Update local array
    const mealIndex = meals.value.findIndex(m => m.id === editMealForm.value.id)
    if (mealIndex !== -1) {
      meals.value[mealIndex] = {
        ...meals.value[mealIndex],
        type: editMealForm.value.type,
        name: editMealForm.value.name,
        calories: editMealForm.value.calories,
        time: editMealForm.value.time,
        imageUrl: imageUrl || meals.value[mealIndex].imageUrl
      }
    }

    console.log('✅ Meal updated successfully')
    closeEditMealDialog()
  } catch (err) {
    console.error('Error updating meal:', err)
    error.value = 'Failed to save meal. Please try again.'
  } finally {
    editMealIsUploading.value = false
  }
}

async function deleteEditMeal() {
  if (!confirm('Are you sure you want to delete this meal?')) {
    return
  }

  try {
    // Delete meal from Firebase
    await deleteMealPlan(authStore.user.email, editMealForm.value.id)

    // Remove from local array
    meals.value = meals.value.filter(meal => meal.id !== editMealForm.value.id)

    console.log('✅ Meal deleted successfully')
    closeEditMealDialog()
  } catch (err) {
    console.error('Error deleting meal:', err)
    error.value = 'Failed to delete meal. Please try again.'
  }
}

// Lifecycle hook
onMounted(() => {
  // Check if there's recipe data from RecipeDetail
  const recipeData = sessionStorage.getItem('mealPlannerRecipe')
  if (recipeData) {
    try {
      recipeFromSession.value = JSON.parse(recipeData)
      isSelectingDayForRecipe.value = true
      // Clear the session storage
      sessionStorage.removeItem('mealPlannerRecipe')
      console.log('📋 Waiting for user to select a day for recipe:', recipeFromSession.value.name)
    } catch (err) {
      console.error('Error parsing recipe data:', err)
    }
  }

  // Meals are automatically loaded by mealPlanStore real-time listener
  console.log('📦 Meal planner mounted - meals will load automatically from store')
})
</script>
