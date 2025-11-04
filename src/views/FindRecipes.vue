<!-- src/views/FindRecipes.vue -->
<template>
  <main class="min-h-screen bg-black">
    
    <!-- INITIAL (centered) -->
    <section v-if="!hasSearched" class="min-h-[60vh] flex items-center justify-center px-4">
      <div class="w-full max-w-2xl">
        <div class="text-center mb-8">
          <div class="inline-block mb-4">
            <span class="text-xs font-mono uppercase tracking-wider text-yellow-400/80 bg-yellow-400/10 px-3 py-1.5 rounded-full border border-yellow-400/20">
              Recipe Discovery
            </span>
          </div>
          <h1 class="text-4xl sm:text-5xl font-light text-white mb-4">Find Recipes</h1>
          <p class="text-gray-400 font-light">Discover meals that match your taste and budget</p>
        </div>

        <!-- Search bar -->
<form @submit.prevent="onSearch" class="flex gap-3 mb-3 items-center">
  <input
    v-model.trim="query"
    type="text"
    placeholder="Search recipes… e.g. chicken, tofu, pasta"
    class="flex-1 p-4 bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl text-white placeholder-gray-500 focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors font-light"
  />
  <button
    class="px-8 py-4 rounded-xl font-medium bg-yellow-400 text-black hover:bg-yellow-300 transition-colors disabled:opacity-50 shadow-lg hover:shadow-yellow-400/20"
    :disabled="loading || !apiKey"
    type="submit"
  >
    {{ loading ? 'Searching…' : 'Search' }}
  </button>
</form>

<!-- Toggle BELOW the bar -->
<div class="flex justify-start gap-2">
  <button
    type="button"
    class="text-sm px-3 py-2 rounded-lg border border-gray-800/50 text-yellow-400 hover:text-yellow-300 hover:border-yellow-400/50 transition-colors"
    @click="filtersOpen = !filtersOpen"
    :aria-expanded="filtersOpen ? 'true' : 'false'"
    aria-controls="filters-initial"
  >
    {{ filtersOpen ? 'Hide Filters' : 'Show Filters' }}
  </button>
  <button
    type="button"
    @click="applyDietaryPreferences"
    :disabled="loadingPreferences"
    class="text-sm px-3 py-2 rounded-lg border border-gray-800/50 text-green-400 hover:text-green-300 hover:border-green-400/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    title="Apply your dietary preferences from your profile"
  >
    {{ loadingPreferences ? 'Loading...' : 'Apply Preferences' }}
  </button>
</div>

<!-- Filters panel BELOW the toggle -->
<div
  v-show="filtersOpen"
  id="filters-initial"
  class="mt-3 bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800/50 rounded-xl p-6 backdrop-blur-sm"
