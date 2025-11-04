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
    console.log('🔐 Auth check - isAuthenticated:', authStore.isAuthenticated)
    console.log('👤 User email:', authStore.userEmail)

    if (!authStore.isAuthenticated) {
      console.warn('⚠️ User not authenticated, skipping load')
      return
    }

    isLoading.value = true
    error.value = null

    try {
      // Set up real-time listener FIRST for instant updates
      // This will keep the data in sync continuously
      setupRealtimeListener(authStore.userEmail)

      // Then do initial load as fallback (in case listener hasn't fired yet)
      console.log('📥 Starting loadFavouriteRecipes...')
      const loadedRecipes = await loadFavouriteRecipes(authStore.userEmail)
      console.log('📥 Loaded recipes from DB:', loadedRecipes)

      // Always use the loaded recipes - it's more reliable than waiting for listener
      if (favourites.value.length === 0 && loadedRecipes.length > 0) {
        console.log('⏳ Setting initial load data')
        favourites.value = loadedRecipes
      }
      console.log('✅ Favourites state final:', favourites.value)

      // Wait a bit for real-time listener to fire and take over
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (err) {
      error.value = `Failed to load favourites: ${err.message}`
      console.error('❌ Error loading favourites:', err)
    } finally {
      isLoading.value = false
      console.log('🏁 Loading complete. Final state:', favourites.value.length)
    }
  }

  // Set up real-time listener for favourites
  function setupRealtimeListener(userEmail) {
    console.log('🔔 Setting up real-time listener for:', userEmail)

    // Unsubscribe from previous listener if exists
    if (unsubscribe) {
      console.log('🔕 Unsubscribing from previous listener')
      unsubscribe()
    }

    try {
      const favouritesCol = collection(db, 'users', userEmail, 'favouriteRecipes')
      console.log('📍 Listening to collection:', `users/${userEmail}/favouriteRecipes`)

      unsubscribe = onSnapshot(favouritesCol, (snapshot) => {
        console.log('🔄 Real-time listener snapshot received, docs count:', snapshot.docs.length)

        const updatedFavourites = []
        snapshot.forEach((doc) => {
          const data = doc.data()
          console.log('📄 Processing doc:', doc.id, 'data:', data)

          updatedFavourites.push({
            id: data.id,
            title: data.title,
            image: data.image,
            readyInMinutes: data.readyInMinutes,
            aggregateLikes: data.aggregateLikes || 0
          })
        })

        console.log('📊 Transformed favourites:', updatedFavourites)
        favourites.value = updatedFavourites
        console.log('✅ Favourites updated in real-time:', updatedFavourites.length)
      })
    } catch (err) {
      console.error('❌ Error setting up real-time listener:', err)
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
