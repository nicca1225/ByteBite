<template>
  <main class="min-h-screen bg-black px-4 py-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header with Title -->
      <div class="mb-8">
        <div class="inline-block mb-4">
          <span class="text-xs font-mono uppercase tracking-wider text-yellow-400/80 bg-yellow-400/10 px-3 py-1.5 rounded-full border border-yellow-400/20">
            Budget Tracker
          </span>
        </div>
        <h1 class="text-4xl sm:text-5xl font-light text-white">Budget Tracker</h1>
      </div>

      <!-- Clear Expenses Confirmation Modal -->
      <div v-if="showClearConfirmation" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
          <div class="mb-6">
            <h2 class="text-lg font-light text-white mb-2">Clear All Expenses?</h2>
            <p class="text-gray-400 text-sm">This action will permanently delete all {{ expenses.length }} expense record(s). This cannot be undone.</p>
          </div>

          <div class="flex gap-3">
            <button
              @click="confirmClearExpenses"
              class="flex-1 px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-200"
            >
              Clear All
            </button>
            <button
              @click="cancelClearExpenses"
              class="flex-1 px-4 py-3 border border-gray-700/50 text-gray-300 rounded-lg hover:border-yellow-400/30 hover:bg-gray-900/50 transition-all duration-200 font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <!-- Add/Edit Expense Modal -->
      <div v-if="showExpenseModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-light text-white">{{ isEditingExpense ? 'Edit Expense' : 'Add Expense' }}</h2>
            <button
              @click="closeExpenseModal"
              class="text-gray-500 hover:text-gray-300 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <form @submit.prevent="addExpense" class="space-y-4">
            <div>
              <label class="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Expense Name</label>
              <input
                v-model="newExpense.name"
                placeholder="e.g., Groceries"
                class="w-full px-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 transition-all duration-200 outline-none"
              />
            </div>

            <div>
              <label class="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Amount</label>
              <input
                v-model.number="newExpense.amount"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                class="w-full px-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 transition-all duration-200 outline-none"
              />
            </div>

            <div>
              <label class="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Category</label>
              <select
                v-model="newExpense.category"
                class="w-full px-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 transition-all duration-200 outline-none"
              >
                <option value="">Select category</option>
                <option value="groceries">Groceries</option>
                <option value="dining">Dining Out</option>
                <option value="takeaway">Takeaway</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label class="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Date</label>
              <div class="relative" @click.self="showDatePicker = false">
                <input
                  v-model="newExpense.date"
                  type="text"
                  placeholder="Select a date"
                  readonly
                  @click="toggleDatePicker"
                  class="w-full px-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 transition-all duration-200 outline-none cursor-pointer"
                />
                <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>

                <!-- Calendar Picker -->
                <div v-if="showDatePicker" class="absolute top-full left-0 mt-2 bg-gradient-to-br from-gray-900 to-black border border-gray-700/50 rounded-lg shadow-2xl p-4 z-50 w-80" @click.stop>
                <!-- Calendar Header -->
                <div class="flex items-center justify-between mb-4">
                  <button
                    @click="previousMonth"
                    class="p-1 hover:bg-gray-800/50 rounded-lg transition-colors"
                  >
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                  </button>
                  <div class="text-center">
                    <p class="text-white font-semibold">{{ monthYear }}</p>
                  </div>
                  <button
                    @click="nextMonth"
                    class="p-1 hover:bg-gray-800/50 rounded-lg transition-colors"
                  >
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>

                <!-- Day Headers -->
                <div class="grid grid-cols-7 gap-1 mb-2">
                  <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day" class="text-center text-xs text-gray-500 font-semibold py-2">
                    {{ day }}
                  </div>
                </div>

                <!-- Calendar Days -->
                <div class="grid grid-cols-7 gap-1">
                  <button
                    v-for="day in calendarDays"
                    :key="day.date"
                    @click="selectDate(day.date)"
                    :class="[
                      'py-2 px-1 rounded-lg text-sm transition-all duration-200',
                      day.isCurrentMonth
                        ? day.isSelected
                          ? 'bg-yellow-400 text-black font-semibold'
                          : day.isToday
                          ? 'text-yellow-400 font-semibold border border-yellow-400/50'
                          : 'text-gray-300 hover:bg-gray-800/50'
                        : 'text-gray-600'
                    ]"
                    :disabled="!day.isCurrentMonth"
                  >
                    {{ day.day }}
                  </button>
                </div>

                <!-- Close Button -->
                <button
                  @click="showDatePicker = false"
                  class="w-full mt-4 px-3 py-2 bg-gray-800/30 text-gray-300 rounded-lg hover:bg-gray-800/50 transition-colors text-sm font-medium"
                >
                  Done
                </button>
                </div>
              </div>
            </div>

            <div class="flex gap-3 pt-4">
              <button
                type="submit"
                class="flex-1 px-4 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-all duration-200"
              >
                {{ isEditingExpense ? 'Update' : 'Add' }}
              </button>
              <button
                type="button"
                @click="closeExpenseModal"
                class="flex-1 px-4 py-3 border border-gray-700/50 text-gray-300 rounded-lg hover:border-yellow-400/30 hover:bg-gray-900/50 transition-all duration-200 font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Monthly Budget Card - Left Side -->
        <div class="lg:col-span-1">
          <div class="bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl p-6 sm:p-8 hover:border-yellow-400/20 transition-all duration-300 sticky top-24">
            <h2 class="text-xs font-mono uppercase tracking-wider text-gray-400 mb-6">Monthly Budget</h2>
            <div v-if="!isEditingBudget" class="space-y-6">
              <!-- Ring Progress Indicator -->
              <div class="flex items-center justify-center">
                <div class="relative w-40 h-40">
                  <!-- Background Ring -->
                  <svg class="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="8"
                      class="text-gray-800"
                    />
                    <!-- Progress Ring -->
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      :stroke="budgetSpentPercentage > 100 ? '#ef4444' : '#facc15'"
                      stroke-width="8"
                      :style="{
                        strokeDasharray: `${(budgetSpentPercentage / 100) * 439.82} 439.82`,
                        transition: 'stroke-dasharray 0.3s ease'
                      }"
                      stroke-linecap="round"
                    />
                  </svg>
                  <!-- Center Text -->
                  <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <p class="text-2xl font-light text-white">{{ Math.min(budgetSpentPercentage, 100).toFixed(0) }}%</p>
                    <p class="text-xs text-gray-400 mt-1">Spent</p>
                  </div>
                </div>
              </div>

              <!-- Budget Info -->
              <div class="space-y-4">
                <div class="bg-gray-800/30 border border-gray-800/50 rounded-lg p-4">
                  <p class="text-xs text-gray-400 mb-1">Total Monthly Budget</p>
                  <p class="text-2xl font-medium text-yellow-400">{{ formatCurrency(monthlyBudget) }}</p>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div class="bg-gray-800/20 border border-gray-800/30 rounded-lg p-3">
                    <p class="text-xs text-gray-400 mb-1">Spent</p>
                    <p class="text-lg font-medium text-yellow-300">{{ formatCurrency(totalExpenses) }}</p>
                  </div>
                  <div class="bg-gray-800/20 border border-gray-800/30 rounded-lg p-3">
                    <p class="text-xs text-gray-400 mb-1">Remaining</p>
                    <p :class="['text-lg font-medium', monthlyRemaining >= 0 ? 'text-green-400' : 'text-red-400']">
                      {{ formatCurrency(monthlyRemaining) }}
                    </p>
                  </div>
                </div>

                <div class="bg-gray-800/20 border border-gray-800/30 rounded-lg p-3">
                  <p class="text-xs text-gray-400 mb-1">~Budget Per Day</p>
                  <p class="text-lg font-medium text-blue-400">{{ formatCurrency(dailyBudget) }}</p>
                </div>
              </div>

              <button
                @click="isEditingBudget = true"
                class="w-full px-4 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-all duration-200"
              >
                Edit Budget
              </button>
            </div>

            <div v-else class="space-y-4">
              <h3 class="text-sm font-light text-white">Set Monthly Budget</h3>
              <input
                v-model.number="monthlyBudgetInput"
                type="number"
                min="0"
                step="0.01"
                class="w-full px-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 transition-all duration-200 outline-none"
                placeholder="0.00"
              />
              <div class="flex gap-2">
                <button
                  @click="saveMonthlyBudget"
                  class="flex-1 px-4 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-all duration-200"
                >
                  Save
                </button>
                <button
                  @click="cancelEditBudget"
                  class="flex-1 px-4 py-3 border border-gray-700/50 text-gray-300 rounded-lg hover:border-yellow-400/30 hover:bg-gray-900/50 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Expenses Section - Right Side -->
        <div class="lg:col-span-2">
          <!-- Month Navigation Filter -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-4">
              <button
                @click="previousFilterMonth"
                class="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
                title="Previous month"
              >
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <div class="text-center min-w-40">
                <p class="text-sm text-gray-400 uppercase tracking-wide">Filter by Month</p>
                <p class="text-lg font-semibold text-white">{{ getFilterMonthYear }}</p>
              </div>
              <button
                @click="nextFilterMonth"
                class="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
                title="Next month"
              >
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-2 mb-6">
            <button
              @click="openExpenseModal"
              class="flex-1 px-4 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-all duration-200"
            >
              Add Expense
            </button>
            <button
              @click="updateFromCartAsExpense"
              class="px-4 py-3 bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 rounded-lg hover:bg-yellow-400/30 transition-all duration-200 font-medium"
              title="Import shopping cart total as expense"
            >
              Update from Cart
            </button>
            <button
              @click="clearExpenses"
              class="px-4 py-3 bg-red-900/20 text-red-300 border border-red-500/30 rounded-lg hover:bg-red-900/40 transition-all duration-200 font-medium"
              title="Clear all expenses"
            >
              Clear All
            </button>
          </div>

          <!-- Recent Expenses -->
          <div class="bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl p-6 sm:p-8 hover:border-yellow-400/20 transition-all duration-300">
            <h3 class="text-lg font-light text-white mb-6">
              Expenses for {{ getFilterMonthYear }}
            </h3>
            <div v-if="filteredExpenses.length > 0" class="space-y-3">
              <div
                v-for="(e, idx) in filteredExpenses"
                :key="e.id"
                class="flex items-center justify-between p-4 rounded-lg border border-gray-800/30 hover:border-gray-700/50 transition-all duration-200"
                :class="{ 'border-blue-600/30 bg-blue-900/10': e.fromShoppingList }"
              >
                <div>
                  <div class="font-medium text-white flex items-center gap-2">
                    {{ e.name }}
                    <span v-if="e.fromShoppingList" class="text-xs bg-blue-500/30 text-blue-300 px-2 py-1 rounded-full border border-blue-500/50">
                      From Shopping List
                    </span>
                  </div>
                  <div class="text-xs text-gray-400 mt-1">
                    {{ capitalizeCategory(e.category) }} • {{ formatDate(new Date(e.date)) }}
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <div class="text-yellow-400 font-medium whitespace-nowrap">{{ formatCurrency(e.amount) }}</div>
                  <button
                    @click="editExpense(expenses.indexOf(e))"
                    class="text-gray-500 hover:text-yellow-400 transition-colors p-1 hover:bg-yellow-400/10 rounded-lg"
                    title="Edit expense"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button
                    @click="removeExpense(expenses.indexOf(e))"
                    class="text-gray-500 hover:text-red-400 transition-colors p-1 hover:bg-red-900/20 rounded-lg"
                    title="Remove expense"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Separator -->
              <div class="border-t border-gray-800/50 my-6"></div>

              <!-- Total Expenses -->
              <div class="flex justify-between items-end">
                <div>
                  <p class="text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">Total Expenses This Month</p>
                  <p class="text-gray-300 text-sm">{{ filteredExpenses.length }} {{ filteredExpenses.length === 1 ? 'transaction' : 'transactions' }}</p>
                </div>
                <div class="text-right">
                  <p class="text-3xl font-light text-yellow-400">{{ formatCurrency(totalExpenses) }}</p>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-12">
              <div class="text-4xl mb-3">💰</div>
              <p class="text-gray-400">No expenses for {{ getFilterMonthYear }}. Add one to get started!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePreferencesStore } from '@/stores/preferencesStore'
