<!-- src/views/FindRecipes.vue -->
<template>
  <main class="min-h-screen">
    <!-- RECIPE DETAIL VIEW -->
    <section v-if="selectedRecipe" class="px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- Back Button -->
        <button 
          @click="selectedRecipe = null"
          class="mb-6 flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Search Results
        </button>

        <!-- Recipe Content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column: Ingredients & Equipment -->
          <div class="lg:col-span-1 space-y-6">
            <!-- Ingredients -->
            <div class="bg-black rounded-2xl border border-gray-800 p-6">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-bold text-white">Ingredients</h2>
                <button 
                  @click="addToShoppingList"
                  class="px-1 py-1 bg-yellow-500 text-black text-sm font-semibold rounded hover:bg-yellow-400"
                >
                  + Shopping List
                </button>
              </div>
              <ul class="space-y-3">
                <li v-for="ingredient in selectedRecipe.extendedIngredients" :key="ingredient.id" 
                    class="text-gray-300 text-sm">
                  <span class="font-medium">{{ ingredient.amount }} {{ ingredient.unit }}</span>
                  {{ ingredient.name }}
                </li>
              </ul>
              <!-- Only show total cost if available -->
              <div v-if="selectedRecipe.pricePerServing && selectedRecipe.pricePerServing > 0" 
                  class="mt-4 pt-4 border-t border-gray-700">
                <p class="text-sm text-gray-300">
                  <strong class="text-yellow-400">Total Recipe Cost:</strong> 
                  ${{ (selectedRecipe.pricePerServing * selectedRecipe.servings / 100).toFixed(2) }}
                </p>
                <p class="text-sm text-gray-300">
                  <strong class="text-yellow-400">Cost Per Serving:</strong> 
                  ${{ (selectedRecipe.pricePerServing / 100).toFixed(2) }}
                </p>
              </div>
            </div>

            <!-- Equipment -->
            <div v-if="selectedRecipe.equipment && selectedRecipe.equipment.length > 0" 
                class="bg-black rounded-2xl border border-gray-800 p-6">
              <h2 class="text-xl font-bold text-white mb-4">Equipment Needed</h2>
              <ul class="space-y-2">
                <li v-for="equip in selectedRecipe.equipment" :key="equip.id" 
                    class="flex items-center gap-3 text-gray-300">
                  <span class="text-sm">{{ equip.name }}</span>
                </li>
              </ul>
            </div>

            <!-- Nutrition Facts -->
            <div v-if="selectedRecipe.nutrition?.nutrients" 
                class="bg-black rounded-2xl border border-gray-800 p-6">
              <h2 class="text-xl font-bold text-white mb-4">Nutrition Facts</h2>
              <div class="space-y-2">
                <div v-for="nutrient in selectedRecipe.nutrition.nutrients.slice(0, 10)" 
                    :key="nutrient.name" 
                    class="flex justify-between items-center text-sm">
                  <span class="text-gray-300">{{ nutrient.name }}</span>
                  <span class="text-yellow-400 font-medium">
                    {{ Math.round(nutrient.amount) }}{{ nutrient.unit }}
                  </span>
                </div>
              </div>
              <div v-if="selectedRecipe.nutrition.caloricBreakdown" class="mt-4 pt-4 border-t border-gray-700">
                <h3 class="text-white font-semibold mb-2">Caloric Breakdown</h3>
                <div class="grid grid-cols-3 gap-2 text-xs">
                  <div class="text-center">
                    <div class="text-yellow-400 font-bold">{{ Math.round(selectedRecipe.nutrition.caloricBreakdown.percentCarbs) }}%</div>
                    <div class="text-gray-400">Carbs</div>
                  </div>
                  <div class="text-center">
                    <div class="text-yellow-400 font-bold">{{ Math.round(selectedRecipe.nutrition.caloricBreakdown.percentFat) }}%</div>
                    <div class="text-gray-400">Fat</div>
                  </div>
                  <div class="text-center">
                    <div class="text-yellow-400 font-bold">{{ Math.round(selectedRecipe.nutrition.caloricBreakdown.percentProtein) }}%</div>
                    <div class="text-gray-400">Protein</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Instructions & Summary -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Recipe Header -->
            <div class="bg-black rounded-2xl border border-gray-800 overflow-hidden">
              <img :src="selectedRecipe.image" :alt="selectedRecipe.title" class="w-full h-64 object-cover" />
              <div class="p-6">
                <h1 class="text-3xl font-bold text-white mb-4">{{ selectedRecipe.title }}</h1>
                <div class="flex items-center gap-4 text-sm text-gray-300">
                  <span>⏱️ {{ selectedRecipe.readyInMinutes }} min</span>
                  <span>🍽️ {{ selectedRecipe.servings }} servings</span>
                  <span v-if="selectedRecipe.healthScore">💚 Health Score: {{ selectedRecipe.healthScore }}/100</span>
                </div>
              </div>
            </div>

            <!-- Instructions -->
            <div v-if="selectedRecipe.analyzedInstructions?.[0]?.steps" 
                class="bg-black rounded-2xl border border-gray-800 p-6">
              <h2 class="text-xl font-bold text-white mb-4">Instructions</h2>
              <div class="space-y-4">
                <div v-for="step in selectedRecipe.analyzedInstructions[0].steps" :key="step.number" 
                    class="flex gap-4">
                  <span class="flex-shrink-0 w-8 h-8 bg-yellow-500 text-black rounded-full flex items-center justify-center text-sm font-bold">
                    {{ step.number }}
                  </span>
                  <div class="flex-1">
                    <p class="text-gray-300 mb-2">{{ step.step }}</p>
                    <!-- Equipment for this step -->
                    <div v-if="step.equipment && step.equipment.length > 0" class="flex items-center gap-2 mt-2">
                      <span class="text-xs text-gray-500">Equipment:</span>
                      <div class="flex gap-2">
                        <span v-for="equip in step.equipment" :key="equip.id" 
                              class="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                          {{ equip.name }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recipe Summary -->
            <div v-if="selectedRecipe.summary" class="bg-black rounded-2xl border border-gray-800 p-6">
              <h2 class="text-xl font-bold text-white mb-4">About This Recipe</h2>
              <div class="text-gray-300 text-sm leading-relaxed" 
                  v-html="selectedRecipe.summary.replace(/<[^>]*>/g, '')">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- INITIAL (centered) -->
    <section v-else-if="!hasSearched" class="min-h-[60vh] flex items-center justify-center px-4">
      <div class="w-full max-w-2xl">
        <h1 class="text-3xl sm:text-4xl font-bold text-center mb-6">Find Recipes</h1>

        <form @submit.prevent="onSearch" class="flex gap-3">
          <input
            v-model.trim="query"
            type="text"
            placeholder="Search recipes… e.g. chicken, tofu, pasta"
            class="form-input flex-1 text-black placeholder-gray-400"
            style="color: black;"
          />
            <button
                class="px-6 py-2 rounded-xl font-semibold border border-yellow-400 text-yellow-400 bg-amber-800 hover:bg-amber-700 transition disabled:opacity-50"
                :disabled="loading || !apiKey"
            >
                {{ loading ? 'Searching…' : 'Search' }}
            </button>
        </form>

        <p v-if="!apiKey" class="alert alert-warning mt-4">
          Missing API key. Set <code>VITE_SPOONACULAR_API_KEY</code> in your <code>.env</code>.
        </p>
      </div>
    </section>

    <!-- AFTER SEARCH (top bar + results) -->
    <section v-else class="px-4">
      <!-- sticky/top search bar -->
      <div class="sticky top-0 z-10 bg-black/80 backdrop-blur border-b border-gray-800 -mx-4 px-4 py-3">
        <form @submit.prevent="onSearch" class="max-w-5xl mx-auto flex gap-3">
          <input v-model.trim="query" type="text" placeholder="Search recipes…" class="form-input flex-1 text-black placeholder-gray-400" style="color: black;" />
          <button
                type="button"
                @click="refreshResults"
                class="px-4 py-2 rounded-xl font-semibold border border-yellow-400 text-yellow-400 bg-amber-800 hover:bg-amber-700 transition disabled:opacity-50"
                :disabled="loading || !apiKey || !query"
                title="Refresh results"
            >
                <svg class="w-5 h-5" :class="{'animate-spin': loading}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
            </button>
          <button
                type="submit"
                class="px-6 py-2 rounded-xl font-semibold border border-yellow-400 text-yellow-400 bg-amber-800 hover:bg-amber-700 transition disabled:opacity-50"
                :disabled="loading || !apiKey"
            >
                {{ loading ? 'Searching…' : 'Search' }}
            </button>
        </form>
      </div>

      <!-- messages -->
      <div class="max-w-5xl mx-auto mt-4">
        <div v-if="error" class="alert alert-error">{{ error }}</div>
        <div v-if="loading" class="spinner" aria-label="Loading"></div>

        <p v-if="!loading && searched && results.length === 0" class="text-gray-400 mt-6">
          No recipes found. Try a different keyword.
        </p>

        <!-- results grid -->
        <div v-if="!loading && results.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <article
  v-for="r in results"
  :key="r.id"
  class="rounded-xl overflow-hidden border border-gray-800 bg-black flex flex-col"
