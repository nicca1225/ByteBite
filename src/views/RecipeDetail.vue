<!-- src/views/RecipeDetails.vue -->
<template>
  <main class="min-h-screen bg-black px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Back -->
      <button
        @click="goBack"
        class="mb-6 flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors font-mono uppercase tracking-wider text-sm"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Search Results
      </button>

      <div v-if="error" class="bg-red-900/20 border border-red-500/30 text-red-300 p-4 rounded-xl mb-6 text-sm font-light">
        {{ error }}
      </div>
      <div v-if="loading" class="flex justify-center py-20">
        <div class="w-12 h-12 border-4 border-gray-800 border-t-yellow-400 rounded-full animate-spin"></div>
      </div>

      <section v-if="recipe" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left: Ingredients / Equipment / Nutrition -->
        <aside class="lg:col-span-1 space-y-6">
          <!-- Ingredients -->
          <div class="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800/50 p-6">
            <div class="flex flex-col gap-3 mb-4">
              <h2 class="text-xl font-light text-white">Ingredients</h2>
              <div class="flex gap-2">
                <button
                  @click="addToShoppingList"
                  class="flex-1 px-3 py-2 bg-yellow-400 text-black text-sm font-medium rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  + Shopping List
                </button>
                <button
                  v-if="authStore.isAuthenticated"
                  @click="addToMealPlanner"
                  class="flex-1 px-3 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-400 transition-colors"
                >
                  + Meal Planner
                </button>
              </div>
            </div>
            <ul class="space-y-3">
              <li v-for="ing in recipe.extendedIngredients" :key="ing.id"
                  class="text-gray-400 text-sm font-light flex items-start gap-2">
                <span class="text-yellow-400 mt-1 text-xs">▸</span>
                <span>
                  <span class="font-medium text-gray-300">{{ ing.amount }} {{ ing.unit }}</span>
                  {{ ing.name }}
                </span>
              </li>
            </ul>
          </div>

          <!-- Equipment -->
          <div v-if="recipe.equipment?.length" class="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800/50 p-6">
            <h2 class="text-xl font-light text-white mb-4">Equipment Needed</h2>
            <ul class="space-y-2">
              <li v-for="eq in recipe.equipment" :key="eq.id" class="flex items-center gap-2 text-gray-400 font-light text-sm">
                <span class="text-yellow-400 text-xs">▸</span>
                <span>{{ eq.name }}</span>
              </li>
            </ul>
          </div>

          <!-- Nutrition -->
          <div v-if="recipe.nutrition?.nutrients" class="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800/50 p-6">
            <h2 class="text-xl font-light text-white mb-4">Nutrition Facts</h2>
            <div class="space-y-2">
              <div v-for="nut in recipe.nutrition.nutrients.slice(0,10)" :key="nut.name" class="flex justify-between items-center text-sm">
                <span class="text-gray-400 font-light">{{ nut.name }}</span>
                <span class="text-yellow-400 font-medium font-mono">{{ Math.round(nut.amount) }}{{ nut.unit }}</span>
              </div>
            </div>
            <div v-if="recipe.nutrition.caloricBreakdown" class="mt-4 pt-4 border-t border-gray-800/50">
              <h3 class="text-white font-medium mb-3 font-mono text-xs uppercase tracking-wider">Caloric Breakdown</h3>
              <div class="grid grid-cols-3 gap-3">
                <div class="bg-black border border-gray-800/50 rounded-lg p-3 text-center">
                  <div class="text-yellow-400 font-light text-2xl mb-1">{{ Math.round(recipe.nutrition.caloricBreakdown.percentCarbs) }}%</div>
                  <div class="text-gray-500 text-xs font-mono">Carbs</div>
                </div>
                <div class="bg-black border border-gray-800/50 rounded-lg p-3 text-center">
                  <div class="text-yellow-400 font-light text-2xl mb-1">{{ Math.round(recipe.nutrition.caloricBreakdown.percentFat) }}%</div>
                  <div class="text-gray-500 text-xs font-mono">Fat</div>
                </div>
                <div class="bg-black border border-gray-800/50 rounded-lg p-3 text-center">
                  <div class="text-yellow-400 font-light text-2xl mb-1">{{ Math.round(recipe.nutrition.caloricBreakdown.percentProtein) }}%</div>
                  <div class="text-gray-500 text-xs font-mono">Protein</div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <!-- Right: Header / Instructions / Summary -->
        <section class="lg:col-span-2 space-y-6">
          <div class="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800/50 overflow-hidden">
            <div class="relative h-64">
              <img :src="recipe.image" :alt="recipe.title" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            </div>
            <div class="p-6">
              <div class="flex items-start justify-between gap-4 mb-4">
                <h1 class="text-3xl font-light text-white flex-1">{{ recipe.title }}</h1>
                <!-- Favourite button -->
                <button
                  v-if="authStore.isAuthenticated"
                  @click="toggleFavourite"
                  class="flex-shrink-0 rounded-xl border p-3 transition-all duration-300 hover:shadow-lg"
                  :class="isFavourited
                    ? 'bg-yellow-400/20 border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/30'
                    : 'border-gray-700/50 text-gray-400 hover:border-yellow-400/50 hover:text-yellow-400'"
                  :title="isFavourited ? 'Remove from favourites' : 'Add to favourites'"
                >
                  <svg class="w-6 h-6" :fill="isFavourited ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>
              <div class="flex items-center gap-6 text-sm text-gray-400 font-mono">
                <span class="flex items-center gap-2"><span class="text-yellow-400">⏱️</span> {{ recipe.readyInMinutes }} min</span>
                <span class="flex items-center gap-2"><span class="text-yellow-400">🍽️</span> {{ recipe.servings }} servings</span>
                <span v-if="recipe.healthScore" class="flex items-center gap-2"><span class="text-yellow-400">💚</span> Health: {{ recipe.healthScore }}/100</span>
              </div>
            </div>
          </div>

          <div v-if="recipe.analyzedInstructions?.[0]?.steps?.length" class="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800/50 p-6">
            <h2 class="text-xl font-light text-white mb-4">Instructions</h2>
            <div class="space-y-4">
              <div v-for="step in recipe.analyzedInstructions[0].steps" :key="step.number" class="flex gap-4">
                <span class="flex-shrink-0 w-8 h-8 bg-yellow-400 text-black rounded-lg flex items-center justify-center text-sm font-medium">{{ step.number }}</span>
                <div class="flex-1">
                  <p class="text-gray-400 font-light leading-relaxed mb-2">{{ step.step }}</p>
                  <div v-if="step.equipment?.length" class="flex items-center gap-2 mt-2">
                    <span class="text-xs text-gray-600 font-mono uppercase tracking-wider">Equipment:</span>
                    <div class="flex gap-2 flex-wrap">
                      <span v-for="eq in step.equipment" :key="eq.id" class="text-xs bg-black border border-gray-800/50 text-gray-400 px-2 py-1 rounded font-mono">
                        {{ eq.name }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="recipe.summary" class="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800/50 p-6">
            <h2 class="text-xl font-light text-white mb-4">About This Recipe</h2>
            <div class="text-gray-400 font-light text-sm leading-relaxed" v-html="plainSummary"></div>
          </div>
        </section>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFavouritesStore } from '@/stores/favourites'
