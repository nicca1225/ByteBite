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
<div class="flex justify-start">
  <button
    type="button"
    class="text-sm px-3 py-2 rounded-lg border border-gray-800/50 text-yellow-400 hover:text-yellow-300 hover:border-yellow-400/50 transition-colors"
    @click="filtersOpen = !filtersOpen"
    :aria-expanded="filtersOpen ? 'true' : 'false'"
    aria-controls="filters-initial"
  >
    {{ filtersOpen ? 'Hide Filters' : 'Show Filters' }}
  </button>
</div>

<!-- Filters panel BELOW the toggle -->
<div
  v-show="filtersOpen"
  id="filters-initial"
  class="mt-3 bg-black/70 border border-gray-800 rounded-xl p-4"
>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <!-- Calories -->
    <div>
      <label class="block text-xs text-gray-400 mb-1">Min Calories</label>
      <input type="number" min="0" v-model.number="minCalories"
             class="form-input w-full text-black placeholder-gray-400" />
    </div>
    <div>
      <label class="block text-xs text-gray-400 mb-1">Max Calories</label>
      <input type="number" min="0" v-model.number="maxCalories"
             class="form-input w-full text-black placeholder-gray-400" />
    </div>

    <!-- Ingredients -->
    <div class="md:col-span-2">
      <label class="block text-xs text-gray-400 mb-1">Include Ingredients (comma-separated)</label>
      <input v-model.trim="includeIngredients" placeholder="e.g. chicken, rice"
             class="form-input w-full text-black placeholder-gray-400" />
    </div>

    <!-- Diet / Intolerances / Type -->
    <div>
      <label class="block text-xs text-gray-400 mb-1">Diet</label>
      <select v-model="diet" class="form-input w-full text-black">
        <option value="">(Any)</option>
        <option>vegetarian</option><option>vegan</option>
        <option>paleo</option><option>ketogenic</option><option>whole30</option>
      </select>
    </div>
    <div>
      <label class="block text-xs text-gray-400 mb-1">Allergies</label>
      <!-- <input v-model.trim="intolerances" placeholder="e.g. gluten, dairy, peanut"
             class="form-input w-full text-black placeholder-gray-400" /> -->
      <select v-model="intolerances" class="form-input w-full text-black">
        <option value="">(Any)</option>
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
    <div>
      <label class="block text-xs text-gray-400 mb-1">Type</label>
      <select v-model="type" class="form-input w-full text-black">
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
<div class="max-w-6xl mx-auto mt-3">
  <button
    type="button"
    class="text-sm px-3 py-2 rounded-lg border border-gray-800/50 text-yellow-400 hover:text-yellow-300 hover:border-yellow-400/50 transition-colors"
    @click="filtersOpen = !filtersOpen"
    :aria-expanded="filtersOpen ? 'true' : 'false'"
    aria-controls="filters-sticky"
  >
    {{ filtersOpen ? 'Hide Filters' : 'Show Filters' }}
  </button>
</div>

<!-- Filters panel BELOW the toggle -->
<div
  v-show="filtersOpen"
  id="filters-sticky"
  class="max-w-6xl mx-auto mt-3 bg-black/70 border border-gray-800 rounded-xl p-4"
>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <!-- Calories -->
    <div>
      <label class="block text-xs text-gray-400 mb-1">Min Calories</label>
      <input type="number" min="0" v-model.number="minCalories"
             class="form-input w-full text-black placeholder-gray-400" />
    </div>
    <div>
      <label class="block text-xs text-gray-400 mb-1">Max Calories</label>
      <input type="number" min="0" v-model.number="maxCalories"
             class="form-input w-full text-black placeholder-gray-400" />
    </div>

    <!-- Ingredients -->
    <div class="md:col-span-2">
      <label class="block text-xs text-gray-400 mb-1">Include Ingredients (comma-separated)</label>
      <input v-model.trim="includeIngredients" placeholder="e.g. chicken, rice"
             class="form-input w-full text-black placeholder-gray-400" />
    </div>

    <!-- Diet / Intolerances / Type -->
    <div>
      <label class="block text-xs text-gray-400 mb-1">Diet</label>
      <select v-model="diet" class="form-input w-full text-black">
        <option value="">(Any)</option>
        <option>vegetarian</option><option>vegan</option>
        <option>paleo</option><option>ketogenic</option><option>whole30</option>
      </select>
    </div>
    <div>
      <label class="block text-xs text-gray-400 mb-1">Allergies</label>
      <!-- <input v-model.trim="intolerances" placeholder="e.g. gluten, dairy, peanut"
             class="form-input w-full text-black placeholder-gray-400" /> -->
      <select v-model="intolerances" class="form-input w-full text-black">
        <option value="">(Any)</option>
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
    <div>
      <label class="block text-xs text-gray-400 mb-1">Type</label>
      <select v-model="type" class="form-input w-full text-black">
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

const router = useRouter()
const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY || ''

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

const minCalories = ref(null)
const maxCalories = ref(null)
const includeIngredients = ref('')
const excludeIngredients = ref('')
const diet = ref('')
const intolerances = ref('')
const type = ref('')

async function onSearch() {
  error.value = ''
  searched.value = true
  hasSearched.value = true
  results.value = []

  if (!apiKey) { error.value = 'Missing Spoonacular API key.'; return }
  if (!query.value) return

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

    // title-only server hint (no query=)
    params.set('titleMatch', query.value.trim())

    // OPTIONAL FILTERS – only set if user provided a value
    if (minCalories.value != null && minCalories.value !== '') params.set('minCalories', String(minCalories.value))
    if (maxCalories.value != null && maxCalories.value !== '') params.set('maxCalories', String(maxCalories.value))
    if (includeIngredients.value) params.set('includeIngredients', includeIngredients.value)
    if (excludeIngredients.value) params.set('excludeIngredients', excludeIngredients.value)
    if (diet.value) params.set('diet', diet.value)
    if (intolerances.value) params.set('intolerances', intolerances.value)
    if (type.value) params.set('type', type.value)

    const url = `https://api.spoonacular.com/recipes/complexSearch?${params}`
    console.log('[req]', url)
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Spoonacular error ${res.status}: ${await res.text()}`)
    const data = await res.json()

    // strict client title filter (whole-word)
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
      .filter(r => wordRegexes.every(rx => rx.test(r.title)))
      .sort((a, b) => (b.aggregateLikes ?? 0) - (a.aggregateLikes ?? 0))
  } catch (e) {
    console.error(e)
    error.value = e?.message || 'Failed to fetch recipes.'
  } finally {
    loading.value = false
  }
}



</script>