>
  <div class="space-y-4">
    <!-- Calories Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-xs text-gray-400 uppercase tracking-wider font-mono mb-2">Min Calories</label>
        <input type="number" min="0" v-model.number="minCalories"
               class="w-full px-4 py-2.5 bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors font-light"
               placeholder="0" />
      </div>
      <div>
        <label class="block text-xs text-gray-400 uppercase tracking-wider font-mono mb-2">Max Calories</label>
        <input type="number" min="0" v-model.number="maxCalories"
               class="w-full px-4 py-2.5 bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors font-light"
               placeholder="9999" />
      </div>
    </div>

    <!-- Include Ingredients -->
    <div>
      <label class="block text-xs text-gray-400 uppercase tracking-wider font-mono mb-2">Include Ingredients (comma-separated)</label>
      <input v-model.trim="includeIngredients" placeholder="e.g. chicken, rice"
             class="w-full px-4 py-2.5 bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors font-light" />
    </div>

    <!-- Diet -->
    <div>
      <label class="block text-xs text-gray-400 uppercase tracking-wider font-mono mb-2">Diet (Select multiple)</label>
      <select v-model="diet" multiple class="w-full px-4 py-2.5 bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors font-light">
        <option value="vegetarian">vegetarian</option>
        <option value="vegan">vegan</option>
        <option value="paleo">paleo</option>
        <option value="ketogenic">ketogenic</option>
        <option value="whole30">whole30</option>
      </select>
    </div>

    <!-- Allergies -->
    <div>
      <label class="block text-xs text-gray-400 uppercase tracking-wider font-mono mb-2">Allergies (Select multiple)</label>
      <select v-model="intolerances" multiple class="w-full px-4 py-2.5 bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors font-light">
        <option value="Dairy">Dairy</option>
        <option value="Peanut">Peanut</option>
        <option value="Soy">Soy</option>
        <option value="Egg">Egg</option>
        <option value="Seafood">Seafood</option>
        <option value="Sulfite">Sulfite</option>
        <option value="Gluten">Gluten</option>
        <option value="Sesame">Sesame</option>
        <option value="Tree Nut">Tree Nut</option>
        <option value="Grain">Grain</option>
        <option value="Shellfish">Shellfish</option>
        <option value="Wheat">Wheat</option>
      </select>
    </div>

    <!-- Type -->
    <div>
      <label class="block text-xs text-gray-400 uppercase tracking-wider font-mono mb-2">Type</label>
      <select v-model="type" class="w-full px-4 py-2.5 bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors font-light">
        <option value="">(Any)</option>
        <option value="main course">main course</option>
        <option value="side dish">side dish</option>
        <option value="dessert">dessert</option>
        <option value="appetizer">appetizer</option>
        <option value="salad">salad</option>
        <option value="bread">bread</option>
        <option value="breakfast">breakfast</option>
        <option value="soup">soup</option>
        <option value="beverage">beverage</option>
        <option value="sauce">sauce</option>
        <option value="marinade">marinade</option>
        <option value="fingerfood">fingerfood</option>
        <option value="snack">snack</option>
        <option value="drink">drink</option>
      </select>
    </div>
  </div>
</div>

        <p v-if="!apiKey" class="text-center bg-red-900/20 border border-red-500/30 text-red-300 p-4 rounded-xl text-sm font-light">
          Missing API key. Set <code class="bg-black/50 px-2 py-1 rounded font-mono">VITE_SPOONACULAR_API_KEY</code> in your <code class="bg-black/50 px-2 py-1 rounded font-mono">.env</code>.
        </p>
      </div>
    </section>

    <!-- AFTER SEARCH (top bar + results) -->
    <section v-else class="px-4 py-8">
      <!-- sticky/top search bar -->
      <div class="sticky top-0 z-10 bg-black/95 backdrop-blur-xl border-b border-gray-800/50 -mx-4 px-4 py-4 mb-8">
        <!-- Search bar + inline toggle -->
<!-- Search bar -->
<form @submit.prevent="onSearch" class="max-w-6xl mx-auto flex gap-3 items-center">
  <input
    v-model.trim="query"
    type="text"
    placeholder="Search recipes…"
    class="flex-1 p-3 bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl text-white placeholder-gray-500 focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors font-light"
  />
  <button
    type="button"
    @click="refreshResults"
    class="w-12 h-12 rounded-xl border border-gray-800/50 hover:border-yellow-400/50 text-gray-400 hover:text-yellow-400 flex items-center justify-center transition-colors disabled:opacity-50"
    :disabled="loading || !apiKey || !query"
    title="Refresh results"
  >
    <svg class="w-5 h-5" :class="{'animate-spin': loading}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
    </svg>
  </button>
  <button
    type="submit"
    class="px-8 py-3 rounded-xl font-medium bg-yellow-400 text-black hover:bg-yellow-300 transition-colors disabled:opacity-50 shadow-lg hover:shadow-yellow-400/20"
    :disabled="loading || !apiKey"
  >
    {{ loading ? 'Searching…' : 'Search' }}
  </button>
</form>

