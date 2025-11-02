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
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl sm:text-5xl font-light text-white mb-2">Shopping List</h1>
            <div class="space-y-1">
              <p class="text-gray-400">{{ totalItems }} items • {{ totalPurchased }} purchased</p>
              <p v-if="grandTotal > 0" class="text-yellow-400 font-medium">
                Total: <span class="text-xl">{{ grandTotal.toFixed(2) }}$</span>
                <span v-if="totalPurchasedAmount > 0" class="text-gray-400 ml-2">
                  (Spent: ${{ totalPurchasedAmount.toFixed(2) }})
                </span>
              </p>
            </div>
          </div>
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
      <div class="bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800/50 p-6 sm:p-8 mb-8 hover:border-yellow-400/20 transition-all duration-300">
        <h2 class="text-lg font-light text-white mb-6">Add New Item</h2>
        <form @submit.prevent="addManualItem" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            v-model="newItem.name"
            placeholder="Item name"
            required
            class="px-4 py-3 bg-black border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 transition-all duration-200 outline-none"
          />
          <input
            v-model="newItem.amount"
            placeholder="Amount"
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
          <button
            type="submit"
            class="bg-yellow-400 text-black font-semibold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-all duration-200 font-medium"
          >
            Add Item
          </button>
        </form>
      </div>

      <!-- Shopping List Items -->
      <div v-if="totalItems > 0" class="space-y-6">
        <div v-for="(items, recipeName) in groupedItems" :key="recipeName">
          <!-- Recipe Group Header -->
          <div class="bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl overflow-hidden hover:border-yellow-400/20 transition-all duration-300">
            <div class="bg-yellow-400/10 px-6 py-4 border-b border-gray-800/50">
              <h3 class="text-lg font-light text-white">{{ recipeName }}</h3>
              <p class="text-gray-400 text-sm mt-1">{{ items.length }} items</p>
            </div>
            <div class="p-6 space-y-3">
              <div
                v-for="item in items"
                :key="item.id"
                class="flex items-center gap-4 p-4 rounded-lg border border-gray-800/30 hover:border-gray-700/50 transition-all duration-200"
                :class="{ 'bg-green-900/10 opacity-75': item.purchased }"
              >
                <!-- Checkbox for "purchased" -->
                <input
                  type="checkbox"
                  v-model="item.purchased"
                  @change="saveShoppingList"
                  class="rounded border-gray-600 bg-black text-yellow-400 focus:ring-yellow-400/30 cursor-pointer scale-110 accent-yellow-400"
                  title="Mark as purchased"
                />
                <div class="flex-1 flex items-center justify-between">
                  <span
                    class="text-white"
                    :class="{ 'line-through text-gray-500': item.purchased }"
                  >
                    <span v-if="item.amount" class="font-medium">{{ item.amount }} </span>
                    <span v-if="item.unit" class="font-medium">{{ item.unit }} </span>
                    {{ item.name }}
                  </span>
                  <div class="flex items-center gap-4">
                    <!-- Price Display -->
                    <span v-if="item.spoonacularPrice && item.spoonacularPrice > 0"
                      class="text-yellow-400 text-sm font-medium whitespace-nowrap"
                      :class="{ 'line-through text-gray-500': item.purchased }">
                      ${{ item.spoonacularPrice.toFixed(2) }}
                    </span>
                    <span v-else-if="item.estimatedPrice && item.estimatedPrice > 0"
                      class="text-yellow-400 text-sm font-medium opacity-75 whitespace-nowrap"
                      :class="{ 'line-through text-gray-500': item.purchased }">
                      ~${{ (item.estimatedPrice / 100).toFixed(2) }}
                    </span>
                    <span v-else class="text-gray-500 text-xs italic">
                      No price
                    </span>

                    <!-- Remove button -->
                    <button
                      @click="removeItem(item.id)"
                      class="text-gray-500 hover:text-red-400 transition-colors p-1 hover:bg-red-900/20 rounded-lg"
                      title="Remove item"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Shopping Summary Card -->
        <div class="bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl p-6 sm:p-8 hover:border-yellow-400/20 transition-all duration-300">
          <div class="flex justify-between items-start flex-col sm:flex-row gap-6">
            <div>
              <h3 class="text-lg font-light text-white mb-1">Shopping Summary</h3>
              <p class="text-gray-400 text-sm">{{ totalItems }} total items • {{ totalPurchased }} purchased</p>
            </div>
            <div class="text-right">
              <div class="text-sm text-gray-400 mb-2">Estimated total</div>
              <div class="text-3xl font-light text-yellow-400">${{ grandTotal.toFixed(2) }}</div>
              <div v-if="totalPurchasedAmount > 0" class="text-sm text-gray-400 mt-2">Spent: ${{ totalPurchasedAmount.toFixed(2) }}</div>
            </div>
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
import { ref, computed, onMounted } from 'vue'

