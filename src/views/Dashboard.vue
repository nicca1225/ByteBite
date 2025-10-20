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

      <div class="group bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl shadow-lg border border-gray-800/50 hover:border-yellow-400/30 transition-all duration-300">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-10 h-10 border border-gray-700 rounded-lg flex items-center justify-center group-hover:border-yellow-400/50 transition-colors">
            <svg class="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-yellow-400">Shopping List</h3>
        </div>
        <p class="text-gray-300 mb-4 font-light">Generate your shopping list</p>
        <button class="w-full bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-yellow-400/20">View List</button>
      </div>

      <div class="group bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl shadow-lg border border-gray-800/50 hover:border-yellow-400/30 transition-all duration-300">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-10 h-10 border border-gray-700 rounded-lg flex items-center justify-center group-hover:border-yellow-400/50 transition-colors">
            <svg class="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-yellow-400">Budget Tracker</h3>
        </div>
        <p class="text-gray-300 mb-4 font-light">Track your meal expenses</p>
        <button class="w-full bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-yellow-400/20">View Budget</button>
      </div>
    </div>

    <div class="bg-gray-900 p-6 rounded-xl shadow-lg border border-yellow-400/30">
      <h2 class="text-2xl font-bold text-yellow-400 mb-4">Quick Actions</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button class="p-4 border-2 border-gray-700 bg-black rounded-lg hover:border-yellow-400 hover:bg-gray-800 transition-colors duration-200" 
        @click="$router.push('/find-recipes')">
          <div class="text-2xl mb-2">🔍</div>
          <div class="font-semibold text-gray-300">Find Recipes</div>
        </button>
        <button class="p-4 border-2 border-gray-700 bg-black rounded-lg hover:border-yellow-400 hover:bg-gray-800 transition-colors duration-200" 
        @click="$router.push('/calorie-tracker')">
          <div class="text-2xl mb-2">🔥</div>
          <div class="font-semibold text-gray-300">Calorie Tracker</div>
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
