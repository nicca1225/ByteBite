<!-- src/views/FindRecipes.vue -->
<template>
  <main class="min-h-screen">
    <!-- INITIAL (centered) -->
    <section v-if="!hasSearched" class="min-h-[60vh] flex items-center justify-center px-4">
      <div class="w-full max-w-2xl">
        <h1 class="text-3xl sm:text-4xl font-bold text-center mb-6">Find Recipes</h1>

        <form @submit.prevent="onSearch" class="flex gap-3">
          <input
            v-model.trim="query"
            type="text"
            placeholder="Search recipes… e.g. chicken, tofu, pasta"
            class="form-input flex-1"
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
          <input v-model.trim="query" type="text" placeholder="Search recipes…" class="form-input flex-1" style="color: black;" />
          <button
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
      <a
        :href="`https://spoonacular.com/recipes/${encodeURIComponent(r.title)}-${r.id}`"
        target="_blank"
        class="flex-1 text-center rounded-lg px-4 py-2 bg-yellow-500 text-black font-semibold hover:bg-yellow-400"
      >View</a>
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
      query: query.value,
      number: '36',
      addRecipeInformation: 'true', // includes aggregateLikes
      sort: 'popularity',           // most → least popular
      apiKey
    })
    const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?${params}`)
    if (!res.ok) throw new Error(`Spoonacular error ${res.status}: ${await res.text()}`)
    const data = await res.json()

    // Fallback client sort by popularity just in case
    results.value = (data.results || [])
      .map(r => ({
        id: r.id,
        title: r.title,
        image: r.image,
        readyInMinutes: r.readyInMinutes ?? null,
        aggregateLikes: typeof r.aggregateLikes === 'number' ? r.aggregateLikes : null
      }))
      .sort((a, b) => (b.aggregateLikes ?? 0) - (a.aggregateLikes ?? 0))
  } catch (e) {
    console.error(e)
    error.value = e?.message || 'Failed to fetch recipes.'
  } finally {
    loading.value = false
  }
}
</script>