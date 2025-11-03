import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  loadFavouriteRecipes,
  addFavouriteRecipe,
  removeFavouriteRecipe,
  isFavouriteRecipe
} from '@/utils/firestoreUtils'
import { useAuthStore } from './auth'
import { getFirestore, collection, onSnapshot, query, where } from 'firebase/firestore'

export const useFavouritesStore = defineStore('favourites', () => {
  const db = getFirestore()

  // State
  const favourites = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  let unsubscribe = null

  // Getters
  const favouriteCount = computed(() => favourites.value.length)
  const isFavouritesEmpty = computed(() => favourites.value.length === 0)

  // Get recipe IDs for quick lookup
  const favouriteIds = computed(() => new Set(favourites.value.map(f => f.id)))

  // Actions
  async function loadFavourites() {
    const authStore = useAuthStore()
    if (!authStore.isAuthenticated) return

    isLoading.value = true
    error.value = null

    try {
      // Initial load
      favourites.value = await loadFavouriteRecipes(authStore.userEmail)

      // Set up real-time listener for instant updates
      setupRealtimeListener(authStore.userEmail)
    } catch (err) {
      error.value = `Failed to load favourites: ${err.message}`
      console.error('Error loading favourites:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Set up real-time listener for favourites
  function setupRealtimeListener(userEmail) {
    // Unsubscribe from previous listener if exists
    if (unsubscribe) {
      unsubscribe()
    }

    try {
      const favouritesCol = collection(db, 'users', userEmail, 'favourites')
      unsubscribe = onSnapshot(favouritesCol, (snapshot) => {
        const updatedFavourites = []
        snapshot.forEach((doc) => {
          const data = doc.data()
          updatedFavourites.push({
            id: data.recipeId,
            title: data.title,
            image: data.image,
            readyInMinutes: data.readyInMinutes,
            aggregateLikes: data.aggregateLikes || 0
          })
        })
        favourites.value = updatedFavourites
        console.log('✅ Favourites updated in real-time:', updatedFavourites.length)
      })
    } catch (err) {
      console.error('Error setting up real-time listener:', err)
    }
  }

  async function addFavourite(recipe) {
    const authStore = useAuthStore()
    if (!authStore.isAuthenticated) throw new Error('User not authenticated')

    isLoading.value = true
    error.value = null

    try {
      await addFavouriteRecipe(authStore.userEmail, recipe)
      // Add to local state
      if (!favouriteIds.value.has(recipe.id)) {
        favourites.value.push(recipe)
      }
    } catch (err) {
      error.value = `Failed to add favourite: ${err.message}`
      console.error('Error adding favourite:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function removeFavourite(recipeId) {
    const authStore = useAuthStore()
    if (!authStore.isAuthenticated) throw new Error('User not authenticated')

    isLoading.value = true
    error.value = null

    try {
      await removeFavouriteRecipe(authStore.userEmail, recipeId)
      // Remove from local state
      favourites.value = favourites.value.filter(f => f.id !== recipeId)
    } catch (err) {
      error.value = `Failed to remove favourite: ${err.message}`
      console.error('Error removing favourite:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function toggleFavourite(recipe) {
    if (favouriteIds.value.has(recipe.id)) {
      await removeFavourite(recipe.id)
    } else {
      await addFavourite(recipe)
    }
  }

  async function isFavourite(recipeId) {
    const authStore = useAuthStore()
    if (!authStore.isAuthenticated) return false

    try {
      return await isFavouriteRecipe(authStore.userEmail, recipeId)
    } catch (err) {
      console.error('Error checking favourite status:', err)
      return false
    }
  }

  function clearError() {
    error.value = null
  }

  return {
    // State
    favourites,
    isLoading,
    error,
    // Getters
    favouriteCount,
    isFavouritesEmpty,
    favouriteIds,
    // Actions
    loadFavourites,
    addFavourite,
    removeFavourite,
    toggleFavourite,
    isFavourite,
    clearError
  }
})