const shoppingList = ref([])
const newItem = ref({
  name: '',
  amount: '',
  unit: ''
})

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
  
  // Try to find matching ingredient from existing recipe data in shopping list
  let spoonacularPrice = 0
  const ingredientName = newItem.value.name.trim().toLowerCase()
  
  // Look through existing shopping list items for similar ingredients
  const existingItem = shoppingList.value.find(item => 
    item.spoonacularPrice > 0 && 
    item.name.toLowerCase().includes(ingredientName.split(' ')[0]) // Match first word
  )
  
  if (existingItem) {
    // Scale the price based on amount if provided
    const ratio = (newItem.value.amount || 1) / (existingItem.amount || 1)
    spoonacularPrice = existingItem.spoonacularPrice * ratio
    console.log(`Found similar item "${existingItem.name}" with price $${existingItem.spoonacularPrice}, scaled to $${spoonacularPrice}`)
  }
  
  const item = {
    id: Date.now() + Math.random(),
    name: newItem.value.name.trim(),
    amount: newItem.value.amount || '',
    unit: newItem.value.unit.trim(),
    recipe: 'Manual Entry',
    spoonacularPrice: spoonacularPrice,
    completed: false,
    purchased: false,
    addedAt: new Date().toISOString()
  }
  
  shoppingList.value.push(item)
  saveShoppingList()
  
  // Reset form
  newItem.value = {
    name: '',
    amount: '',
    unit: ''
  }
}

const removeItem = (id) => {
  shoppingList.value = shoppingList.value.filter(item => item.id !== id)
  saveShoppingList()
}

const clearCompleted = () => {
  if (completedItems.value === 0) return
  if (confirm(`Remove ${completedItems.value} completed items?`)) {
    shoppingList.value = shoppingList.value.filter(item => !item.completed)
    saveShoppingList()
  }
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


const groupedItems = computed(() => {
  return shoppingList.value.reduce((groups, item) => {
    const recipeName = item.recipe || 'Manual Entry'
    if (!groups[recipeName]) {
      groups[recipeName] = []
    }
    groups[recipeName].push(item)
    return groups
  }, {})
})

const totalPurchased = computed(() => 
  shoppingList.value.filter(item => item.purchased).length
)

const grandTotal = computed(() => 
  shoppingList.value.reduce((sum, item) => {
    // Use Spoonacular price first, fallback to estimated price
    const price = item.spoonacularPrice || item.estimatedPrice || 0
    return sum + price
  }, 0)
)

const totalPurchasedAmount = computed(() => 
  shoppingList.value
    .filter(item => item.purchased)
    .reduce((sum, item) => {
      const price = item.spoonacularPrice || item.estimatedPrice || 0
      return sum + price
    }, 0)
)

const totalItems = computed(() => shoppingList.value.length)
const completedItems = computed(() => 
  shoppingList.value.filter(item => item.completed).length
)


onMounted(loadShoppingList)
</script>