import { showToast } from '@/utils/toast'

const preferencesStore = usePreferencesStore()

const isEditingBudget = ref(false)
const monthlyBudgetInput = ref(null)
const monthlyBudget = computed(() => preferencesStore.monthlyBudget)
const isEditingExpense = ref(false)
const editingExpenseIdx = ref(null)
const showExpenseModal = ref(false)
const showClearConfirmation = ref(false)
const showDatePicker = ref(false)
const currentMonth = ref(new Date())
const selectedFilterMonth = ref(new Date())
const newExpense = ref({ name: '', amount: null, category: '', date: '' })
const expenses = ref([])

const filteredExpenses = computed(() => {
  const year = selectedFilterMonth.value.getFullYear()
  const month = selectedFilterMonth.value.getMonth()

  return expenses.value.filter(e => {
    const expenseDate = new Date(e.date)
    return expenseDate.getFullYear() === year && expenseDate.getMonth() === month
  })
})

const totalExpenses = computed(() =>
  filteredExpenses.value.reduce((sum, e) => sum + Number(e.amount || 0), 0)
)

const monthlyRemaining = computed(() =>
  Number(monthlyBudget.value || 0) - Number(totalExpenses.value || 0)
)

const budgetSpentPercentage = computed(() => {
  if (monthlyBudget.value <= 0) return 0
  return (totalExpenses.value / monthlyBudget.value) * 100
})

