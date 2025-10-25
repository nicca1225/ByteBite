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
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-light text-white">Ingredients</h2>
              <button
                @click="addToShoppingList"
                class="px-3 py-2 bg-yellow-400 text-black text-sm font-medium rounded-lg hover:bg-yellow-300 transition-colors"
              >
                + Shopping List
              </button>
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
            <div v-if="recipe.pricePerServing && recipe.pricePerServing > 0" class="mt-4 pt-4 border-t border-gray-800/50">
              <p class="text-sm text-gray-400 font-light">
                <strong class="text-yellow-400 font-mono text-xs uppercase tracking-wider">Total Recipe Cost:</strong>
                <span class="text-white font-medium">${{ (recipe.pricePerServing * recipe.servings / 100).toFixed(2) }}</span>
              </p>
              <p class="text-sm text-gray-400 font-light mt-1">
                <strong class="text-yellow-400 font-mono text-xs uppercase tracking-wider">Cost Per Serving:</strong>
                <span class="text-white font-medium">${{ (recipe.pricePerServing / 100).toFixed(2) }}</span>
              </p>
            </div>
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
              <h1 class="text-3xl font-light text-white mb-4">{{ recipe.title }}</h1>
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

const route = useRoute()
const router = useRouter()
const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY || ''

const recipe = ref(null)
const loading = ref(false)
const error = ref('')
const lastQuery = route.query.q || '' // preserve search text if provided

const plainSummary = computed(() =>
  recipe.value?.summary ? recipe.value.summary.replace(/<[^>]*>/g, '') : ''
)

function goBack() {
  router.push({ name: 'find-recipes', query: lastQuery ? { q: lastQuery } : {} })
}

onMounted(fetchRecipe)

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

function addToShoppingList() {
  if (!recipe.value?.extendedIngredients) return
  const existing = JSON.parse(localStorage.getItem('shoppingList') || '[]')

  const totalRecipeCost = recipe.value.pricePerServing
    ? (recipe.value.pricePerServing * recipe.value.servings / 100)
    : 0

  const count = recipe.value.extendedIngredients.length || 1

  const newItems = recipe.value.extendedIngredients.map(ing => {
    let price = 0
    if (ing.estimatedCost?.value) {
      price = ing.estimatedCost.value / 100
    } else if (totalRecipeCost > 0) {
      let weight = 1
      const n = (ing.name || '').toLowerCase()
      if (/(chicken|beef|pork|fish)/.test(n)) weight = 3
      else if (/(cheese|cream)/.test(n)) weight = 2
      else if (/(salt|pepper|spice)/.test(n)) weight = 0.1
      price = (totalRecipeCost / count) * weight
    }
    return {
      id: Date.now() + Math.random(),
      name: ing.name,
      amount: ing.amount || 1,
      unit: ing.unit || '',
      recipe: recipe.value.title,
      spoonacularPrice: price,
      purchased: false
    }
  })

  localStorage.setItem('shoppingList', JSON.stringify([...existing, ...newItems]))

  const totalEstimated = newItems.reduce((s, i) => s + (i.spoonacularPrice || 0), 0)
  let msg = `Added ${newItems.length} ingredients to shopping list!`
  if (totalEstimated > 0) msg += ` Estimated cost: $${totalEstimated.toFixed(2)}`
  if (totalRecipeCost > 0) msg += ` (Recipe total: $${totalRecipeCost.toFixed(2)})`
  alert(msg)
}
</script>