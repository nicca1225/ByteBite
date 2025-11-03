<template>
  <main class="min-h-screen bg-black px-4 py-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header with Title and Actions -->
      <div class="mb-8">
        <div class="inline-block mb-4">
          <span class="text-xs font-mono uppercase tracking-wider text-yellow-400/80 bg-yellow-400/10 px-3 py-1.5 rounded-full border border-yellow-400/20">
            Shopping List
          </span>
        </div>
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-4xl sm:text-5xl font-light text-white">Shopping List</h1>
          <div class="flex gap-3">
            <button
              @click="clearPurchased"
              class="px-4 py-3 text-gray-300 border border-gray-700/50 rounded-xl hover:border-yellow-400/30 hover:bg-gray-900/50 transition-all duration-300"
              :disabled="totalPurchased === 0"
              title="Clear purchased items"
            >
              Clear Purchased
            </button>
            <button
              @click="clearAll"
              class="px-4 py-3 bg-red-900/20 text-red-300 border border-red-500/30 rounded-xl hover:bg-red-900/40 transition-all duration-300"
              :disabled="totalItems === 0"
              title="Clear all items"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      <!-- Add Item Form -->
      <form @submit.prevent="addManualItem" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <input
          v-model="newItem.name"
          placeholder="Item name"
          required
          class="px-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 transition-all duration-200 outline-none"
        />
        <input
          v-model="newItem.amount"
          placeholder="Quantity"f
          type="number"
          step="0.1"
          min="0"
          class="px-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 transition-all duration-200 outline-none"
        />
        <input
          v-model="newItem.unit"
          placeholder="Unit (cups, lbs, etc.)"
          class="px-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 transition-all duration-200 outline-none"
        />
        <input
          v-model.number="newItem.price"
          placeholder="Price ($)"
          type="number"
          step="0.01"
          min="0"
          class="px-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 transition-all duration-200 outline-none"
        />
        <button
          type="submit"
          class="bg-yellow-400 text-black font-semibold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-all duration-200 font-medium"
        >
          Add Item
        </button>
      </form>

      <!-- Kanban Board -->
      <div v-if="totalItems > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- To Buy Column -->
        <div class="bg-gradient-to-br from-blue-900/20 to-black border border-blue-800/30 rounded-xl overflow-hidden">
          <div class="bg-blue-400/10 border-b border-blue-800/30 px-6 py-4">
            <div class="flex items-center justify-between mb-3">
              <h2 class="text-2xl font-light text-white">To Buy</h2>
              <span class="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">{{ toBuyItems.length }}</span>
            </div>
            <p class="text-blue-300 text-sm font-medium">Total: ${{ toBuyTotal.toFixed(2) }}</p>
          </div>

          <!-- To Buy Items -->
          <div class="p-6 space-y-3 max-h-96 overflow-y-auto">
            <div v-if="toBuyItems.length === 0" class="text-center py-12">
              <p class="text-gray-500 text-sm">All items purchased! 🎉</p>
            </div>

            <div v-for="item in toBuyItems" :key="item.id" class="bg-black border border-blue-800/30 rounded-lg p-4 hover:border-blue-600/50 transition-all duration-200 group">
              <div class="flex items-start justify-between mb-2">
                <div class="flex-1">
                  <div class="flex items-center gap-2">
                    <input
                      type="checkbox"
                      v-model="item.purchased"
                      @change="() => { if (item.purchased && !item.purchasedAt) item.purchasedAt = new Date().toISOString(); saveShoppingList(); syncToBudgetTracker(); }"
                      class="rounded border-gray-600 bg-black text-blue-400 focus:ring-blue-400/30 cursor-pointer accent-blue-400 scale-110"
                      title="Mark as purchased"
                    />
                    <span class="text-white font-medium">
                      <span v-if="item.amount" class="text-blue-300">{{ item.amount }} </span>
                      <span v-if="item.unit" class="text-blue-300">{{ item.unit }} </span>
                      {{ item.name }}
                    </span>
                  </div>
                  <p v-if="item.recipe" class="text-xs text-gray-500 ml-8 mt-1">From: {{ item.recipe }}</p>
                </div>
              </div>

              <!-- Price Section -->
              <div class="flex items-center justify-between ml-8 mt-3">
                <div class="flex items-center gap-2">
                  <!-- Edit Mode Input -->
                  <input
                    v-if="editingPrice[item.id]"
                    v-model.number="item.spoonacularPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    class="w-20 px-2 py-1 bg-black border-2 border-yellow-400 text-yellow-400 rounded text-sm font-medium outline-none focus:border-yellow-300"
                    @blur="editingPrice[item.id] = false; item.userEditedPrice = true; saveShoppingList()"
                    @keyup.enter="editingPrice[item.id] = false; item.userEditedPrice = true; saveShoppingList()"
                    autofocus
                  />

                  <!-- Display Mode: Price -->
                  <span
                    v-else-if="item.spoonacularPrice && item.spoonacularPrice > 0"
                    class="text-yellow-400 text-sm font-medium cursor-pointer hover:opacity-75 transition-opacity"
                    @click="editingPrice[item.id] = true"
                    title="Click to edit price"
                  >
                    ${{ item.spoonacularPrice.toFixed(2) }}
                  </span>

                  <!-- Display Mode: No price -->
                  <span
                    v-else
                    class="text-gray-500 text-xs italic cursor-pointer hover:text-yellow-400 transition-colors"
                    @click="editingPrice[item.id] = true"
                    title="Click to add price"
                  >
                    No price
                  </span>

                  <!-- API Badge -->
                  <span
                    v-if="!editingPrice[item.id] && item.priceSource === 'spoonacular' && !item.userEditedPrice && item.spoonacularPrice > 0"
                    class="text-xs text-gray-500 italic"
                    title="Price estimated by Spoonacular API"
                  >
                    (API)
                  </span>
                </div>

                <!-- Remove Button -->
                <button
                  @click="removeItem(item.id)"
                  class="text-gray-500 hover:text-red-400 transition-colors p-1 hover:bg-red-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove item"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Purchased Column -->
        <div class="bg-gradient-to-br from-green-900/20 to-black border border-green-800/30 rounded-xl overflow-hidden">
          <div class="bg-green-400/10 border-b border-green-800/30 px-6 py-4">
            <div class="flex items-center justify-between mb-3">
              <h2 class="text-2xl font-light text-white">Purchased</h2>
              <span class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">{{ purchasedItems.length }}</span>
            </div>
            <p class="text-green-300 text-sm font-medium">Total Spent: ${{ purchasedTotal.toFixed(2) }}</p>
          </div>

          <!-- Purchased Items -->
          <div class="p-6 space-y-3 max-h-96 overflow-y-auto">
            <div v-if="purchasedItems.length === 0" class="text-center py-12">
              <p class="text-gray-500 text-sm">No items purchased yet</p>
            </div>

            <div v-for="item in purchasedItems" :key="item.id" class="bg-black border border-green-800/30 rounded-lg p-4 hover:border-green-600/50 transition-all duration-200 group opacity-75">
              <div class="flex items-start justify-between mb-2">
                <div class="flex-1">
                  <div class="flex items-center gap-2">
                    <input
                      type="checkbox"
                      v-model="item.purchased"
                      @change="() => { if (!item.purchased) item.purchasedAt = null; saveShoppingList(); syncToBudgetTracker(); }"
                      class="rounded border-gray-600 bg-black text-green-400 focus:ring-green-400/30 cursor-pointer accent-green-400 scale-110"
                      title="Mark as unpurchased"
                    />
                    <span class="text-gray-400 line-through">
                      <span v-if="item.amount" class="text-green-300">{{ item.amount }} </span>
                      <span v-if="item.unit" class="text-green-300">{{ item.unit }} </span>
                      {{ item.name }}
                    </span>
                  </div>
                  <p v-if="item.recipe" class="text-xs text-gray-600 ml-8 mt-1">From: {{ item.recipe }}</p>
                </div>
              </div>

              <!-- Price Section -->
              <div class="flex items-center justify-between ml-8 mt-3">
                <div class="flex items-center gap-2">
                  <!-- Edit Mode Input -->
                  <input
                    v-if="editingPrice[item.id]"
                    v-model.number="item.spoonacularPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    class="w-20 px-2 py-1 bg-black border-2 border-yellow-400 text-yellow-400 rounded text-sm font-medium outline-none focus:border-yellow-300"
                    @blur="editingPrice[item.id] = false; item.userEditedPrice = true; saveShoppingList()"
                    @keyup.enter="editingPrice[item.id] = false; item.userEditedPrice = true; saveShoppingList()"
                    autofocus
                  />

                  <!-- Display Mode: Price -->
                  <span
                    v-else-if="item.spoonacularPrice && item.spoonacularPrice > 0"
                    class="text-yellow-400 text-sm font-medium cursor-pointer hover:opacity-75 transition-opacity line-through"
                    @click="editingPrice[item.id] = true"
                    title="Click to edit price"
                  >
                    ${{ item.spoonacularPrice.toFixed(2) }}
                  </span>

                  <!-- Display Mode: No price -->
                  <span
                    v-else
                    class="text-gray-600 text-xs italic cursor-pointer hover:text-yellow-400 transition-colors"
                    @click="editingPrice[item.id] = true"
                    title="Click to add price"
                  >
                    No price
                  </span>

                  <!-- API Badge -->
                  <span
                    v-if="!editingPrice[item.id] && item.priceSource === 'spoonacular' && !item.userEditedPrice && item.spoonacularPrice > 0"
                    class="text-xs text-gray-600 italic"
                    title="Price estimated by Spoonacular API"
                  >
                    (API)
                  </span>
                </div>

                <!-- Remove Button -->
                <button
                  @click="removeItem(item.id)"
                  class="text-gray-600 hover:text-red-400 transition-colors p-1 hover:bg-red-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove item"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Card -->
      <div v-if="totalItems > 0" class="bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl p-6 sm:p-8 hover:border-yellow-400/20 transition-all duration-300">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <p class="text-xs text-gray-400 uppercase tracking-wide mb-2">To Buy</p>
            <p class="text-2xl font-light text-white">{{ toBuyItems.length }}</p>
            <p class="text-sm text-gray-500 mt-1">${{ toBuyTotal.toFixed(2) }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-400 uppercase tracking-wide mb-2">Purchased</p>
            <p class="text-2xl font-light text-white">{{ purchasedItems.length }}</p>
            <p class="text-sm text-green-400 mt-1">${{ purchasedTotal.toFixed(2) }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-400 uppercase tracking-wide mb-2">Total Items</p>
            <p class="text-2xl font-light text-white">{{ totalItems }}</p>
            <p class="text-sm text-gray-500 mt-1">{{ Math.round((purchasedItems.length / totalItems) * 100) }}% done</p>
          </div>
          <div>
            <p class="text-xs text-gray-400 uppercase tracking-wide mb-2">Grand Total</p>
            <p class="text-2xl font-light text-yellow-400">${{ grandTotal.toFixed(2) }}</p>
            <p class="text-sm text-yellow-300 mt-1">${{ purchasedTotal.toFixed(2) }} spent</p>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800/50">
        <div class="text-6xl mb-4">🛒</div>
        <h3 class="text-2xl font-light text-white mb-2">Your shopping list is empty</h3>
        <p class="text-gray-400 mb-8">Add items manually or find recipes to populate your list</p>
        <router-link
          to="/find-recipes"
          class="inline-block bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-all duration-200"
        >
          Find Recipes
        </router-link>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const shoppingList = ref([])
const newItem = ref({
  name: '',
  amount: '',
  unit: '',
  price: null
})
const editingPrice = ref({})

const loadShoppingList = () => {
  try {
    const saved = localStorage.getItem('shoppingList')
    if (saved) {
      shoppingList.value = JSON.parse(saved)
    }
  } catch (e) {
    console.error('Error loading shopping list:', e)
    shoppingList.value = []
  }
}

const saveShoppingList = () => {
  try {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList.value))
  } catch (e) {
    console.error('Error saving shopping list:', e)
  }
}