const dailyBudget = computed(() => {
  if (monthlyBudget.value <= 0) return 0
  // Assuming 30 days in a month for average daily budget
  return monthlyBudget.value / 30
})

const formatCurrency = (v) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(v || 0))
}

const formatDate = (date) => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const capitalizeCategory = (category) => {
  if (!category) return 'Uncategorized'
  return category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1').trim()
}

const monthYear = computed(() => {
  return currentMonth.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const calendarDays = computed(() => {
  const year = currentMonth.value.getFullYear()
  const month = currentMonth.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const prevLastDay = new Date(year, month, 0)
  const firstDayOfWeek = firstDay.getDay()
  const lastDayOfMonth = lastDay.getDate()
  const prevLastDayOfMonth = prevLastDay.getDate()

  const days = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Previous month days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    days.push({
      day: prevLastDayOfMonth - i,
      date: new Date(year, month - 1, prevLastDayOfMonth - i),
      isCurrentMonth: false,
      isSelected: false,
      isToday: false
    })
  }

  // Current month days
  for (let i = 1; i <= lastDayOfMonth; i++) {
    const date = new Date(year, month, i)
    date.setHours(0, 0, 0, 0)
    // Format date as YYYY-MM-DD using local time (not UTC)
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    const isSelected = newExpense.value.date === dateString
    const isToday = date.getTime() === today.getTime()

    days.push({
      day: i,
      date: dateString,
      isCurrentMonth: true,
      isSelected,
      isToday
    })
  }

  // Next month days
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
      isSelected: false,
      isToday: false
    })
  }

  return days
})