import { useAuthStore } from '@/stores/auth'
import { generateSGDPrices } from '@/services/geminiPricingService'
import { showToast } from '@/utils/toast'

const route = useRoute()
const router = useRouter()
const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY || ''
const favouritesStore = useFavouritesStore()
const authStore = useAuthStore()

const recipe = ref(null)
const loading = ref(false)
const error = ref('')
const lastQuery = route.query.q || '' // preserve search text if provided
const isFavourited = computed(() => favouritesStore.favouriteIds.has(Number(route.params.id)))

const plainSummary = computed(() =>
  recipe.value?.summary ? recipe.value.summary.replace(/<[^>]*>/g, '') : ''
)

function goBack() {
  router.push({ name: 'find-recipes', query: lastQuery ? { q: lastQuery } : {} })
}

async function toggleFavourite() {
  if (!authStore.isAuthenticated) {
    router.push('/login')
    return
  }

  try {
    if (recipe.value) {
      await favouritesStore.toggleFavourite({
        id: recipe.value.id,
        title: recipe.value.title,
        image: recipe.value.image,
        readyInMinutes: recipe.value.readyInMinutes,
        aggregateLikes: recipe.value.aggregateLikes || 0
      })
    }
  } catch (err) {
    console.error('Failed to toggle favourite:', err)
  }
}

