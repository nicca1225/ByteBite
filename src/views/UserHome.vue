<template>
  <div class="home min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
    <!-- Welcome Section -->
    <div class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold mb-2">Welcome back, {{ userName }}! 👋</h1>
            <p class="text-emerald-100 text-lg">Ready to plan your meals for today?</p>
          </div>
          <div class="hidden md:block">
            <div class="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
              <div class="text-3xl font-bold">{{ currentDate }}</div>
              <div class="text-emerald-100 text-sm">{{ currentDay }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Quick Actions -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button class="group bg-white hover:bg-emerald-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-emerald-500 text-left">
            <div class="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span class="text-3xl">🍽️</span>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Plan Meals</h3>
            <p class="text-gray-600 text-sm">Create your weekly meal plan</p>
          </button>

          <button class="group bg-white hover:bg-blue-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 text-left">
            <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span class="text-3xl">🔍</span>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Find Recipes</h3>
            <p class="text-gray-600 text-sm">Discover new meal ideas</p>
          </button>

          <button class="group bg-white hover:bg-purple-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-500 text-left">
            <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span class="text-3xl">🛒</span>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Shopping List</h3>
            <p class="text-gray-600 text-sm">View your grocery list</p>
          </button>

          <button class="group bg-white hover:bg-orange-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-orange-500 text-left">
            <div class="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span class="text-3xl">💰</span>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Budget Tracker</h3>
            <p class="text-gray-600 text-sm">Monitor your spending</p>
          </button>
        </div>
      </div>

      <!-- Stats Overview -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Your Stats This Week</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
            <div class="flex items-center justify-between mb-2">
              <span class="text-emerald-100">Meals Planned</span>
              <span class="text-2xl">📊</span>
            </div>
            <div class="text-4xl font-bold">12</div>
            <div class="text-emerald-100 text-sm mt-2">+3 from last week</div>
          </div>

          <div class="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg">
            <div class="flex items-center justify-between mb-2">
              <span class="text-blue-100">Recipes Saved</span>
              <span class="text-2xl">⭐</span>
            </div>
            <div class="text-4xl font-bold">24</div>
            <div class="text-blue-100 text-sm mt-2">In your collection</div>
          </div>

          <div class="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
            <div class="flex items-center justify-between mb-2">
              <span class="text-purple-100">Money Saved</span>
              <span class="text-2xl">💵</span>
            </div>
            <div class="text-4xl font-bold">$87</div>
            <div class="text-purple-100 text-sm mt-2">This month</div>
          </div>

          <div class="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-lg">
            <div class="flex items-center justify-between mb-2">
              <span class="text-orange-100">Calories/Day</span>
              <span class="text-2xl">🔥</span>
            </div>
            <div class="text-4xl font-bold">2,100</div>
            <div class="text-orange-100 text-sm mt-2">Average intake</div>
          </div>
        </div>
      </div>

      <!-- Upcoming Meals -->
      <div class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Your Meal Plan This Week</h2>
          <button class="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center space-x-2">
            <span>View All</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Meal Card 1 -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div class="h-48 bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <span class="text-6xl">🥗</span>
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">Lunch</span>
                <span class="text-sm text-gray-500">Today</span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Caesar Salad Bowl</h3>
              <p class="text-gray-600 text-sm mb-4">Fresh greens, grilled chicken, parmesan</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <span>⏱️ 15 min</span>
                  <span>🔥 450 cal</span>
                </div>
                <button class="text-emerald-600 hover:text-emerald-700 font-semibold">View →</button>
              </div>
            </div>
          </div>

          <!-- Meal Card 2 -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div class="h-48 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
              <span class="text-6xl">🍝</span>
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">Dinner</span>
                <span class="text-sm text-gray-500">Today</span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Spaghetti Carbonara</h3>
              <p class="text-gray-600 text-sm mb-4">Classic Italian pasta with bacon & egg</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <span>⏱️ 25 min</span>
                  <span>🔥 680 cal</span>
                </div>
                <button class="text-emerald-600 hover:text-emerald-700 font-semibold">View →</button>
              </div>
            </div>
          </div>

          <!-- Meal Card 3 -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div class="h-48 bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
              <span class="text-6xl">🥞</span>
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">Breakfast</span>
                <span class="text-sm text-gray-500">Tomorrow</span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Protein Pancakes</h3>
              <p class="text-gray-600 text-sm mb-4">Fluffy pancakes with berries & maple syrup</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <span>⏱️ 20 min</span>
                  <span>🔥 380 cal</span>
                </div>
                <button class="text-emerald-600 hover:text-emerald-700 font-semibold">View →</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tips & Recommendations -->
      <div class="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white">
        <div class="flex items-start space-x-4">
          <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
            <span class="text-2xl">💡</span>
          </div>
          <div>
            <h3 class="text-2xl font-bold mb-3">Pro Tip of the Day</h3>
            <p class="text-emerald-100 text-lg mb-4">
              Meal prep on Sundays! Preparing your ingredients in advance can save you up to 5 hours during the week and reduce food waste by 30%.
            </p>
            <button class="bg-white text-emerald-600 hover:bg-emerald-50 px-6 py-3 rounded-xl font-semibold transition-colors duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'UserHome',
  setup() {
    const authStore = useAuthStore()

    const userName = computed(() => {
      const name = authStore.userName
      return name.split(' ')[0] || 'there'
    })

    const currentDate = ref(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
    const currentDay = ref(new Date().toLocaleDateString('en-US', { weekday: 'long' }))

    return {
      userName,
      currentDate,
      currentDay
    }
  }
}
</script>
