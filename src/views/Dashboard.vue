<template>
  <div class="dashboard max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-gradient-to-r from-gray-900 to-black text-white p-8 rounded-2xl mb-8 border border-yellow-400/30 shadow-lg">
      <h1 class="text-3xl font-bold mb-2 text-yellow-400">Welcome back, {{ userName }}!</h1>
      <p class="text-lg text-gray-300">Ready to plan your next healthy meal?</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div class="bg-gray-900 p-6 rounded-xl shadow-lg border-l-4 border-yellow-400">
        <h3 class="text-xl font-semibold text-yellow-400 mb-2">🍽️ This Week's Meals</h3>
        <p class="text-gray-300 mb-4">Plan your meals for the upcoming week</p>
        <button class="w-full bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">Plan Meals</button>
      </div>

      <div class="bg-gray-900 p-6 rounded-xl shadow-lg border-l-4 border-yellow-400">
        <h3 class="text-xl font-semibold text-yellow-400 mb-2">🛒 Shopping List</h3>
        <p class="text-gray-300 mb-4">Generate your shopping list</p>
        <button class="w-full bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">View List</button>
      </div>

      <div class="bg-gray-900 p-6 rounded-xl shadow-lg border-l-4 border-yellow-400">
        <h3 class="text-xl font-semibold text-yellow-400 mb-2">💰 Budget Tracker</h3>
        <p class="text-gray-300 mb-4">Track your meal expenses</p>
        <button class="w-full bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">View Budget</button>
      </div>
    </div>

    <div class="bg-gray-900 p-6 rounded-xl shadow-lg border border-yellow-400/30">
      <h2 class="text-2xl font-bold text-yellow-400 mb-4">Quick Actions</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button class="p-4 border-2 border-gray-700 bg-black rounded-lg hover:border-yellow-400 hover:bg-gray-800 transition-colors duration-200">
          <div class="text-2xl mb-2">🔍</div>
          <div class="font-semibold text-gray-300">Find Recipes</div>
        </button>
        <button class="p-4 border-2 border-gray-700 bg-black rounded-lg hover:border-yellow-400 hover:bg-gray-800 transition-colors duration-200">
          <div class="text-2xl mb-2">📅</div>
          <div class="font-semibold text-gray-300">Schedule Meals</div>
        </button>
        <button class="p-4 border-2 border-gray-700 bg-black rounded-lg hover:border-yellow-400 hover:bg-gray-800 transition-colors duration-200">
          <div class="text-2xl mb-2">⚙️</div>
          <div class="font-semibold text-gray-300">Preferences</div>
        </button>
        <button class="p-4 border-2 border-gray-700 bg-black rounded-lg hover:border-yellow-400 hover:bg-gray-800 transition-colors duration-200">
          <div class="text-2xl mb-2">📊</div>
          <div class="font-semibold text-gray-300">Analytics</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'Dashboard',
  setup() {
    const authStore = useAuthStore()
    
    const userName = computed(() => authStore.userName)
    
    return {
      userName
    }
  }
}
</script>
