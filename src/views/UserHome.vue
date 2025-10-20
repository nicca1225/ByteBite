<template>
  <div class="home min-h-screen bg-gradient-to-br from-black to-gray-950">
    <!-- Welcome Section -->
    <div class="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold mb-2">Welcome back, {{ userName }}! 👋</h1>
            <p class="text-gray-900 text-lg">Ready to plan your meals for today?</p>
          </div>
          <div class="hidden md:block">
            <div class="bg-black/20 backdrop-blur-sm rounded-2xl px-6 py-4">
              <div class="text-3xl font-bold">{{ currentDate }}</div>
              <div class="text-gray-900 text-sm">{{ currentDay }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Quick Actions -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-white mb-6">Quick Actions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button class="group bg-gray-900 hover:bg-black p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-yellow-400/30 hover:border-yellow-400 text-left">
            <div class="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span class="text-3xl">🍽️</span>
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Plan Meals</h3>
            <p class="text-gray-300 text-sm">Create your weekly meal plan</p>
          </button>

          <button 
            class="group bg-gray-900 hover:bg-black p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-yellow-400/30 hover:border-yellow-400 text-left" 
            @click="$router.push('/calorie-tracker')"
          >
            <div class="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span class="text-3xl">🔥</span>
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Calorie Tracker</h3>
            <p class="text-gray-300 text-sm">Log your meals and goals</p>
          </button>

          <button
            class="group bg-gray-900 hover:bg-black p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-yellow-400/30 hover:border-yellow-400 text-left"
            @click="$router.push('/find-recipes')"
          >
            <div class="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span class="text-3xl">🔍</span>
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Find Recipes</h3>
            <p class="text-gray-300 text-sm">Discover new meal ideas</p>
          </button>

          <button 
            class="group bg-gray-900 hover:bg-black p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-yellow-400/30 hover:border-yellow-400 text-left"
            @click="$router.push('/shopping-list')"
          >
            <div class="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span class="text-3xl">🛒</span>
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Shopping List</h3>
            <p class="text-gray-300 text-sm">View your grocery list</p>
          </button>

          <button class="group bg-gray-900 hover:bg-black p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-yellow-400/30 hover:border-yellow-400 text-left">
            <div class="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span class="text-3xl">💰</span>
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Budget Tracker</h3>
            <p class="text-gray-300 text-sm">Monitor your spending</p>
          </button>
        </div>
      </div>

      <!-- Stats Overview -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-white mb-6">Your Stats This Week</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-2xl p-6 text-black shadow-lg border-2 border-yellow-400/30">
            <div class="flex items-center justify-between mb-2">
              <span class="text-gray-900">Meals Planned</span>
              <span class="text-2xl">📊</span>
            </div>
            <div class="text-4xl font-bold">12</div>
            <div class="text-gray-900 text-sm mt-2">+3 from last week</div>
          </div>

          <div class="bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-2xl p-6 text-black shadow-lg border-2 border-yellow-400/30">
            <div class="flex items-center justify-between mb-2">
              <span class="text-gray-900">Recipes Saved</span>
              <span class="text-2xl">⭐</span>
            </div>
            <div class="text-4xl font-bold">24</div>
            <div class="text-gray-900 text-sm mt-2">In your collection</div>
          </div>

          <div class="bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-2xl p-6 text-black shadow-lg border-2 border-yellow-400/30">
            <div class="flex items-center justify-between mb-2">
              <span class="text-gray-900">Money Saved</span>
              <span class="text-2xl">💵</span>
            </div>
            <div class="text-4xl font-bold">$87</div>
            <div class="text-gray-900 text-sm mt-2">This month</div>
          </div>

          <div class="bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-2xl p-6 text-black shadow-lg border-2 border-yellow-400/30">
            <div class="flex items-center justify-between mb-2">
              <span class="text-gray-900">Calories/Day</span>
              <span class="text-2xl">🔥</span>
            </div>
            <div class="text-4xl font-bold">2,100</div>
            <div class="text-gray-900 text-sm mt-2">Average intake</div>
          </div>
        </div>
      </div>

      <!-- Upcoming Meals -->
      <div class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-white">Your Meal Plan This Week</h2>
          <button class="text-yellow-400 hover:text-yellow-300 font-semibold flex items-center space-x-2">
            <span>View All</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Meal Card 1 -->
          <div class="bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 border-yellow-400/30">
            <div class="h-48 bg-gradient-to-br from-yellow-400 to-yellow-300 flex items-center justify-center">
              <span class="text-6xl">🥗</span>
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-black bg-yellow-400 px-3 py-1 rounded-full">Lunch</span>
                <span class="text-sm text-gray-400">Today</span>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Caesar Salad Bowl</h3>
              <p class="text-gray-300 text-sm mb-4">Fresh greens, grilled chicken, parmesan</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4 text-sm text-gray-400">
                  <span>⏱️ 15 min</span>
                  <span>🔥 450 cal</span>
                </div>
                <button class="text-yellow-400 hover:text-yellow-300 font-semibold">View →</button>
              </div>
            </div>
          </div>

          <!-- Meal Card 2 -->
          <div class="bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 border-yellow-400/30">
            <div class="h-48 bg-gradient-to-br from-yellow-400 to-yellow-300 flex items-center justify-center">
              <span class="text-6xl">🍝</span>
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-black bg-yellow-400 px-3 py-1 rounded-full">Dinner</span>
                <span class="text-sm text-gray-400">Today</span>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Spaghetti Carbonara</h3>
              <p class="text-gray-300 text-sm mb-4">Classic Italian pasta with bacon & egg</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4 text-sm text-gray-400">
                  <span>⏱️ 25 min</span>
                  <span>🔥 680 cal</span>
                </div>
                <button class="text-yellow-400 hover:text-yellow-300 font-semibold">View →</button>
              </div>
            </div>
          </div>

          <!-- Meal Card 3 -->
          <div class="bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 border-yellow-400/30">
            <div class="h-48 bg-gradient-to-br from-yellow-400 to-yellow-300 flex items-center justify-center">
              <span class="text-6xl">🥞</span>
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-black bg-yellow-400 px-3 py-1 rounded-full">Breakfast</span>
                <span class="text-sm text-gray-400">Tomorrow</span>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Protein Pancakes</h3>
              <p class="text-gray-300 text-sm mb-4">Fluffy pancakes with berries & maple syrup</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4 text-sm text-gray-400">
                  <span>⏱️ 20 min</span>
                  <span>🔥 380 cal</span>
                </div>
                <button class="text-yellow-400 hover:text-yellow-300 font-semibold">View →</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tips & Recommendations -->
      <div class="bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-3xl p-8 text-black border-2 border-yellow-400/30">
        <div class="flex items-start space-x-4">
          <div class="w-12 h-12 bg-black/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
            <span class="text-2xl">💡</span>
          </div>
          <div>
            <h3 class="text-2xl font-bold mb-3">Pro Tip of the Day</h3>
            <p class="text-gray-900 text-lg mb-4">
              Meal prep on Sundays! Preparing your ingredients in advance can save you up to 5 hours during the week and reduce food waste by 30%.
            </p>
            <button class="bg-black text-yellow-400 hover:bg-gray-900 px-6 py-3 rounded-xl font-semibold transition-colors duration-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none">
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