<!-- Toggle BELOW the bar, same width as the form -->
<div class="max-w-6xl mx-auto mt-3 flex gap-2">
  <button
    type="button"
    class="text-sm px-3 py-2 rounded-lg border border-gray-800/50 text-yellow-400 hover:text-yellow-300 hover:border-yellow-400/50 transition-colors"
    @click="filtersOpen = !filtersOpen"
    :aria-expanded="filtersOpen ? 'true' : 'false'"
    aria-controls="filters-sticky"
  >
    {{ filtersOpen ? 'Hide Filters' : 'Show Filters' }}
  </button>
  <button
    type="button"
    @click="applyDietaryPreferences"
    :disabled="loadingPreferences"
    class="text-sm px-3 py-2 rounded-lg border border-gray-800/50 text-green-400 hover:text-green-300 hover:border-green-400/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    title="Apply your dietary preferences from your profile"
  >
    {{ loadingPreferences ? 'Loading...' : 'Apply Preferences' }}
  </button>
</div>

<!-- Filters panel BELOW the toggle -->
<div
  v-show="filtersOpen"
  id="filters-sticky"
  class="max-w-6xl mx-auto mt-3 bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800/50 rounded-xl p-6 backdrop-blur-sm"
>
  <div class="space-y-4">
    <!-- Calories Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-xs text-gray-400 uppercase tracking-wider font-mono mb-2">Min Calories</label>
        <input type="number" min="0" v-model.number="minCalories"
               class="w-full px-4 py-2.5 bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors font-light"
               placeholder="0" />
      </div>
      <div>
        <label class="block text-xs text-gray-400 uppercase tracking-wider font-mono mb-2">Max Calories</label>
        <input type="number" min="0" v-model.number="maxCalories"
               class="w-full px-4 py-2.5 bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors font-light"
               placeholder="9999" />
      </div>
    </div>

    <!-- Include Ingredients -->
    <div>
      <label class="block text-xs text-gray-400 uppercase tracking-wider font-mono mb-2">Include Ingredients (comma-separated)</label>
      <input v-model.trim="includeIngredients" placeholder="e.g. chicken, rice"
             class="w-full px-4 py-2.5 bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors font-light" />
    </div>

    <!-- Diet -->
    <div>
      <label class="block text-xs text-gray-400 uppercase tracking-wider font-mono mb-2">Diet (Select multiple)</label>
      <select v-model="diet" multiple class="w-full px-4 py-2.5 bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors font-light">
        <option value="vegetarian">vegetarian</option>
        <option value="vegan">vegan</option>
        <option value="paleo">paleo</option>
        <option value="ketogenic">ketogenic</option>
        <option value="whole30">whole30</option>
      </select>
    </div>

    <!-- Allergies -->
    <div>
      <label class="block text-xs text-gray-400 uppercase tracking-wider font-mono mb-2">Allergies (Select multiple)</label>
      <select v-model="intolerances" multiple class="w-full px-4 py-2.5 bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors font-light">
        <option value="Dairy">Dairy</option>
        <option value="Peanut">Peanut</option>
        <option value="Soy">Soy</option>
        <option value="Egg">Egg</option>
        <option value="Seafood">Seafood</option>
        <option value="Sulfite">Sulfite</option>
        <option value="Gluten">Gluten</option>
        <option value="Sesame">Sesame</option>
        <option value="Tree Nut">Tree Nut</option>
        <option value="Grain">Grain</option>
        <option value="Shellfish">Shellfish</option>
        <option value="Wheat">Wheat</option>
      </select>
    </div>

    <!-- Type -->
    <div>
      <label class="block text-xs text-gray-400 uppercase tracking-wider font-mono mb-2">Type</label>
      <select v-model="type" class="w-full px-4 py-2.5 bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors font-light">
        <option value="">(Any)</option>
        <option value="main course">main course</option>
        <option value="side dish">side dish</option>
        <option value="dessert">dessert</option>
        <option value="appetizer">appetizer</option>
        <option value="salad">salad</option>
        <option value="bread">bread</option>
        <option value="breakfast">breakfast</option>
        <option value="soup">soup</option>
        <option value="beverage">beverage</option>
        <option value="sauce">sauce</option>
        <option value="marinade">marinade</option>
        <option value="fingerfood">fingerfood</option>
        <option value="snack">snack</option>
        <option value="drink">drink</option>
      </select>
    </div>
  </div>