onMounted(async () => {
  await fetchRecipe()
  if (authStore.isAuthenticated) {
    await favouritesStore.loadFavourites()
  }
})

async function fetchRecipe() {
  const id = route.params.id
  if (!id || !apiKey) { error.value = 'Missing recipe id or API key.'; return }

  loading.value = true
  try {
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&includeNutrition=true`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch recipe details')
    const data = await res.json()

    // unique equipment
    const equip = new Map()
    if (data.analyzedInstructions?.[0]?.steps) {
      for (const step of data.analyzedInstructions[0].steps) {
        for (const e of (step.equipment || [])) equip.set(e.id, e)
      }
    }
    data.equipment = Array.from(equip.values())

    recipe.value = data
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (e) {
    console.error(e)
    error.value = e?.message || 'Failed to load recipe details.'
  } finally {
    loading.value = false
  }
}

async function addToShoppingList() {
  if (!recipe.value?.extendedIngredients) return

  try {
    showToast('Generating Singapore supermarket prices...', 'info')

    const existing = JSON.parse(localStorage.getItem('shoppingList') || '[]')

    // Generate realistic SGD prices using Gemini
    const geminiPrices = await generateSGDPrices(recipe.value.extendedIngredients)

    const newItems = recipe.value.extendedIngredients.map(ing => {
      const ingredientKey = ing.name.toLowerCase().trim()
      const priceData = geminiPrices[ingredientKey]

      let price = 0
      let priceSource = 'gemini'
      let storeConfidence = {}

      if (priceData) {
        price = priceData.estimatedPriceSGD || 0
        storeConfidence = priceData.storeConfidence || {}
      }

      return {
        id: Date.now() + Math.random(),
        name: ing.name,
        amount: ing.amount || 1,
        unit: ing.unit || '',
        recipe: recipe.value.title,
        spoonacularPrice: price,
        priceSource: priceSource,
        priceRangeSGD: priceData?.priceRangeSGD || 'N/A',
        storeConfidence: storeConfidence,
        purchased: false,
        userEditedPrice: false
      }
    })

    localStorage.setItem('shoppingList', JSON.stringify([...existing, ...newItems]))

    const totalEstimated = newItems.reduce((s, i) => s + (i.spoonacularPrice || 0), 0)
    let msg = `Added ${newItems.length} ingredients to shopping list!`
    if (totalEstimated > 0) msg += ` Estimated total: SGD $${totalEstimated.toFixed(2)}`

    showToast(msg, 'success')

  } catch (error) {
    console.error('Error adding to shopping list:', error)
    showToast('Failed to add ingredients. Please try again.', 'error')
  }
}

function addToMealPlanner() {
  if (!recipe.value) return

  // Extract calorie information from nutrition data
  let calories = 0
  if (recipe.value.nutrition?.nutrients) {
    const calorieNutrient = recipe.value.nutrition.nutrients.find(n => n.name.toLowerCase() === 'calories')
    if (calorieNutrient) {
      calories = Math.round(calorieNutrient.amount)
    }
  }

  // If no calories found, try to estimate based on servings
  if (calories === 0 && recipe.value.nutrition?.nutrients) {
    const proteinNutrient = recipe.value.nutrition.nutrients.find(n => n.name.toLowerCase() === 'protein')
    const fatNutrient = recipe.value.nutrition.nutrients.find(n => n.name.toLowerCase() === 'fat')
    const carbNutrient = recipe.value.nutrition.nutrients.find(n => n.name.toLowerCase() === 'carbohydrates')

    // Protein and carbs = 4 cal/g, fat = 9 cal/g
    const protein = proteinNutrient?.amount || 0
    const fat = fatNutrient?.amount || 0
    const carbs = carbNutrient?.amount || 0
    calories = Math.round((protein * 4) + (fat * 9) + (carbs * 4))
  }

  // Store recipe data in sessionStorage to pass to PlanMeal
  const recipeData = {
    name: recipe.value.title,
    calories: calories,
    imageUrl: recipe.value.image,
    recipeId: recipe.value.id,
    readyInMinutes: recipe.value.readyInMinutes
  }

  sessionStorage.setItem('mealPlannerRecipe', JSON.stringify(recipeData))

  // Navigate to meal planner
  router.push('/plan-meal')
  showToast(`"${recipe.value.title}" added to meal planner!`, 'success')
}
</script>