const addManualItem = () => {
  if (!newItem.value.name.trim()) return

  let spoonacularPrice = newItem.value.price || 0

  // If no price provided, try to find similar item
  if (!spoonacularPrice) {
    const ingredientName = newItem.value.name.trim().toLowerCase()
    const existingItem = shoppingList.value.find(item =>
      item.spoonacularPrice > 0 &&
      item.name.toLowerCase().includes(ingredientName.split(' ')[0])
    )

    if (existingItem) {
      const ratio = (newItem.value.amount || 1) / (existingItem.amount || 1)
      spoonacularPrice = existingItem.spoonacularPrice * ratio
    }
  }

  const now = new Date()
  const item = {
    id: Date.now() + Math.random(),
    name: newItem.value.name.trim(),
    amount: newItem.value.amount || '',
    unit: newItem.value.unit.trim(),
    recipe: 'Manual Entry',
    spoonacularPrice: spoonacularPrice,
    completed: false,
    purchased: false,
    addedAt: now.toISOString(),
    purchasedAt: null,
    linkedExpenseId: null,
    userEditedPrice: !!newItem.value.price
  }

  shoppingList.value.unshift(item)
  saveShoppingList()

  newItem.value = {
    name: '',
    amount: '',
    unit: '',
    price: null
  }
}