</div>

      </div>

      <!-- messages -->
      <div class="max-w-6xl mx-auto">
        <div v-if="error" class="bg-red-900/20 border border-red-500/30 text-red-300 p-4 rounded-xl mb-6 text-sm font-light">{{ error }}</div>

        <div v-if="loading" class="flex justify-center py-20">
          <div class="w-12 h-12 border-4 border-gray-800 border-t-yellow-400 rounded-full animate-spin" aria-label="Loading"></div>
        </div>

        <p v-if="!loading && searched && results.length === 0" class="text-center text-gray-500 mt-12">
          <span class="text-sm font-light font-mono uppercase tracking-wider">No recipes found. Try a different keyword.</span>
        </p>

        <!-- results grid -->
        <div v-if="!loading && results.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <article
  v-for="r in results"
  :key="r.id"
  class="group rounded-xl overflow-hidden border border-gray-800/50 bg-gradient-to-br from-gray-900 to-black flex flex-col hover:border-yellow-400/30 transition-all duration-300"
>
  <div class="relative overflow-hidden">
    <img :src="r.image" :alt="r.title" class="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <!-- Favourite button -->
    <button
      v-if="authStore.isAuthenticated"
      @click="toggleFavourite(r)"
      class="absolute top-3 right-3 rounded-full bg-black/60 backdrop-blur-sm border border-gray-700/50 hover:border-yellow-400/50 p-2 text-gray-400 hover:text-yellow-400 transition-all duration-300 shadow-lg"
      :class="{ 'border-yellow-400/50 bg-yellow-400/20': favouritesStore.favouriteIds.has(r.id) }"
      :title="favouritesStore.favouriteIds.has(r.id) ? 'Remove from favourites' : 'Add to favourites'"
    >
      <svg class="w-5 h-5" :fill="favouritesStore.favouriteIds.has(r.id) ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
  </div>
  <div class="p-5 flex flex-col flex-1">
    <h3 class="font-medium text-lg text-white line-clamp-2 mb-3">{{ r.title }}</h3>
    <div class="mt-auto">
      <div class="mb-4 text-sm text-gray-400 flex flex-wrap gap-4 font-mono">
        <span class="flex items-center gap-1">
          <span class="text-yellow-400">⏱</span> {{ r.readyInMinutes ?? '?' }} min
        </span>
        <span v-if="typeof r.aggregateLikes === 'number'" class="flex items-center gap-1">
          <span class="text-yellow-400">👍</span> {{ r.aggregateLikes }}
        </span>
      </div>
      <RouterLink
  :to="{ name: 'recipe-detail', params: { id: r.id }, query: query ? { q: query } : {} }"
  class="w-full text-center rounded-lg px-4 py-2.5 bg-yellow-400 text-black font-medium hover:bg-yellow-300 transition-colors shadow-lg hover:shadow-yellow-400/20"
>
  View Recipe
</RouterLink>
    </div>
  </div>
</article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useFavouritesStore } from '@/stores/favourites'
import { useAuthStore } from '@/stores/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/config/firebase'

const router = useRouter()
const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY || ''
const favouritesStore = useFavouritesStore()
const authStore = useAuthStore()

// Check if we're coming from navigation (back button) or fresh load
const isNavigatingBack = sessionStorage.getItem('navigatingBack') === 'true'

// Initialize state from sessionStorage only if navigating back
const savedState = isNavigatingBack ? sessionStorage.getItem('findRecipesState') : null
const initialState = savedState ? JSON.parse(savedState) : null

const query = ref(initialState?.query || '')
const results = ref(initialState?.results || [])
const loading = ref(false)
const error = ref('')
const searched = ref(false)
const hasSearched = ref(false)
const filtersOpen = ref(false)
const loadingPreferences = ref(false)

