<template>
  <div class="dashboard">
    <div class="bg-gradient-to-r from-green-500 to-blue-600 text-white p-8 rounded-2xl mb-8">
      <h1 class="text-3xl font-bold mb-2">Welcome back, {{ userName }}!</h1>
      <p class="text-lg opacity-90">Ready to plan your next healthy meal?</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
        <h3 class="text-xl font-semibold text-gray-800 mb-2">🍽️ This Week's Meals</h3>
        <p class="text-gray-600 mb-4">Plan your meals for the upcoming week</p>
        <button class="btn btn-primary w-full">Plan Meals</button>
      </div>
      
      <div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
        <h3 class="text-xl font-semibold text-gray-800 mb-2">🛒 Shopping List</h3>
        <p class="text-gray-600 mb-4">Generate your shopping list</p>
        <button class="btn btn-primary w-full">View List</button>
      </div>
      
      <div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
        <h3 class="text-xl font-semibold text-gray-800 mb-2">💰 Budget Tracker</h3>
        <p class="text-gray-600 mb-4">Track your meal expenses</p>
        <button class="btn btn-primary w-full">View Budget</button>
      </div>
    </div>
    
    <div class="bg-white p-6 rounded-xl shadow-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button class="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors duration-200">
          <div class="text-2xl mb-2">🔍</div>
          <div class="font-semibold">Find Recipes</div>
        </button>
        <button class="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200">
          <div class="text-2xl mb-2">📅</div>
          <div class="font-semibold">Schedule Meals</div>
        </button>
        <button class="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors duration-200">
          <div class="text-2xl mb-2">⚙️</div>
          <div class="font-semibold">Preferences</div>
        </button>
        <button class="p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors duration-200">
          <div class="text-2xl mb-2">📊</div>
          <div class="font-semibold">Analytics</div>
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