const saveMonthlyBudget = async () => {
  const amt = Number(monthlyBudgetInput.value)
  if (isNaN(amt) || amt < 0) {
    showToast('Enter a valid non-negative budget amount.', 'error')
    return
  }

  try {
    const roundedAmount = Number(amt.toFixed(2))
    // Update via store which syncs with Firebase and all connected components
    await preferencesStore.updateBudget(roundedAmount)
    isEditingBudget.value = false
    showToast('Monthly budget updated successfully!', 'success')
  } catch (error) {
    showToast('Failed to update budget: ' + error.message, 'error')
    console.error(error)
  }
}

const cancelEditBudget = () => {
  monthlyBudgetInput.value = monthlyBudget.value ? String(monthlyBudget.value) : null
  isEditingBudget.value = false
}

const fetchCartTotal = async () => {
  try {
    const raw = localStorage.getItem('shoppingList')
    if (!raw) return 0
    const list = JSON.parse(raw)
    const total = list.reduce((sum, item) => {
      const price = Number(item.spoonacularPrice || item.estimatedPrice || item.price || 0)
      return sum + (isNaN(price) ? 0 : price)
    }, 0)
    return total
  } catch (err) {
    console.error('fetchCartTotal error', err)
    return 0
  }
}

const updateFromCartAsExpense = async () => {
  try {
    const cartTotal = await fetchCartTotal()
    if (!cartTotal || Number(cartTotal) <= 0) {
      showToast('Your shopping cart is empty — add items before updating.', 'warning')
      return
    }

    const entry = {
      id: Date.now() + Math.random(),
      name: 'Grocery cart',
      amount: Number(cartTotal || 0),
      category: 'groceries',
      date: new Date().toISOString()
    }
    expenses.value.unshift(entry)
    localStorage.setItem('expenses', JSON.stringify(expenses.value))
    showToast('Cart total added as expense!', 'success')
  } catch (err) {
    console.error('updateFromCartAsExpense error', err)
    showToast('Failed to update from cart. See console for details.', 'error')
  }
}

