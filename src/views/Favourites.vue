<!-- src/views/Favourites.vue -->
<template>
  <main class="min-h-screen bg-black">
    <!-- HEADER -->
    <section class="px-4 py-12 border-b border-gray-800/50">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center gap-4 mb-4">
          <RouterLink
            to="/find-recipes"
            class="w-10 h-10 rounded-lg border border-gray-800/50 hover:border-yellow-400/50 text-gray-400 hover:text-yellow-400 flex items-center justify-center transition-colors"
            title="Back to Find Recipes"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </RouterLink>
          <div>
            <div class="inline-block mb-2">
              <span class="text-xs font-mono uppercase tracking-wider text-yellow-400/80 bg-yellow-400/10 px-3 py-1.5 rounded-full border border-yellow-400/20">
                Your Collection
              </span>
            </div>
            <h1 class="text-4xl sm:text-5xl font-light text-white">Favourite Recipes</h1>
          </div>
        </div>
        <p class="text-gray-400 font-light">
          {{ favouriteCount }} {{ favouriteCount === 1 ? 'recipe' : 'recipes' }} saved
        </p>
      </div>
    </section>

    <!-- CONTENT -->
    <section class="px-4 py-8">
      <div class="max-w-6xl mx-auto">
        <!-- Loading state -->
        <div v-if="isLoading" class="flex justify-center py-20">
          <div class="w-12 h-12 border-4 border-gray-800 border-t-yellow-400 rounded-full animate-spin" aria-label="Loading"></div>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="bg-red-900/20 border border-red-500/30 text-red-300 p-4 rounded-xl mb-6 text-sm font-light">
          {{ error }}
        </div>

        <!-- Empty state -->
        <div v-else-if="isFavouritesEmpty" class="text-center py-20">
          <div class="mb-4">
            <svg class="w-16 h-16 text-gray-700 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 class="text-2xl font-light text-gray-400 mb-2">No Favourites Yet</h2>
          <p class="text-gray-500 mb-6 font-light">Start exploring recipes and add your favorites to get started</p>
          <RouterLink
            to="/find-recipes"
            class="inline-block px-8 py-3 rounded-xl font-medium bg-yellow-400 text-black hover:bg-yellow-300 transition-colors shadow-lg hover:shadow-yellow-400/20"
          >
            Find Recipes
          </RouterLink>
        </div>

        <!-- Favourites grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <article
            v-for="recipe in favourites"
            :key="recipe.id"
            class="group rounded-xl overflow-hidden border border-gray-800/50 bg-gradient-to-br from-gray-900 to-black flex flex-col hover:border-yellow-400/30 transition-all duration-300"
          >
            <div class="relative overflow-hidden">
              <img :src="recipe.image" :alt="recipe.title" class="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <!-- Favourite badge -->
              <button
                @click="removeFavourite(recipe.id)"
                class="absolute top-3 right-3 rounded-full bg-black/60 backdrop-blur-sm border border-yellow-400/50 p-2 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 shadow-lg"
                title="Remove from favourites"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>
            <div class="p-5 flex flex-col flex-1">
              <h3 class="font-medium text-lg text-white line-clamp-2 mb-3">{{ recipe.title }}</h3>
              <div class="mt-auto">
                <div class="mb-4 text-sm text-gray-400 flex flex-wrap gap-4 font-mono">
                  <span class="flex items-center gap-1">
                    <span class="text-yellow-400">⏱</span> {{ recipe.readyInMinutes ?? '?' }} min
                  </span>
                  <span v-if="typeof recipe.aggregateLikes === 'number'" class="flex items-center gap-1">
                    <span class="text-yellow-400">👍</span> {{ recipe.aggregateLikes }}
                  </span>
                </div>
                <RouterLink
                  :to="{ name: 'recipe-detail', params: { id: recipe.id } }"
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
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useFavouritesStore } from '@/stores/favourites'
import { useAuthStore } from '@/stores/auth'

const favouritesStore = useFavouritesStore()
const authStore = useAuthStore()

const isLoading = favouritesStore.isLoading
const error = favouritesStore.error
const favourites = favouritesStore.favourites
const favouriteCount = favouritesStore.favouriteCount
const isFavouritesEmpty = favouritesStore.isFavouritesEmpty

onMounted(async () => {
  if (authStore.isAuthenticated) {
    await favouritesStore.loadFavourites()
  }
})

async function removeFavourite(recipeId) {
  try {
    await favouritesStore.removeFavourite(recipeId)
  } catch (err) {
    console.error('Failed to remove favourite:', err)
  }
}
</script>
