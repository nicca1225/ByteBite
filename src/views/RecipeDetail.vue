<!-- src/views/RecipeDetail.vue -->
<template>
  <main class="min-h-screen bg-black px-4 py-8">
    <div class="max-w-5xl mx-auto">
      <!-- Back Button -->
      <button
        @click="goBack"
        class="mb-8 text-gray-400 hover:text-yellow-400 font-mono uppercase tracking-wider text-sm flex items-center gap-2 transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7"></path>
        </svg>
        Back to Search
      </button>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="spinner" aria-label="Loading recipe details"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-900/20 border border-red-500/30 text-red-300 p-4 rounded-xl text-sm">
        {{ error }}
      </div>

      <!-- Recipe Content -->
      <article v-else-if="recipe" class="bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl overflow-hidden">
        <!-- Hero Image -->
        <div class="relative h-72 sm:h-96 overflow-hidden">
          <img
            :src="recipe.image"
            :alt="recipe.title"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-8">
            <div class="inline-block mb-3">
              <span class="text-xs font-mono uppercase tracking-wider text-yellow-400/80 bg-yellow-400/10 px-3 py-1.5 rounded-full border border-yellow-400/20">
                Recipe Details
              </span>
            </div>
            <h1 class="text-3xl sm:text-4xl font-light text-white">
              {{ recipe.title }}
            </h1>
          </div>
        </div>

        <!-- Recipe Info -->
        <div class="p-6 sm:p-8">
          <!-- Quick Stats -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 pb-8 border-b border-gray-800/50">
            <div class="bg-black border border-gray-800/50 rounded-lg p-4">
              <div class="text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Time</div>
              <div class="text-2xl font-light text-white">{{ recipe.readyInMinutes }}</div>
              <div class="text-xs text-gray-600 font-mono">minutes</div>
            </div>
            <div v-if="recipe.servings" class="bg-black border border-gray-800/50 rounded-lg p-4">
              <div class="text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Servings</div>
              <div class="text-2xl font-light text-white">{{ recipe.servings }}</div>
              <div class="text-xs text-gray-600 font-mono">portions</div>
            </div>
            <div v-if="recipe.aggregateLikes" class="bg-black border border-gray-800/50 rounded-lg p-4">
              <div class="text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Likes</div>
              <div class="text-2xl font-light text-white">{{ recipe.aggregateLikes }}</div>
              <div class="text-xs text-gray-600 font-mono">total</div>
            </div>
            <div v-if="recipe.healthScore" class="bg-black border border-gray-800/50 rounded-lg p-4">
              <div class="text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Health Score</div>
              <div class="text-2xl font-light text-white">{{ recipe.healthScore }}</div>
              <div class="text-xs text-gray-600 font-mono">out of 100</div>
            </div>
          </div>

          <!-- Diet & Health Info -->
          <div v-if="recipe.diets?.length || recipe.dishTypes?.length" class="mb-8 pb-8 border-b border-gray-800/50">
            <div v-if="recipe.diets?.length" class="mb-4">
              <h3 class="text-xs font-mono uppercase tracking-wider text-gray-500 mb-3">Diets</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="diet in recipe.diets"
                  :key="diet"
                  class="px-3 py-1.5 bg-green-900/20 border border-green-700/30 text-green-400 rounded-lg text-sm font-mono"
                >
                  {{ diet }}
                </span>
              </div>
            </div>
            <div v-if="recipe.dishTypes?.length">
              <h3 class="text-xs font-mono uppercase tracking-wider text-gray-500 mb-3">Dish Types</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="type in recipe.dishTypes"
                  :key="type"
                  class="px-3 py-1.5 bg-blue-900/20 border border-blue-700/30 text-blue-400 rounded-lg text-sm font-mono"
                >
                  {{ type }}
                </span>
              </div>
            </div>
          </div>

          <!-- Summary -->
          <div v-if="recipe.summary" class="mb-8 pb-8 border-b border-gray-800/50">
            <h2 class="text-2xl font-light text-white mb-4">About This Recipe</h2>
            <div
              class="text-gray-400 leading-relaxed prose prose-invert max-w-none font-light"
              v-html="recipe.summary"
            ></div>
          </div>

          <!-- Ingredients -->
          <div v-if="recipe.extendedIngredients?.length" class="mb-8 pb-8 border-b border-gray-800/50">
            <h2 class="text-2xl font-light text-white mb-4">Ingredients</h2>
            <div class="bg-black border border-gray-800/50 rounded-xl p-6">
              <ul class="space-y-3">
                <li
                  v-for="ingredient in recipe.extendedIngredients"
                  :key="ingredient.id"
                  class="flex items-start gap-3 text-gray-400 font-light"
                >
                  <span class="text-yellow-400 mt-1 text-xs">▸</span>
                  <span>{{ ingredient.original }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Instructions -->
          <div v-if="recipe.instructions || recipe.analyzedInstructions?.length" class="mb-8">
            <h2 class="text-2xl font-light text-white mb-4">Instructions</h2>

            <!-- Analyzed Instructions (step by step) -->
            <div v-if="recipe.analyzedInstructions?.length">
              <div
                v-for="(section, idx) in recipe.analyzedInstructions"
                :key="idx"
                class="mb-6"
              >
                <h3 v-if="section.name" class="text-sm font-mono uppercase tracking-wider text-yellow-400 mb-4">
                  {{ section.name }}
                </h3>
                <ol class="space-y-4">
                  <li
                    v-for="step in section.steps"
                    :key="step.number"
                    class="flex gap-4"
                  >
                    <span class="flex-shrink-0 w-8 h-8 rounded-lg bg-yellow-400 text-black font-medium flex items-center justify-center text-sm">
                      {{ step.number }}
                    </span>
                    <p class="text-gray-400 leading-relaxed pt-1 font-light">{{ step.step }}</p>
                  </li>
                </ol>
              </div>
            </div>

            <!-- Fallback to plain instructions -->
            <div v-else-if="recipe.instructions" class="text-gray-400 leading-relaxed prose prose-invert max-w-none font-light" v-html="recipe.instructions"></div>
          </div>

          <!-- Nutrition (if available) -->
          <div v-if="recipe.nutrition?.nutrients?.length" class="mb-8 pb-8 border-b border-gray-800/50">
            <h2 class="text-2xl font-light text-white mb-4">Nutrition (per serving)</h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              <div
                v-for="nutrient in mainNutrients"
                :key="nutrient.name"
                class="bg-black border border-gray-800/50 rounded-lg p-4"
              >
                <div class="text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">
                  {{ nutrient.name }}
                </div>
                <div class="text-2xl font-light text-yellow-400">
                  {{ Math.round(nutrient.amount) }}
                </div>
                <div class="text-xs text-gray-600 font-mono">{{ nutrient.unit }}</div>
              </div>
            </div>
          </div>

          <!-- Source Link -->
          <div v-if="recipe.sourceUrl" class="mt-6">
            <a
              :href="recipe.sourceUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-medium rounded-lg hover:bg-yellow-300 transition-colors"
            >
              View Original Recipe
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </div>
        </div>
      </article>
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
const loading = ref(true)
const error = ref('')

// Function to handle back navigation
function goBack() {
  // Set flag to indicate we're navigating back
  sessionStorage.setItem('navigatingBack', 'true')
  router.back()
}

// Extract main nutrients for display
const mainNutrients = computed(() => {
  if (!recipe.value?.nutrition?.nutrients) return []

  const mainNutrientNames = ['Calories', 'Fat', 'Carbohydrates', 'Protein', 'Sugar', 'Sodium', 'Fiber']
  return recipe.value.nutrition.nutrients.filter(n =>
    mainNutrientNames.includes(n.name)
  )
})

async function fetchRecipeDetails() {
  const recipeId = route.params.id

  if (!recipeId) {
    error.value = 'No recipe ID provided'
    loading.value = false
    return
  }

  if (!apiKey) {
    error.value = 'Missing Spoonacular API key'
    loading.value = false
    return
  }

  try {
    const params = new URLSearchParams({
      apiKey,
      includeNutrition: 'true'
    })

    const url = `https://api.spoonacular.com/recipes/${recipeId}/information?${params}`
    const res = await fetch(url)

    if (!res.ok) {
      throw new Error(`Failed to fetch recipe: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    recipe.value = data
  } catch (e) {
    console.error('Error fetching recipe:', e)
    error.value = e?.message || 'Failed to load recipe details'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  // Scroll to top when component loads
  window.scrollTo(0, 0)
  fetchRecipeDetails()
})
</script>

<style scoped>
.spinner {
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: #eab308;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.prose :deep(a) {
  color: #fbbf24;
  text-decoration: underline;
}

.prose :deep(a:hover) {
  color: #fcd34d;
}
</style>