>
  <img :src="r.image" :alt="r.title" class="w-full h-44 object-cover" />
  <div class="p-4 flex flex-col flex-1">
    <h3 class="font-semibold text-lg text-white line-clamp-2">{{ r.title }}</h3>
    <div class="mt-2 text-sm text-gray-300 flex flex-wrap gap-3">
      <span>⏱ {{ r.readyInMinutes ?? '?' }} min</span>
      <span v-if="typeof r.aggregateLikes === 'number'">👍 {{ r.aggregateLikes }}</span>
    </div>
    <div class="mt-auto pt-4 flex gap-2">
      <button
        @click="viewRecipe(r.id)"
        class="flex-1 text-center rounded-lg px-4 py-2 bg-yellow-500 text-black font-semibold hover:bg-yellow-400"
      >
        View Recipe
      </button>

    </div>
  </div>
</article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY || ''

const query = ref('')
const results = ref([])
const loading = ref(false)
const error = ref('')
const searched = ref(false)
const hasSearched = ref(false)
const selectedRecipe = ref(null)

async function onSearch() {
  error.value = ''
  searched.value = true
  hasSearched.value = true
  results.value = []

  if (!apiKey) {
    error.value = 'Missing Spoonacular API key.'
    return
  }
  if (!query.value) return

  loading.value = true
  try {
  const params = new URLSearchParams({
    number: '100',
    addRecipeInformation: 'true', // includes aggregateLikes
    sort: 'popularity',           // most → least popular
    apiKey
  })
  // title-only server hint
  params.set('titleMatch', query.value.trim())

  const url = `https://api.spoonacular.com/recipes/complexSearch?${params}`
  console.log('[req]', url)  // <-- helps verify there is NO "query=" param
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Spoonacular error ${res.status}: ${await res.text()}`)
  const data = await res.json()

  // Strict client filter (whole-word match for every word typed)
  const q = query.value.trim()
  const words = q.split(/\s+/).filter(Boolean)
  const wordRegexes = words.map(w =>
    new RegExp(`\\b${w.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}\\b`, 'i')
  )

  results.value = (data.results || [])
    .map(r => ({
      id: r.id,
      title: r.title || '',
      image: r.image,
      readyInMinutes: r.readyInMinutes ?? null,
      aggregateLikes: typeof r.aggregateLikes === 'number' ? r.aggregateLikes : null
    }))
    // ✅ Title must contain ALL words as whole words
    .filter(r => wordRegexes.every(rx => rx.test(r.title)))
    // Popularity fallback sort (server already sorts by popularity)
    .sort((a, b) => (b.aggregateLikes ?? 0) - (a.aggregateLikes ?? 0))

  // Optional: peek at first few titles in console
  console.log('[titles]', results.value.slice(0, 5).map(r => r.title))
} catch (e) {
  console.error(e)
  error.value = e?.message || 'Failed to fetch recipes.'
} finally {
  loading.value = false
}
}

function refreshResults() {
  // Refresh the current search
  if (query.value) {
    onSearch()
  }
}

async function viewRecipe(recipeId) {
  if (!apiKey) return
  
  loading.value = true
  try {
    // Fetch detailed recipe information with nutrition and equipment
    const recipeUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}&includeNutrition=true`
    const recipeRes = await fetch(recipeUrl)
    if (!recipeRes.ok) throw new Error(`Failed to fetch recipe details`)
    
    const recipe = await recipeRes.json()
    
    // Extract equipment from instructions
    const equipment = new Map()
    if (recipe.analyzedInstructions?.[0]?.steps) {
      recipe.analyzedInstructions[0].steps.forEach(step => {
        if (step.equipment) {
          step.equipment.forEach(equip => {
            equipment.set(equip.id, equip)
          })
        }
      })
    }
    
    // Add equipment array to recipe
    recipe.equipment = Array.from(equipment.values())
    
    // Try to get ingredient prices (this might not always be available)
    try {
      const ingredientIds = recipe.extendedIngredients?.map(ing => ing.id).join(',')
      if (ingredientIds) {
        const priceUrl = `https://api.spoonacular.com/food/ingredients/${ingredientIds}/information?apiKey=${apiKey}&amount=1&unit=serving`
        // Note: Individual ingredient pricing requires a more complex API call structure
        // For now, we'll use the recipe's overall price information
      }
    } catch (e) {
      console.log('Could not fetch ingredient prices:', e)
    }
    
    selectedRecipe.value = recipe
    window.scrollTo({ top: 0, behavior: 'smooth' })
    console.log('Recipe data:', recipe) // For debugging
  } catch (e) {
    console.error('Error fetching recipe details:', e)
    error.value = 'Failed to load recipe details.'
  } finally {
    loading.value = false
  }
}


