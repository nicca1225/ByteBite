<template>
  <main class="min-h-screen px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
        <div class="flex items-center justify-between mb-8">
        <div>
            <h1 class="text-3xl font-bold text-white mb-2">Shopping List 🛒</h1>
            <div class="space-y-1">
            <p class="text-gray-400">{{ totalItems }} items • {{ totalPurchased }} purchased</p>
            <p v-if="grandTotal > 0" class="text-yellow-400 font-medium">
                Total: ${{ grandTotal.toFixed(2) }}
                <span v-if="totalPurchasedAmount > 0" class="text-green-400 ml-2">
                (Spent: ${{ totalPurchasedAmount.toFixed(2) }})
                </span>
            </p>
            </div>
        </div>
        <div class="flex gap-2">
            <button 
            @click="clearPurchased"
            class="px-4 py-2 text-green-300 border border-green-600 rounded-lg hover:bg-green-800 hover:text-white transition-colors"
            :disabled="totalPurchased === 0"
            >
            Clear Purchased
            </button>
            <button 
            @click="clearAll"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            :disabled="totalItems === 0"
            >
            Clear All
            </button>
        </div>
        </div>


      <!-- Add Item Form -->
      <div class="bg-black rounded-2xl border border-gray-800 p-6 mb-8">
        <h2 class="text-xl font-bold text-white mb-4">Add New Item</h2>
        <form @submit.prevent="addManualItem" class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input 
            v-model="newItem.name"
            placeholder="Item name"
            required
            class="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-yellow-400 focus:outline-none"
          />
          <input 
            v-model="newItem.amount"
            placeholder="Amount"
            type="number"
            step="0.1"
            min="0"
            class="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-yellow-400 focus:outline-none"
          />
          <input 
            v-model="newItem.unit"
            placeholder="Unit (cups, lbs, etc.)"
            class="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-yellow-400 focus:outline-none"
          />
          <button 
            type="submit"
            class="bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Add Item
          </button>
        </form>
      </div>

      <!-- Shopping List Items -->
        <div v-if="totalItems > 0" class="space-y-6">
        <div v-for="(items, recipeName) in groupedItems" :key="recipeName">
            <!-- Recipe Group Header -->
            <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl overflow-hidden">
            <div class="bg-yellow-500/20 px-6 py-3 border-b border-yellow-500/30">
                <h3 class="text-lg font-semibold text-white">{{ recipeName }}</h3>
                <p class="text-yellow-200 text-sm">{{ items.length }} items</p>
            </div>
            <div class="p-6">
                <div class="space-y-3">
                <div 
                    v-for="item in items" 
                    :key="item.id" 
                    class="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800/50 transition-colors"
                    :class="{ 'opacity-60 bg-green-900/20': item.purchased }"
                >
                    <!-- Single checkbox for "purchased" -->
                    <input 
                    type="checkbox" 
                    v-model="item.purchased"
                    @change="saveShoppingList"
                    class="rounded border-gray-600 bg-gray-800 text-green-500 focus:ring-green-500 scale-110"
                    title="Mark as purchased"
                    />
                    <div class="flex-1 flex items-center justify-between">
                    <span 
                        class="text-white"
                        :class="{ 'line-through text-gray-400': item.purchased }"
                    >
                        <span v-if="item.amount" class="font-medium">{{ item.amount }} </span>
                        <span v-if="item.unit" class="font-medium">{{ item.unit }} </span>
                        {{ item.name }}
                    </span>
                    <div class="flex items-center gap-3">
                        <!-- Show Spoonacular-based price for manual entries -->
                        <span v-if="item.spoonacularPrice && item.spoonacularPrice > 0" 
                            class="text-yellow-400 text-sm font-medium"
                            :class="{ 'line-through text-gray-500': item.purchased }">
                        ${{ item.spoonacularPrice.toFixed(2) }}
                        </span>
                        <!-- Fallback for old estimated prices -->
                        <span v-else-if="item.estimatedPrice && item.estimatedPrice > 0" 
                            class="text-yellow-400 text-sm font-medium opacity-75"
                            :class="{ 'line-through text-gray-500': item.purchased }">
                        ~${{ (item.estimatedPrice / 100).toFixed(2) }}
                        </span>
                        <!-- Show message if no price available -->
                        <span v-else class="text-gray-500 text-xs italic">
                        No price data
                        </span>

                        <!-- Remove button -->
                        <button 
                        @click="removeItem(item.id)"
                        class="text-red-400 hover:text-red-300 transition-colors p-1"
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
            </div>
        </div>

        <!-- Grand Total -->
        <div class="bg-gray-900 rounded-2xl border border-gray-600 p-6">
            <div class="flex justify-between items-center">
            <div>
                <h3 class="text-xl font-bold text-white">Shopping Summary</h3>
                <p class="text-gray-300 text-sm">{{ totalItems }} total items • {{ totalPurchased }} purchased</p>
            </div>
            <div class="text-right">
                <div class="text-2xl font-bold text-yellow-400">${{ grandTotal.toFixed(2) }}</div>
                <div class="text-sm text-gray-300">Estimated total</div>
                <div class="text-sm text-green-400">Purchased: ${{ totalPurchasedAmount.toFixed(2) }}</div>
            </div>
            </div>
        </div>
        </div>



      <!-- Empty State -->
      <div v-else class="text-center py-12 bg-black rounded-2xl border border-gray-800">
        <span class="text-6xl mb-4 block">🛒</span>
        <h3 class="text-2xl font-bold text-white mb-2">Your shopping list is empty</h3>
        <p class="text-gray-400 mb-6">Add items manually or find recipes to populate your list</p>
        <router-link 
          to="/find-recipes"
          class="inline-block bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
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