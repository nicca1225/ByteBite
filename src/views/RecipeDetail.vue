<!-- src/views/RecipeDetail.vue -->
<template>
  <main class="min-h-screen bg-gray-50 px-4 py-8">
    <div class="max-w-5xl mx-auto">
      <!-- Back Button -->
      <button
        @click="goBack"
        class="mb-6 text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Back to Search
      </button>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="spinner" aria-label="Loading recipe details"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>

      <!-- Recipe Content -->
      <article v-else-if="recipe" class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Hero Image -->
        <div class="relative h-64 sm:h-96">
          <img
            :src="recipe.image"
            :alt="recipe.title"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Recipe Info -->
        <div class="p-6 sm:p-8">
          <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {{ recipe.title }}
          </h1>

          <!-- Quick Stats -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 pb-8 border-b">
            <div class="text-center">
              <div class="text-sm text-gray-600 mb-1">Time</div>
              <div class="text-2xl font-bold text-primary-600">{{ recipe.readyInMinutes }}</div>
              <div class="text-xs text-gray-500">minutes</div>
            </div>
            <div v-if="recipe.servings" class="text-center">
              <div class="text-sm text-gray-600 mb-1">Servings</div>
              <div class="text-2xl font-bold text-primary-600">{{ recipe.servings }}</div>
              <div class="text-xs text-gray-500">portions</div>
            </div>
            <div v-if="recipe.aggregateLikes" class="text-center">
              <div class="text-sm text-gray-600 mb-1">Likes</div>
              <div class="text-2xl font-bold text-primary-600">{{ recipe.aggregateLikes }}</div>
              <div class="text-xs text-gray-500">total</div>
            </div>
            <div v-if="recipe.healthScore" class="text-center">
              <div class="text-sm text-gray-600 mb-1">Health Score</div>
              <div class="text-2xl font-bold text-primary-600">{{ recipe.healthScore }}</div>
              <div class="text-xs text-gray-500">out of 100</div>
            </div>
          </div>

          <!-- Diet & Health Info -->
          <div v-if="recipe.diets?.length || recipe.dishTypes?.length" class="mb-8 pb-8 border-b">
            <div v-if="recipe.diets?.length" class="mb-4">
              <h3 class="text-sm font-semibold text-gray-600 uppercase mb-3">Diets</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="diet in recipe.diets"
                  :key="diet"
                  class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {{ diet }}
                </span>
              </div>
            </div>
            <div v-if="recipe.dishTypes?.length">
              <h3 class="text-sm font-semibold text-gray-600 uppercase mb-3">Dish Types</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="type in recipe.dishTypes"
                  :key="type"
                  class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {{ type }}
                </span>
              </div>
            </div>
          </div>

          <!-- Summary -->
          <div v-if="recipe.summary" class="mb-8 pb-8 border-b">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">About This Recipe</h2>
            <div
              class="text-gray-700 leading-relaxed"
              v-html="recipe.summary"
            ></div>
          </div>

          <!-- Ingredients -->
          <div v-if="recipe.extendedIngredients?.length" class="mb-8 pb-8 border-b">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
            <ul class="space-y-2">
              <li
                v-for="ingredient in recipe.extendedIngredients"
                :key="ingredient.id"
                class="flex items-start gap-3 text-gray-700"
              >
                <span class="text-primary-600 mt-1">•</span>
                <span>{{ ingredient.original }}</span>
              </li>
            </ul>
          </div>

          <!-- Instructions -->
          <div v-if="recipe.instructions || recipe.analyzedInstructions?.length" class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Instructions</h2>

            <!-- Analyzed Instructions (step by step) -->
            <div v-if="recipe.analyzedInstructions?.length">
              <div
                v-for="(section, idx) in recipe.analyzedInstructions"
                :key="idx"
                class="mb-6"
              >
                <h3 v-if="section.name" class="text-lg font-semibold text-primary-600 mb-4">
                  {{ section.name }}
                </h3>
                <ol class="space-y-4">
                  <li
                    v-for="step in section.steps"
                    :key="step.number"
                    class="flex gap-4"
                  >
                    <span class="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center text-sm">
                      {{ step.number }}
                    </span>
                    <p class="text-gray-700 leading-relaxed pt-1">{{ step.step }}</p>
                  </li>
                </ol>
              </div>
            </div>

            <!-- Fallback to plain instructions -->
            <div v-else-if="recipe.instructions" class="text-gray-700 leading-relaxed" v-html="recipe.instructions"></div>
          </div>

          <!-- Nutrition (if available) -->
          <div v-if="recipe.nutrition?.nutrients?.length" class="mb-8 pb-8 border-b">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Nutrition (per serving)</h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <div
                v-for="nutrient in mainNutrients"
                :key="nutrient.name"
                class="bg-gray-50 rounded-lg p-4 text-center"
              >
                <div class="text-xs text-gray-600 uppercase mb-2">
                  {{ nutrient.name }}
                </div>
                <div class="text-2xl font-bold text-primary-600">
                  {{ Math.round(nutrient.amount) }}
                </div>
                <div class="text-xs text-gray-500">{{ nutrient.unit }}</div>
              </div>
            </div>
          </div>

          <!-- Source Link -->
          <div v-if="recipe.sourceUrl" class="mt-6">
            <a
              :href="recipe.sourceUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              View Original Recipe
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
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
  border: 4px solid #f3f4f6;
  border-top-color: #f59e0b;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
