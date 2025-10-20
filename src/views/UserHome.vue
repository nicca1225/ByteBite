<template>
  <div class="home min-h-screen bg-black">
    <!-- Welcome Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <div class="relative overflow-hidden rounded-2xl border border-gray-800/50 bg-gradient-to-br from-gray-900 to-black">
        <!-- Background Image -->
        <div class="absolute inset-0 rounded-2xl overflow-hidden">
          <img
            src="/salt.png"
            alt="Background"
            class="w-full h-full object-cover opacity-50"
          />
          <!-- Gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-transparent"></div>
        </div>

        <div class="relative z-10 px-8 sm:px-12 py-28">
          <div class="flex items-center justify-between">
            <div>
              <div class="inline-block mb-4">
                <span class="text-xs font-mono uppercase tracking-wider text-yellow-400/80 bg-yellow-400/10 px-3 py-1.5 rounded-full border border-yellow-400/20">
                  Dashboard
                </span>
              </div>
              <h1 class="text-5xl sm:text-6xl font-light mb-3 text-white">
                Welcome back, <span class="font-semibold">{{ userName }}</span>
              </h1>
              <p class="text-gray-400 text-xl font-light">Your personalized nutrition hub</p>
            </div>
            <div class="hidden md:block">
              <div class="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-xl px-6 py-4">
                <div class="text-sm font-mono text-gray-500 uppercase tracking-wider mb-1">{{ currentDay }}</div>
                <div class="text-3xl font-light text-white">{{ currentDate }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Quick Actions -->
      <div class="mb-16">
        <h2 class="text-2xl font-light text-white mb-8">Quick Actions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-6 rounded-xl transition-all duration-300 text-left overflow-hidden"
            @click="$router.push('/plan-meal')"
          >
            <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
            <div class="relative">
              <div class="w-12 h-12 border border-gray-700 rounded-lg flex items-center justify-center mb-4 group-hover:border-yellow-400/50 transition-colors">
                <svg class="w-6 h-6 text-gray-400 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-base font-medium text-white mb-1">Plan Meals</h3>
              <p class="text-gray-500 text-sm font-light">Create your weekly schedule</p>
            </div>
          </button>

          <button
            class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-6 rounded-xl transition-all duration-300 text-left overflow-hidden"
            @click="$router.push('/calorie-tracker')"
          >
            <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
            <div class="relative">
              <div class="w-12 h-12 border border-gray-700 rounded-lg flex items-center justify-center mb-4 group-hover:border-yellow-400/50 transition-colors">
                <svg class="w-6 h-6 text-gray-400 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 class="text-base font-medium text-white mb-1">Calorie Tracker</h3>
              <p class="text-gray-500 text-sm font-light">Monitor daily nutrition</p>
            </div>
          </button>

          <button
            class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-6 rounded-xl transition-all duration-300 text-left overflow-hidden"
            @click="$router.push('/find-recipes')"
          >
            <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
            <div class="relative">
              <div class="w-12 h-12 border border-gray-700 rounded-lg flex items-center justify-center mb-4 group-hover:border-yellow-400/50 transition-colors">
                <svg class="w-6 h-6 text-gray-400 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <h3 class="text-base font-medium text-white mb-1">Find Recipes</h3>
              <p class="text-gray-500 text-sm font-light">Explore meal options</p>
            </div>
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
          </button>
        </div>
      </div>

      <!-- Stats Overview -->
      <div class="mb-16">
        <h2 class="text-2xl font-light text-white mb-8">Analytics Overview</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm font-mono uppercase tracking-wider text-gray-500">Meals Planned</span>
            </div>
            <div class="text-4xl font-light text-white mb-2">12</div>
            <div class="flex items-center gap-2">
              <span class="text-green-400 text-sm font-mono">+25%</span>
              <span class="text-gray-600 text-sm">vs last week</span>
            </div>
          </div>

          <div class="bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm font-mono uppercase tracking-wider text-gray-500">Recipes Saved</span>
            </div>
            <div class="text-4xl font-light text-white mb-2">24</div>
            <div class="flex items-center gap-2">
              <span class="text-gray-600 text-sm">In collection</span>
            </div>
          </div>

          <div class="bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm font-mono uppercase tracking-wider text-gray-500">Money Saved</span>
            </div>
            <div class="text-4xl font-light text-white mb-2">$87</div>
            <div class="flex items-center gap-2">
              <span class="text-gray-600 text-sm">This month</span>
            </div>
          </div>

          <div class="bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm font-mono uppercase tracking-wider text-gray-500">Avg Calories</span>
            </div>
            <div class="text-4xl font-light text-white mb-2">2,100</div>
            <div class="flex items-center gap-2">
              <span class="text-gray-600 text-sm">Per day</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Meals -->
      <div class="mb-16">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-light text-white">Scheduled Meals</h2>
          <button class="text-sm text-gray-400 hover:text-yellow-400 font-mono uppercase tracking-wider flex items-center gap-2 transition-colors">
            <span>View All</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Meal Card 1 -->
          <div class="group bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl overflow-hidden hover:border-yellow-400/30 transition-all duration-300">
            <div class="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent"></div>
              <svg class="w-16 h-16 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div class="p-5">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs font-mono uppercase tracking-wider text-yellow-400/80 bg-yellow-400/10 px-2 py-1 rounded border border-yellow-400/20">Lunch</span>
                <span class="text-xs text-gray-500 font-mono">Today</span>
              </div>
              <h3 class="text-lg font-medium text-white mb-2">Caesar Salad Bowl</h3>
              <p class="text-gray-500 text-sm mb-4 font-light">Fresh greens, grilled chicken, parmesan</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4 text-xs text-gray-500 font-mono">
                  <span>15min</span>
                  <span>450cal</span>
                </div>
                <button class="text-yellow-400 hover:text-yellow-300 text-sm font-mono transition-colors">View</button>
              </div>
            </div>
          </div>

          <!-- Meal Card 2 -->
          <div class="group bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl overflow-hidden hover:border-yellow-400/30 transition-all duration-300">
            <div class="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent"></div>
              <svg class="w-16 h-16 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div class="p-5">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs font-mono uppercase tracking-wider text-yellow-400/80 bg-yellow-400/10 px-2 py-1 rounded border border-yellow-400/20">Dinner</span>
                <span class="text-xs text-gray-500 font-mono">Today</span>
              </div>
              <h3 class="text-lg font-medium text-white mb-2">Spaghetti Carbonara</h3>
              <p class="text-gray-500 text-sm mb-4 font-light">Classic Italian pasta with bacon & egg</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4 text-xs text-gray-500 font-mono">
                  <span>25min</span>
                  <span>680cal</span>
                </div>
                <button class="text-yellow-400 hover:text-yellow-300 text-sm font-mono transition-colors">View</button>
              </div>
            </div>
          </div>

          <!-- Meal Card 3 -->
          <div class="group bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl overflow-hidden hover:border-yellow-400/30 transition-all duration-300">
            <div class="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent"></div>
              <svg class="w-16 h-16 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div class="p-5">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs font-mono uppercase tracking-wider text-yellow-400/80 bg-yellow-400/10 px-2 py-1 rounded border border-yellow-400/20">Breakfast</span>
                <span class="text-xs text-gray-500 font-mono">Tomorrow</span>
              </div>
              <h3 class="text-lg font-medium text-white mb-2">Protein Pancakes</h3>
              <p class="text-gray-500 text-sm mb-4 font-light">Fluffy pancakes with berries & maple syrup</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4 text-xs text-gray-500 font-mono">
                  <span>20min</span>
                  <span>380cal</span>
                </div>
                <button class="text-yellow-400 hover:text-yellow-300 text-sm font-mono transition-colors">View</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tips & Recommendations -->
      <div class="bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl p-8">
        <div class="flex items-start gap-6">
          <div class="w-12 h-12 border border-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-3">
              <h3 class="text-xl font-medium text-white">Nutrition Insight</h3>
              <span class="text-xs font-mono uppercase tracking-wider text-gray-500 bg-gray-800 px-2 py-1 rounded">Daily</span>
            </div>
            <p class="text-gray-400 mb-6 leading-relaxed font-light">
              Meal prep on Sundays can save up to 5 hours during the week and reduce food waste by 30%. Consider batch cooking proteins and portioning vegetables in advance.
            </p>
            <button class="text-sm font-mono uppercase tracking-wider text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-2">
              <span>Learn More</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
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