const minCalories = ref(null)
const maxCalories = ref(null)
const includeIngredients = ref('')
const excludeIngredients = ref('')
const diet = ref([])
const intolerances = ref([])
const type = ref('')

// Helper function to check if any filters are set
function hasActiveFilters() {
  return (
    query.value ||
    (minCalories.value != null && minCalories.value !== '') ||
    (maxCalories.value != null && maxCalories.value !== '') ||
    includeIngredients.value ||
    excludeIngredients.value ||
    diet.value.length > 0 ||
    intolerances.value.length > 0 ||
    type.value
  )
}

// Apply dietary preferences from user profile
async function applyDietaryPreferences() {
  try {
    loadingPreferences.value = true
    error.value = ''

    if (!authStore.user) {
      error.value = 'You must be logged in to apply preferences.'
      loadingPreferences.value = false
      return
    }

    // Fetch user preferences from Firestore
    const userRef = doc(db, 'users', authStore.user.email)
    const userSnapshot = await getDoc(userRef)

    if (!userSnapshot.exists()) {
      error.value = 'Could not find your profile. Please update your preferences first.'
      loadingPreferences.value = false
      return
    }

    const userData = userSnapshot.data()
    const preferences = userData?.preferences || {}
    const dietaryRestrictions = preferences.dietaryRestrictions || []
    const allergies = preferences.allergies || []

    console.log('Fetched preferences:', { dietaryRestrictions, allergies })

    // Clear current filters
    diet.value = []
    intolerances.value = []

    // Apply dietary restrictions directly (they now match the API diet options)
    // Profile diets: vegetarian, vegan, paleo, ketogenic, whole30
    diet.value = [...dietaryRestrictions]

    // Apply allergies directly (they now match the API intolerance options)
    // Profile allergies: Dairy, Peanut, Soy, Egg, Seafood, Sulfite, Gluten, Sesame, Tree Nut, Grain, Shellfish, Wheat
    intolerances.value = [...allergies]

    // Auto-open filters if we applied anything
    if (diet.value.length > 0 || intolerances.value.length > 0) {
      filtersOpen.value = true
    }

    if (diet.value.length === 0 && intolerances.value.length === 0) {
      error.value = 'No dietary preferences set in your profile.'
    }

  } catch (err) {
    console.error('Error applying preferences:', err)
    error.value = 'Failed to apply your preferences. Please try again.'
  } finally {
    loadingPreferences.value = false
  }
}

