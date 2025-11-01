<template>
  <div class="bg-black min-h-screen">
    <!-- ========== HERO SECTION ========== -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <div class="relative overflow-hidden rounded-3xl border border-gray-800/50 bg-gradient-to-br from-gray-900/80 via-black/60 to-gray-900/80 backdrop-blur-xl">
        <!-- Animated gradient glow effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-amber-400/5 to-yellow-400/10 animate-pulse-slow"></div>

        <!-- Particle effect background -->
        <div class="absolute inset-0">
          <div class="absolute top-10 left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl animate-float"></div>
          <div class="absolute bottom-10 right-10 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl animate-float-delayed"></div>
          <div class="absolute top-1/2 left-1/3 w-24 h-24 bg-yellow-400/5 rounded-full blur-2xl animate-float-slow"></div>
        </div>

        <!-- Content -->
        <div class="relative z-10 px-8 sm:px-12 py-20 animate-fade-in-up">
          <div>
            <h1 class="text-5xl sm:text-6xl font-light mb-3 text-white animate-slide-in-delayed">
              Welcome back, <span class="font-semibold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent">{{ userName }}</span>!
            </h1>
            <p class="text-gray-400 text-xl font-light animate-slide-in-delayed-more">Ready to plan your next healthy meal?</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== MAIN CONTENT WRAPPER ========== -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

      <!-- ========== FEATURED CARDS ========== -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- This Week's Meals - Featured -->
        <div class="group relative bg-gradient-to-br from-gray-900 to-black border border-yellow-400/30 hover:border-yellow-400/60 p-6 rounded-2xl transition-all duration-300 overflow-hidden hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-400/20">
          <div class="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/5 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="absolute top-0 right-0 w-20 h-20 bg-yellow-400/10 rounded-full blur-2xl group-hover:bg-yellow-400/20 transition-all duration-300"></div>

          <div class="relative">
            <div class="text-4xl mb-4">🍽️</div>
            <h3 class="text-xl font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">This Week's Meals</h3>
            <p class="text-gray-400 text-sm font-light mb-6">Plan your meals for the upcoming week</p>

            <!-- Pulse indicator -->
            <div class="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
            <div class="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full"></div>

            <button
              @click="$router.push('/plan-meal')"
              class="w-full bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-yellow-400/30"
            >
              Plan Meals
            </button>
          </div>
        </div>

        <!-- Shopping List -->
        <div class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-6 rounded-2xl transition-all duration-300 overflow-hidden hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-400/10">
          <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
          <div class="absolute top-0 right-0 w-16 h-16 bg-gray-700/10 rounded-full blur-2xl group-hover:bg-yellow-400/10 transition-all duration-300"></div>

          <div class="relative">
            <div class="w-12 h-12 border border-gray-700 rounded-xl flex items-center justify-center mb-4 group-hover:border-yellow-400/50 group-hover:scale-110 transition-all duration-300">
              <svg class="w-6 h-6 text-gray-400 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">Shopping List</h3>
            <p class="text-gray-400 text-sm font-light mb-6">Generate your shopping list</p>

            <button
              @click="$router.push('/shopping-list')"
              class="w-full bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-yellow-400/30"
            >
              View List
            </button>
          </div>
        </div>

        <!-- Budget Tracker -->
        <div class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-6 rounded-2xl transition-all duration-300 overflow-hidden hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-400/10">
          <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
          <div class="absolute top-0 right-0 w-16 h-16 bg-gray-700/10 rounded-full blur-2xl group-hover:bg-yellow-400/10 transition-all duration-300"></div>

          <div class="relative">
            <div class="w-12 h-12 border border-gray-700 rounded-xl flex items-center justify-center mb-4 group-hover:border-yellow-400/50 group-hover:scale-110 transition-all duration-300">
              <svg class="w-6 h-6 text-gray-400 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">Budget Tracker</h3>
            <p class="text-gray-400 text-sm font-light mb-6">Track your meal expenses</p>

            <button
              @click="$router.push('/budget-tracker')"
              class="w-full bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-yellow-400/30"
            >
              View Budget
            </button>
          </div>
        </div>
      </div>

      <!-- ========== QUICK ACTIONS ========== -->
      <div class="bg-gray-900/40 backdrop-blur-lg rounded-3xl p-8 border border-gray-800/30">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl font-light text-white mb-2">Quick Actions</h2>
            <p class="text-gray-500 text-sm font-light">Jump back in where you left off</p>
          </div>
          <div class="w-10 h-10 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
            <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <button
            class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-4 rounded-xl transition-all duration-300 text-center overflow-hidden hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/10"
            @click="$router.push('/find-recipes')"
          >
            <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
            <div class="relative">
              <div class="text-3xl mb-2">🔍</div>
              <div class="font-semibold text-gray-300 group-hover:text-yellow-400 transition-colors text-sm">Find Recipes</div>
            </div>
          </button>

          <button
            class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-4 rounded-xl transition-all duration-300 text-center overflow-hidden hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/10"
            @click="$router.push('/calorie-tracker')"
          >
            <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
            <div class="relative">
              <div class="text-3xl mb-2">🔥</div>
              <div class="font-semibold text-gray-300 group-hover:text-yellow-400 transition-colors text-sm">Calorie Tracker</div>
            </div>
          </button>

          <button class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-4 rounded-xl transition-all duration-300 text-center overflow-hidden hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/10">
            <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
            <div class="relative">
              <div class="text-3xl mb-2">📅</div>
              <div class="font-semibold text-gray-300 group-hover:text-yellow-400 transition-colors text-sm">Schedule Meals</div>
            </div>
          </button>

          <button class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-4 rounded-xl transition-all duration-300 text-center overflow-hidden hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/10">
            <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
            <div class="relative">
              <div class="text-3xl mb-2">⚙️</div>
              <div class="font-semibold text-gray-300 group-hover:text-yellow-400 transition-colors text-sm">Preferences</div>
            </div>
          </button>

          <button
            class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-4 rounded-xl transition-all duration-300 text-center overflow-hidden hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/10"
            @click="$router.push('/budget-tracker')"
          >
            <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
            <div class="relative">
              <div class="text-3xl mb-2">💰</div>
              <div class="font-semibold text-gray-300 group-hover:text-yellow-400 transition-colors text-sm">Budget Tracker</div>
            </div>
          </button>

          <button class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-4 rounded-xl transition-all duration-300 text-center overflow-hidden hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/10">
            <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
            <div class="relative">
              <div class="text-3xl mb-2">📊</div>
              <div class="font-semibold text-gray-300 group-hover:text-yellow-400 transition-colors text-sm">Analytics</div>
            </div>
          </button>
        </div>
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

<style scoped>
/* ========== CUSTOM ANIMATIONS ========== */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out;
}

.animate-slide-in {
  animation: slide-in 0.6s ease-out;
}

.animate-slide-in-delayed {
  animation: slide-in 0.8s ease-out;
}

.animate-slide-in-delayed-more {
  animation: slide-in 1s ease-out;
}

.animate-fade-in {
  animation: fade-in-up 1s ease-out;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float 8s ease-in-out infinite;
  animation-delay: 1s;
}

.animate-float-slow {
  animation: float 10s ease-in-out infinite;
  animation-delay: 2s;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}
</style>