const removeItem = (id) => {
  shoppingList.value = shoppingList.value.filter(item => item.id !== id)
  saveShoppingList()
}

const clearAll = () => {
  if (totalItems.value === 0) return
  if (confirm('Are you sure you want to clear all items from your shopping list?')) {
    shoppingList.value = []
    saveShoppingList()
  }
}

const clearPurchased = () => {
  if (totalPurchased.value === 0) return
  if (confirm(`Remove ${totalPurchased.value} purchased items?`)) {
    shoppingList.value = shoppingList.value.filter(item => !item.purchased)
    saveShoppingList()
  }
}

const toBuyItems = computed(() =>
  shoppingList.value.filter(item => !item.purchased)
)

const purchasedItems = computed(() =>
  shoppingList.value.filter(item => item.purchased)
)

const toBuyTotal = computed(() =>
  toBuyItems.value.reduce((sum, item) => {
    const price = item.spoonacularPrice || item.estimatedPrice || 0
    return sum + price
  }, 0)
)

const purchasedTotal = computed(() =>
  purchasedItems.value.reduce((sum, item) => {
    const price = item.spoonacularPrice || item.estimatedPrice || 0
    return sum + price
  }, 0)
)

const grandTotal = computed(() => toBuyTotal.value + purchasedTotal.value)