async function onSearch() {
  error.value = ''
  searched.value = true
  hasSearched.value = true
  results.value = []

  if (!apiKey) { error.value = 'Missing Spoonacular API key.'; return }

  // Check if at least one filter or search term is provided
  if (!hasActiveFilters()) {
    error.value = 'Please enter a search term or select at least one filter.'
    return
  }

  // quick guard: if both calories set, ensure min <= max
  if (minCalories.value != null && maxCalories.value != null && minCalories.value > maxCalories.value) {
    error.value = 'Min Calories cannot be greater than Max Calories.'
    return
  }

  loading.value = true
  try {
    const params = new URLSearchParams({
      number: '100',
      addRecipeInformation: 'true',
      addRecipeNutrition: 'true',   // include nutrition so min/max calories work
      sort: 'popularity',
      apiKey
    })

    // Only set titleMatch if query is provided
    if (query.value.trim()) {
      params.set('titleMatch', query.value.trim())
    }

    // OPTIONAL FILTERS – only set if user provided a value
    if (minCalories.value != null && minCalories.value !== '') params.set('minCalories', String(minCalories.value))
    if (maxCalories.value != null && maxCalories.value !== '') params.set('maxCalories', String(maxCalories.value))
    if (includeIngredients.value) params.set('includeIngredients', includeIngredients.value)
    if (excludeIngredients.value) params.set('excludeIngredients', excludeIngredients.value)
    if (diet.value.length > 0) params.set('diet', diet.value.join(','))
    if (intolerances.value.length > 0) params.set('intolerances', intolerances.value.join(','))
    if (type.value) params.set('type', type.value)

    const url = `https://api.spoonacular.com/recipes/complexSearch?${params}`
    console.log('[req]', url)
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Spoonacular error ${res.status}: ${await res.text()}`)
    const data = await res.json()

    // strict client title filter (whole-word) - only apply if query is provided
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
      // Only apply word filtering if there's a query
      .filter(r => words.length === 0 || wordRegexes.every(rx => rx.test(r.title)))
      .sort((a, b) => (b.aggregateLikes ?? 0) - (a.aggregateLikes ?? 0))
  } catch (e) {
    console.error(e)
    error.value = e?.message || 'Failed to fetch recipes.'
  } finally {
    loading.value = false
  }
}

async function toggleFavourite(recipe) {
  try {
    await favouritesStore.toggleFavourite({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      readyInMinutes: recipe.readyInMinutes,
      aggregateLikes: recipe.aggregateLikes
    })
  } catch (err) {
    console.error('Failed to toggle favourite:', err)
  }
}

onMounted(async () => {
  if (authStore.isAuthenticated) {
    await favouritesStore.loadFavourites()
  }
})
</script>

<style scoped>
/* Futuristic select dropdown styling */
select {
  /* Color scheme for dark theme dropdown */
  color-scheme: dark;

  /* Background and Colors */
  background: linear-gradient(to bottom, rgb(31, 41, 55), rgb(15, 15, 15));
  background-color: rgb(15, 15, 15);
  color: rgb(255, 255, 255);

  /* Typography - matching site's futuristic font */
  font-family: inherit;
  font-weight: 300;
  font-size: 0.95rem;
  letter-spacing: 0.025em;

  /* Borders and Effects */
  border: 1px solid rgba(107, 114, 128, 0.5);
  border-radius: 0.5rem;
  padding: 0.625rem 1rem;

  /* Transitions for smooth interactions */
  transition: all 0.3s ease;
  cursor: pointer;

  /* Shadow for depth */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);

  /* Ensure dropdown appears below */
  z-index: 10;
}

/* Hover state */
select:hover {
  border-color: rgba(250, 204, 21, 0.5);
  box-shadow: 0 4px 12px rgba(250, 204, 21, 0.1);
}

/* Focus state with yellow accent */
select:focus {
  outline: none;
  border-color: rgba(250, 204, 21, 0.7);
  box-shadow: 0 0 0 2px rgba(250, 204, 21, 0.2), 0 4px 12px rgba(250, 204, 21, 0.15);
  background: linear-gradient(to bottom, rgb(31, 41, 55), rgb(20, 20, 20));
}

/* Active state */
select:active {
  transform: scale(0.98);
  transition: transform 0.1s ease;
}

/* Style option elements for dark theme */
option {
  background-color: rgb(15, 15, 15);
  color: rgb(255, 255, 255);
  font-family: inherit;
  font-weight: 300;
  padding: 0.75rem 1rem;
  border: none;
}

/* Hover state for options */
option:hover {
  background: linear-gradient(rgb(55, 65, 81), rgb(55, 65, 81));
  background-color: rgb(55, 65, 81);
  color: rgb(255, 255, 255);
}

/* Checked/Selected option styling */
option:checked {
  background: linear-gradient(135deg, rgb(250, 204, 21), rgb(251, 191, 36));
  background-color: rgb(250, 204, 21);
  color: rgb(0, 0, 0);
  font-weight: 500;
}

/* Disabled state */
select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: linear-gradient(to bottom, rgb(20, 20, 20), rgb(15, 15, 15));
  border-color: rgba(107, 114, 128, 0.3);
}

/* Media query for better mobile support */
@media (max-width: 640px) {
  select {
    font-size: 1rem; /* Avoid zoom on mobile */
    padding: 0.75rem 2.5rem 0.75rem 1rem;
  }
}
</style>