<template>
  <div class="min-h-screen bg-black text-white py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-gray-900 border border-yellow-400/30 rounded-3xl p-8 shadow-xl">
        <h1 class="text-3xl font-bold text-yellow-400 mb-4">Budget Tracker</h1>

        <!-- Monthly Budget Remaining (only) & Edit -->
        <div class="mb-8">
          <div v-if="!isEditingBudget" class="flex justify-between items-center">
            <div>
              <h2 class="text-xl text-gray-300">Monthly Budget Remaining</h2>
              <p class="text-2xl font-bold text-white">{{ formatCurrency(monthlyRemaining) }}</p>
              <p class="text-sm text-gray-400 mt-1">
                Monthly budget: <span class="font-semibold text-yellow-400">{{ formatCurrency(monthlyBudget) }}</span>
              </p>
            </div>
            <button @click="isEditingBudget = true" class="px-4 py-2 bg-gray-800 text-yellow-400 rounded-xl hover:bg-gray-700">
              Edit Budget
            </button>
          </div>

          <div v-else class="space-y-4">
            <h2 class="text-xl text-gray-300">Set Monthly Budget</h2>
            <div class="flex gap-4">
              <input
                v-model.number="monthlyBudgetInput"
                type="number"
                min="0"
                step="0.01"
                class="flex-1 bg-gray-800 border border-yellow-400/20 rounded p-2"
                placeholder="0.00"
              />
              <button @click="saveMonthlyBudget" class="px-6 py-2 bg-yellow-400 text-black rounded-xl hover:bg-yellow-300">Save</button>
              <button @click="cancelEditBudget" class="px-4 py-2 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700">Cancel</button>
            </div>
          </div>
        </div>

        <!-- Add Expense & List (includes Update from Cart button) -->
        <div class="mb-8 p-6 bg-gray-800/50 rounded-xl border border-yellow-400/20">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-white">Add Expense</h2>
            <div class="flex gap-3">
              <button @click="updateFromCartAsExpense" class="px-4 py-2 bg-yellow-400 text-black rounded-xl hover:bg-yellow-300 font-semibold">
                Update from Cart
              </button>
              <button @click="clearExpenses" class="px-4 py-2 bg-gray-800 text-red-400 rounded-xl hover:bg-gray-700">Clear All</button>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <input v-model="newExpense.name" placeholder="Expense name" class="bg-gray-800 border border-yellow-400/20 rounded p-2" />
            <input v-model.number="newExpense.amount" type="number" min="0" step="0.1" placeholder="Amount" class="bg-gray-800 border border-yellow-400/20 rounded p-2" />
            <select v-model="newExpense.category" class="bg-gray-800 border border-yellow-400/20 rounded p-2">
              <option value="">Select category</option>
              <option value="groceries">Groceries</option>
              <option value="dining">Dining Out</option>
              <option value="takeaway">Takeaway</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div class="flex gap-3">
            <button @click="addExpense" class="px-4 py-2 bg-yellow-400 text-black rounded-xl hover:bg-yellow-300 font-semibold">Add Expense</button>
          </div>
          <div class="mt-6">
            <h3 class="text-lg font-semibold text-white mb-3">Recent Expenses</h3>
            <div class="space-y-2">
              <div v-for="(e, idx) in expenses" :key="e.id" class="flex items-center justify-between bg-gray-800 p-3 rounded">
                <div>
                  <div class="font-medium text-white">{{ e.name }}</div>
                  <div class="text-sm text-gray-400">{{ e.category }} • {{ new Date(e.date).toLocaleDateString() }}</div>
                </div>
                <div class="flex items-center gap-4">
                  <div class="text-yellow-400 font-medium">{{ formatCurrency(e.amount) }}</div>
                  <button @click="removeExpense(idx)" class="text-red-400 hover:text-red-300">✕</button>
                </div>
              </div>
            </div>

            <!-- separator line between recent items and total -->
            <hr class="my-4 border-gray-700" />

            <div class="mt-4 flex justify-between text-gray-300">
              <div class="text-lg sm:text-xl font-medium text-gray-300">Total expenses</div>
              <div class="text-2xl sm:text-3xl font-extrabold text-yellow-400">{{ formatCurrency(totalExpenses) }}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BudgetTracker',
  data() {
    return {
      isEditingBudget: false,
      monthlyBudgetInput: null,
      monthlyBudget: 0,
      newExpense: { name: '', amount: null, category: '' },
      expenses: []
    }
  },
  computed: {
    expensesTotal() {
      return this.expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0)
    },
    totalExpenses() {
      return this.expensesTotal
    },
    monthlyRemaining() {
      return Number(this.monthlyBudget || 0) - Number(this.totalExpenses || 0)
    }
  },
  methods: {
    formatCurrency(v) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(v || 0))
    },
    saveMonthlyBudget() {
      const amt = Number(this.monthlyBudgetInput)
      if (isNaN(amt) || amt < 0) {
        alert('Enter a valid non-negative budget amount.')
        return
      }
      this.monthlyBudget = Number(amt.toFixed(2))
      localStorage.setItem('monthlyBudget', String(this.monthlyBudget))
      this.isEditingBudget = false
    },
    cancelEditBudget() {
      this.monthlyBudgetInput = this.monthlyBudget ? String(this.monthlyBudget) : null
      this.isEditingBudget = false
    },
    async fetchCartTotal() {
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
    },
    // create a grocery expense entry named "Grocery cart" using shoppingList total
    async updateFromCartAsExpense() {
      try {
        const cartTotal = await this.fetchCartTotal()
        if (!cartTotal || Number(cartTotal) <= 0) {
          // show user-facing error if cart is empty
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
        this.expenses.unshift(entry)
        localStorage.setItem('expenses', JSON.stringify(this.expenses))
      } catch (err) {
        console.error('updateFromCartAsExpense error', err)
        alert('Failed to update from cart. See console for details.')
      }
    },
    addExpense() {
      if (!this.newExpense.name || this.newExpense.amount == null || this.newExpense.category === '') {
        alert('Please fill all expense fields.')
        return
      }
      const entry = {
        id: Date.now() + Math.random(),
        name: this.newExpense.name,
        amount: Number(this.newExpense.amount),
        category: this.newExpense.category,
        date: new Date().toISOString()
      }
      this.expenses.unshift(entry)
      localStorage.setItem('expenses', JSON.stringify(this.expenses))
      this.newExpense = { name: '', amount: null, category: '' }
    },
    removeExpense(idx) {
      this.expenses.splice(idx, 1)
      localStorage.setItem('expenses', JSON.stringify(this.expenses))
    },
    clearExpenses() {
      if (!confirm('Clear all expenses?')) return
      this.expenses = []
      localStorage.removeItem('expenses')
    }
  },
  created() {
    const mb = localStorage.getItem('monthlyBudget')
    this.monthlyBudget = mb ? Number(mb) : 0
    this.monthlyBudgetInput = this.monthlyBudget ? String(this.monthlyBudget) : null

    const saved = localStorage.getItem('expenses')
    this.expenses = saved ? JSON.parse(saved) : []
  }
}
</script>