const totalPurchased = computed(() => purchasedItems.value.length)

const totalItems = computed(() => shoppingList.value.length)

// Sync purchased items to budget tracker
const syncToBudgetTracker = () => {
  try {
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]')

    shoppingList.value.forEach(item => {
      if (item.purchased && !item.linkedExpenseId) {
        // Create new expense entry
        const newExpense = {
          id: item.id,
          name: item.name,
          amount: item.spoonacularPrice || 0,
          category: 'groceries',
          date: item.purchasedAt || new Date().toISOString(),
          fromShoppingList: true,
          shoppingListItemId: item.id
        }

        // Check if this item already exists in expenses
        const existingExpense = expenses.find(e => e.shoppingListItemId === item.id)

        if (!existingExpense) {
          expenses.unshift(newExpense)
          item.linkedExpenseId = newExpense.id
        }
      } else if (!item.purchased && item.linkedExpenseId) {
        // Remove from expenses if unpurchased
        const index = expenses.findIndex(e => e.shoppingListItemId === item.id)
        if (index > -1) {
          expenses.splice(index, 1)
        }
        item.linkedExpenseId = null
      }
    })

    localStorage.setItem('expenses', JSON.stringify(expenses))
  } catch (e) {
    console.error('Error syncing to budget tracker:', e)
  }
}

// Watch for changes in shopping list
watch(
  () => shoppingList.value.map(item => ({ id: item.id, purchased: item.purchased, price: item.spoonacularPrice })),
  () => {
    saveShoppingList()
    syncToBudgetTracker()
  },
  { deep: true }
)

onMounted(() => {
  loadShoppingList()
  syncToBudgetTracker()
})
</script>
