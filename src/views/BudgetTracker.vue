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

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Monthly Budget Card - Left Side -->
        <div class="lg:col-span-1">
          <div class="bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl p-6 sm:p-8 hover:border-yellow-400/20 transition-all duration-300 sticky top-24">
            <h2 class="text-xs font-mono uppercase tracking-wider text-gray-400 mb-4">Monthly Budget</h2>
            <div v-if="!isEditingBudget">
              <div>
                <p class="text-gray-400 text-sm mb-2">Budget Remaining</p>
                <p class="text-3xl font-light text-white mb-6">{{ formatCurrency(monthlyRemaining) }}</p>
                <div class="bg-gray-800/30 border border-gray-800/50 rounded-lg p-4 mb-6">
                  <p class="text-xs text-gray-400 mb-1">Total Monthly Budget</p>
                  <p class="text-xl font-medium text-yellow-400">{{ formatCurrency(monthlyBudget) }}</p>
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
          <!-- Add Expense Form -->
          <div class="bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl p-6 sm:p-8 mb-6 hover:border-yellow-400/20 transition-all duration-300">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-light text-white">Add Expense</h2>
              <div class="flex gap-2">
                <button
                  @click="updateFromCartAsExpense"
                  class="px-4 py-2 bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 rounded-lg hover:bg-yellow-400/30 transition-all duration-200 text-sm font-medium"
                  title="Import shopping cart total as expense"
                >
                  Update from Cart
                </button>
                <button
                  @click="clearExpenses"
                  class="px-4 py-2 bg-red-900/20 text-red-300 border border-red-500/30 rounded-lg hover:bg-red-900/40 transition-all duration-200 text-sm font-medium"
                  title="Clear all expenses"
                >
                  Clear All
                </button>
              </div>
            </div>

            <form @submit.prevent="addExpense" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  v-model="newExpense.name"
                  placeholder="Expense name"
                  class="px-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 transition-all duration-200 outline-none"
                />
                <input
                  v-model.number="newExpense.amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Amount"
                  class="px-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 transition-all duration-200 outline-none"
                />
                <select
                  v-model="newExpense.category"
                  class="px-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 transition-all duration-200 outline-none"
                >
                  <option value="">Select category</option>
                  <option value="groceries">Groceries</option>
                  <option value="dining">Dining Out</option>
                  <option value="takeaway">Takeaway</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <button
                type="submit"
                class="w-full px-4 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-all duration-200"
              >
                Add Expense
              </button>
            </form>
          </div>

          <!-- Recent Expenses -->
          <div class="bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl p-6 sm:p-8 hover:border-yellow-400/20 transition-all duration-300">
            <h3 class="text-lg font-light text-white mb-6">Recent Expenses</h3>
            <div v-if="expenses.length > 0" class="space-y-3">
              <div
                v-for="(e, idx) in expenses"
                :key="e.id"
                class="flex items-center justify-between p-4 rounded-lg border border-gray-800/30 hover:border-gray-700/50 transition-all duration-200"
              >
                <div>
                  <div class="font-medium text-white">{{ e.name }}</div>
                  <div class="text-xs text-gray-400 mt-1">
                    {{ capitalizeCategory(e.category) }} • {{ formatDate(new Date(e.date)) }}
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <div class="text-yellow-400 font-medium whitespace-nowrap">{{ formatCurrency(e.amount) }}</div>
                  <button
                    @click="removeExpense(idx)"
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
                  <p class="text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">Total Expenses</p>
                  <p class="text-gray-300 text-sm">{{ expenses.length }} {{ expenses.length === 1 ? 'transaction' : 'transactions' }}</p>
                </div>
                <div class="text-right">
                  <p class="text-3xl font-light text-yellow-400">{{ formatCurrency(totalExpenses) }}</p>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-12">
              <div class="text-4xl mb-3">💰</div>
              <p class="text-gray-400">No expenses yet. Add one to get started!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const isEditingBudget = ref(false)
const monthlyBudgetInput = ref(null)
const monthlyBudget = ref(0)
const newExpense = ref({ name: '', amount: null, category: '' })
const expenses = ref([])

const totalExpenses = computed(() =>
  expenses.value.reduce((sum, e) => sum + Number(e.amount || 0), 0)
)

const monthlyRemaining = computed(() =>
  Number(monthlyBudget.value || 0) - Number(totalExpenses.value || 0)
)

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

const saveMonthlyBudget = () => {
  const amt = Number(monthlyBudgetInput.value)
  if (isNaN(amt) || amt < 0) {
    alert('Enter a valid non-negative budget amount.')
    return
  }
  monthlyBudget.value = Number(amt.toFixed(2))
  localStorage.setItem('monthlyBudget', String(monthlyBudget.value))
  isEditingBudget.value = false
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
      alert('Your shopping cart is empty — add items before updating.')
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
  } catch (err) {
    console.error('updateFromCartAsExpense error', err)
    alert('Failed to update from cart. See console for details.')
  }
}

const addExpense = () => {
  if (!newExpense.value.name || newExpense.value.amount == null || newExpense.value.category === '') {
    alert('Please fill all expense fields.')
    return
  }
  const entry = {
    id: Date.now() + Math.random(),
    name: newExpense.value.name,
    amount: Number(newExpense.value.amount),
    category: newExpense.value.category,
    date: new Date().toISOString()
  }
  expenses.value.unshift(entry)
  localStorage.setItem('expenses', JSON.stringify(expenses.value))
  newExpense.value = { name: '', amount: null, category: '' }
}

const removeExpense = (idx) => {
  expenses.value.splice(idx, 1)
  localStorage.setItem('expenses', JSON.stringify(expenses.value))
}

const clearExpenses = () => {
  if (!confirm('Clear all expenses?')) return
  expenses.value = []
  localStorage.removeItem('expenses')
}

onMounted(() => {
  const mb = localStorage.getItem('monthlyBudget')
  monthlyBudget.value = mb ? Number(mb) : 0
  monthlyBudgetInput.value = monthlyBudget.value ? String(monthlyBudget.value) : null

  const saved = localStorage.getItem('expenses')
  expenses.value = saved ? JSON.parse(saved) : []
})
</script>
