<!-- src/views/FindRecipes.vue -->
<template>
  <main class="min-h-screen bg-black">
    <!-- INITIAL (centered) -->
    <section v-if="!hasSearched" class="min-h-[80vh] flex items-center justify-center px-4">
      <div class="w-full max-w-3xl">
        <div class="text-center mb-8">
          <div class="inline-block mb-4">
            <span class="text-xs font-mono uppercase tracking-wider text-yellow-400/80 bg-yellow-400/10 px-3 py-1.5 rounded-full border border-yellow-400/20">
              Recipe Search
            </span>
          </div>
          <h1 class="text-4xl sm:text-5xl font-light text-white mb-4">Find Recipes</h1>
          <p class="text-gray-400 font-light">Discover delicious recipes tailored to your taste</p>
        </div>

        <form @submit.prevent="onSearch" class="flex gap-3 mb-6">
          <input
            v-model.trim="query"
            type="text"
            placeholder="Search recipes… e.g. chicken, tofu, pasta"
            class="flex-1 p-4 bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl text-white placeholder-gray-500 focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors"
          />
            <button
                class="px-8 py-4 rounded-xl font-medium border border-gray-800 bg-yellow-400 text-black hover:bg-yellow-300 transition-colors disabled:opacity-50"
                :disabled="loading || !apiKey"
            >
                {{ loading ? 'Searching…' : 'Search' }}
            </button>
        </form>

        <p v-if="!apiKey" class="text-center bg-red-900/20 border border-red-500/30 text-red-300 p-4 rounded-xl text-sm">
          Missing API key. Set <code class="bg-black/50 px-2 py-1 rounded">VITE_SPOONACULAR_API_KEY</code> in your <code class="bg-black/50 px-2 py-1 rounded">.env</code>.
        </p>
      </div>
    </section>

    <!-- AFTER SEARCH (top bar + results) -->
    <section v-else class="px-4 py-8">
      <!-- sticky/top search bar -->
      <div class="sticky top-0 z-10 bg-black/95 backdrop-blur-xl border-b border-gray-800/50 -mx-4 px-4 py-4 mb-8">
        <form @submit.prevent="onSearch" class="max-w-6xl mx-auto flex gap-3">
          <input
            v-model.trim="query"
            type="text"
            placeholder="Search recipes…"
            class="flex-1 p-3 bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl text-white placeholder-gray-500 focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors"
          />
          <button
                type="button"
                @click="refreshResults"
                class="w-12 h-12 rounded-xl border border-gray-700 hover:border-yellow-400/50 text-gray-400 hover:text-yellow-400 flex items-center justify-center transition-colors disabled:opacity-50"
                :disabled="loading || !apiKey || !query"
                title="Refresh results"
            >
                <svg class="w-5 h-5" :class="{'animate-spin': loading}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
            </button>
          <button
                type="submit"
                class="px-8 py-3 rounded-xl font-medium bg-yellow-400 text-black hover:bg-yellow-300 transition-colors disabled:opacity-50"
                :disabled="loading || !apiKey"
            >
                {{ loading ? 'Searching…' : 'Search' }}
            </button>
        </form>
      </div>

      <!-- messages -->
      <div class="max-w-6xl mx-auto">
        <div v-if="error" class="bg-red-900/20 border border-red-500/30 text-red-300 p-4 rounded-xl mb-6 text-sm">{{ error }}</div>

        <div v-if="loading" class="flex justify-center py-20">
          <div class="spinner" aria-label="Loading"></div>
        </div>

        <p v-if="!loading && searched && results.length === 0" class="text-center text-gray-500 mt-12">
          <span class="text-sm font-light">No recipes found. Try a different keyword.</span>
        </p>

        <!-- results grid -->
        <div v-if="!loading && results.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <article
            v-for="r in results"
            :key="r.id"
            class="group bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 rounded-xl overflow-hidden flex flex-col transition-all duration-300"
          >
            <div class="relative overflow-hidden">
              <img :src="r.image" :alt="r.title" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div class="p-5 flex flex-col flex-1">
              <h3 class="font-medium text-lg text-white line-clamp-2 mb-3">{{ r.title }}</h3>
              <div class="mt-auto">
                <div class="flex items-center gap-4 text-xs text-gray-500 font-mono mb-4">
                  <span>{{ r.readyInMinutes ?? '?' }}min</span>
                  <span v-if="typeof r.aggregateLikes === 'number'">{{ r.aggregateLikes }} likes</span>
                </div>
                <router-link
                  :to="{ name: 'recipe-detail', params: { id: r.id } }"
                  @click="saveStateBeforeNavigate"
                  class="block text-center rounded-lg px-4 py-2.5 bg-yellow-400 text-black font-medium hover:bg-yellow-300 transition-colors"
                >View Recipe</router-link>
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
const searched = ref(initialState?.searched || false)
const hasSearched = ref(initialState?.hasSearched || false)

// Clear the navigation flag after reading it
if (isNavigatingBack) {
  sessionStorage.removeItem('navigatingBack')
}

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

  // Save state to sessionStorage after successful search
  saveState()
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

// Save current state to sessionStorage
function saveState() {
  const state = {
    query: query.value,
    results: results.value,
    searched: searched.value,
    hasSearched: hasSearched.value
  }
  sessionStorage.setItem('findRecipesState', JSON.stringify(state))
}

// Save state and scroll position before navigating to recipe detail
function saveStateBeforeNavigate() {
  const state = {
    query: query.value,
    results: results.value,
    searched: searched.value,
    hasSearched: hasSearched.value,
    scrollPosition: window.scrollY
  }
  sessionStorage.setItem('findRecipesState', JSON.stringify(state))
}

// Save state when navigating away
onBeforeUnmount(() => {
  saveState()
})

// Restore scroll position if returning to page
onMounted(() => {
  if (initialState?.scrollPosition) {
    setTimeout(() => {
      window.scrollTo(0, initialState.scrollPosition)
    }, 100)
  }
})

// Save scroll position before leaving
window.addEventListener('beforeunload', () => {
  if (hasSearched.value) {
    const state = JSON.parse(sessionStorage.getItem('findRecipesState') || '{}')
    state.scrollPosition = window.scrollY
    sessionStorage.setItem('findRecipesState', JSON.stringify(state))
  }
})
</script>