const toggleDatePicker = () => {
  showDatePicker.value = !showDatePicker.value
  if (showDatePicker.value && !newExpense.value.date) {
    currentMonth.value = new Date()
  } else if (showDatePicker.value && newExpense.value.date) {
    currentMonth.value = new Date(newExpense.value.date)
  }
}

const previousMonth = () => {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() - 1)
}

const nextMonth = () => {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() + 1)
}

const previousFilterMonth = () => {
  selectedFilterMonth.value = new Date(selectedFilterMonth.value.getFullYear(), selectedFilterMonth.value.getMonth() - 1)
}

const nextFilterMonth = () => {
  selectedFilterMonth.value = new Date(selectedFilterMonth.value.getFullYear(), selectedFilterMonth.value.getMonth() + 1)
}

const getFilterMonthYear = computed(() => {
  return selectedFilterMonth.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const selectDate = (dateString) => {
  newExpense.value.date = dateString
  showDatePicker.value = false
}

const openExpenseModal = () => {
  isEditingExpense.value = false
  editingExpenseIdx.value = null
  newExpense.value = { name: '', amount: null, category: '', date: '' }
  showDatePicker.value = false
  showExpenseModal.value = true
}

const closeExpenseModal = () => {
  showExpenseModal.value = false
  showDatePicker.value = false
  isEditingExpense.value = false
  editingExpenseIdx.value = null
  newExpense.value = { name: '', amount: null, category: '', date: '' }
}

const addExpense = () => {
  if (!newExpense.value.name || newExpense.value.amount == null || newExpense.value.category === '') {
    showToast('Please fill all expense fields.', 'error')
    return
  }

  if (isEditingExpense.value && editingExpenseIdx.value !== null) {
    // Update existing expense
    const expense = expenses.value[editingExpenseIdx.value]
    expense.name = newExpense.value.name
    expense.amount = Number(newExpense.value.amount)
    expense.category = newExpense.value.category
    // Convert date input (YYYY-MM-DD) to ISO string
    if (newExpense.value.date) {
      expense.date = new Date(newExpense.value.date).toISOString()
    }
    localStorage.setItem('expenses', JSON.stringify(expenses.value))
  } else {
    // Add new expense
    const entry = {
      id: Date.now() + Math.random(),
      name: newExpense.value.name,
      amount: Number(newExpense.value.amount),
      category: newExpense.value.category,
      date: newExpense.value.date ? new Date(newExpense.value.date).toISOString() : new Date().toISOString()
    }
    expenses.value.unshift(entry)
    localStorage.setItem('expenses', JSON.stringify(expenses.value))
  }

  closeExpenseModal()
}

const editExpense = (idx) => {
  const expense = expenses.value[idx]
  // Convert ISO date to input format (YYYY-MM-DD)
  const dateObj = new Date(expense.date)
  const dateString = dateObj.toISOString().split('T')[0]

  newExpense.value = {
    name: expense.name,
    amount: expense.amount,
    category: expense.category,
    date: dateString
  }
  isEditingExpense.value = true
  editingExpenseIdx.value = idx
  showExpenseModal.value = true
}

const cancelEditExpense = () => {
  closeExpenseModal()
}

const removeExpense = (idx) => {
  expenses.value.splice(idx, 1)
  localStorage.setItem('expenses', JSON.stringify(expenses.value))
}

const clearExpenses = () => {
  if (expenses.value.length === 0) {
    showToast('No expenses to clear.', 'info')
    return
  }
  showClearConfirmation.value = true
}

const confirmClearExpenses = () => {
  expenses.value = []
  localStorage.removeItem('expenses')
  showClearConfirmation.value = false
  showToast('All expenses cleared.', 'success')
}

const cancelClearExpenses = () => {
  showClearConfirmation.value = false
}

onMounted(() => {
  // Store automatically sets up listener via watch on authStore.user
  // Initialize monthlyBudgetInput from store
  monthlyBudgetInput.value = preferencesStore.monthlyBudget ? String(preferencesStore.monthlyBudget) : null

  // Load expenses from localStorage (not synced with Firebase, local only)
  const saved = localStorage.getItem('expenses')
  expenses.value = saved ? JSON.parse(saved) : []
})
</script>