function addToShoppingList() {
  if (!selectedRecipe.value?.extendedIngredients) return
  
  const existingList = JSON.parse(localStorage.getItem('shoppingList') || '[]')
  
  // Calculate individual ingredient prices from the total recipe cost
  const totalRecipeCost = selectedRecipe.value.pricePerServing ? 
    (selectedRecipe.value.pricePerServing * selectedRecipe.value.servings / 100) : 0
  
  const totalIngredients = selectedRecipe.value.extendedIngredients.length
  
  const newItems = selectedRecipe.value.extendedIngredients.map(ingredient => {
    // Use Spoonacular's individual ingredient cost if available
    let ingredientPrice = 0
    
    if (ingredient.estimatedCost && ingredient.estimatedCost.value) {
      // If individual ingredient cost is available from Spoonacular
      ingredientPrice = ingredient.estimatedCost.value / 100
    } else if (totalRecipeCost > 0 && totalIngredients > 0) {
      // Distribute total recipe cost proportionally among ingredients
      // This is a simple approximation - more expensive ingredients would get more cost
      let weightFactor = 1
      const name = ingredient.name.toLowerCase()
      
      // Give higher weight to more expensive ingredients
      if (name.includes('chicken') || name.includes('beef') || name.includes('pork') || name.includes('fish')) {
        weightFactor = 3
      } else if (name.includes('cheese') || name.includes('cream')) {
        weightFactor = 2
      } else if (name.includes('salt') || name.includes('pepper') || name.includes('spice')) {
        weightFactor = 0.1
      }
      
      ingredientPrice = (totalRecipeCost / totalIngredients) * weightFactor
    }
    
    return {
      id: Date.now() + Math.random(),
      name: ingredient.name,
      amount: ingredient.amount || 1,
      unit: ingredient.unit || '',
      recipe: selectedRecipe.value.title,
      spoonacularPrice: ingredientPrice, // Use Spoonacular-based pricing
      purchased: false
    }
  })
  
  const updatedList = [...existingList, ...newItems]
  localStorage.setItem('shoppingList', JSON.stringify(updatedList))
  
  const totalEstimated = newItems.reduce((sum, item) => sum + (item.spoonacularPrice || 0), 0)
  
  let message = `Added ${newItems.length} ingredients to shopping list!`
  if (totalEstimated > 0) {
    message += ` Estimated cost: $${totalEstimated.toFixed(2)}`
  }
  if (totalRecipeCost > 0) {
    message += ` (Recipe total: $${totalRecipeCost.toFixed(2)})`
  }
  
  alert(message)
}




</script>