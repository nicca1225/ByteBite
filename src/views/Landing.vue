<template>
  <div class="landing bg-black">
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-cover bg-center bg-no-repeat min-h-screen flex flex-col"
      :style="{ backgroundImage: `url(${foodPhoto})` }">

      <!-- Dark Overlay for Better Text Visibility -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"></div>

      <!-- Landing Page Header -->
      <nav class="relative z-10 w-full py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <!-- Logo -->
          <div class="flex items-center space-x-3">
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
              <img :src="logo" alt="ByteBite Logo" class="w-full h-full object-cover" />
            </div>
            <span class="text-2xl font-black text-white">
              Byte<span class="text-yellow-400">Bite</span>
            </span>
          </div>
        </div>
      </nav>

      <div class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex-1 flex items-center">
        <div class="text-center w-full">
          <!-- Header -->
          <div class="mb-4">
            <h1 class="text-5xl sm:text-6xl font-black text-white -mt-2 mb-10 tracking-tight drop-shadow-2xl" >
              Byte<span class="text-yellow-300 drop-shadow-lg">Bite</span>
            </h1>
          </div>

          <!-- Tagline -->
          <!-- <p class="text-xl sm:text-2xl text-white mb-4 font-bold drop-shadow-lg">
            Smart Meal Planning for Students
          </p> -->
          <p class="text-lg sm:text-xl text-gray-190 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            AI-powered meal planning that actually fits <br> your budget, dietary needs, and busy student lifestyle.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              class="group relative bg-yellow-400 text-gray-900 hover:bg-yellow-300 px-8 py-4 text-lg font-bold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105"
              @click="goToRegister">
              <span class="relative z-10">Start Planning</span>
            </button>
            <button
              class="group border-2 border-white text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 shadow-lg"
              @click="goToLogin">
              Sign In
            </button>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div class="text-center">
              <div class="text-3xl font-bold text-yellow-300 mb-2 drop-shadow-lg">10K+</div>
              <div class="text-white text-sm font-semibold drop-shadow-md">Students Helped</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-yellow-300 mb-2 drop-shadow-lg">50K+</div>
              <div class="text-white text-sm font-semibold drop-shadow-md">Meals Planned</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-yellow-300 mb-2 drop-shadow-lg">$2M+</div>
              <div class="text-white text-sm font-semibold drop-shadow-md">Money Saved</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Problem Statement -->
    <div class="py-20 bg-black border-y border-gray-800/50">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <div class="inline-flex items-center justify-center w-12 h-12 border border-gray-700 rounded-lg mb-6">
            <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <h2 class="text-4xl sm:text-5xl font-light text-white mb-6">
            The Challenge
          </h2>
          <p class="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto font-light">
            73% of students struggle with meal planning, leading to poor nutrition, overspending,
            and difficulty achieving fitness goals.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div class="bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl p-6 text-center">
            <div class="text-5xl font-light text-yellow-400 mb-3">73%</div>
            <p class="text-gray-500 text-sm font-mono uppercase tracking-wider">Students struggle with meal planning</p>
          </div>
          <div class="bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl p-6 text-center">
            <div class="text-5xl font-light text-yellow-400 mb-3">$300+</div>
            <p class="text-gray-500 text-sm font-mono uppercase tracking-wider">Extra spending per month</p>
          </div>
          <div class="bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl p-6 text-center">
            <div class="text-5xl font-light text-yellow-400 mb-3">5hrs</div>
            <p class="text-gray-500 text-sm font-mono uppercase tracking-wider">Time wasted per week</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-20 bg-black">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl sm:text-5xl font-light text-white mb-6">
            Our Solution
          </h2>
          <p class="text-xl text-gray-400 max-w-3xl mx-auto font-light">
            AI-powered platform combining smart recipe discovery, budget tracking, and meal scheduling
            for seamless meal planning.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-8 rounded-xl transition-all duration-300 overflow-hidden">
            <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
            <div class="relative">
              <div class="w-12 h-12 border border-gray-700 rounded-lg flex items-center justify-center mb-6 group-hover:border-yellow-400/50 transition-colors">
                <svg class="w-6 h-6 text-gray-400 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-medium text-white mb-3">AI Recipe Discovery</h3>
              <p class="text-gray-500 leading-relaxed font-light text-sm">
                Smart algorithm finds recipes matching your dietary preferences, allergies, and budget constraints.
              </p>
            </div>
          </div>

          <div class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-8 rounded-xl transition-all duration-300 overflow-hidden">
            <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
            <div class="relative">
              <div class="w-12 h-12 border border-gray-700 rounded-lg flex items-center justify-center mb-6 group-hover:border-yellow-400/50 transition-colors">
                <svg class="w-6 h-6 text-gray-400 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-medium text-white mb-3">Smart Shopping Lists</h3>
              <p class="text-gray-500 leading-relaxed font-light text-sm">
                Auto-generate organized shopping lists with price estimates and store recommendations.
              </p>
            </div>
          </div>

          <div class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-8 rounded-xl transition-all duration-300 overflow-hidden">
            <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
            <div class="relative">
              <div class="w-12 h-12 border border-gray-700 rounded-lg flex items-center justify-center mb-6 group-hover:border-yellow-400/50 transition-colors">
                <svg class="w-6 h-6 text-gray-400 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-medium text-white mb-3">Intelligent Scheduling</h3>
              <p class="text-gray-500 leading-relaxed font-light text-sm">
                Plan weekly meals with smart scheduling that considers your class schedule and preferences.
              </p>
            </div>
          </div>

          <div class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-8 rounded-xl transition-all duration-300 overflow-hidden">
            <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
            <div class="relative">
              <div class="w-12 h-12 border border-gray-700 rounded-lg flex items-center justify-center mb-6 group-hover:border-yellow-400/50 transition-colors">
                <svg class="w-6 h-6 text-gray-400 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-medium text-white mb-3">Budget Optimization</h3>
              <p class="text-gray-500 leading-relaxed font-light text-sm">
                Track your meal budget with real-time spending analysis and cost-saving suggestions.
              </p>
            </div>
          </div>

          <div class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-8 rounded-xl transition-all duration-300 overflow-hidden">
            <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
            <div class="relative">
              <div class="w-12 h-12 border border-gray-700 rounded-lg flex items-center justify-center mb-6 group-hover:border-yellow-400/50 transition-colors">
                <svg class="w-6 h-6 text-gray-400 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-medium text-white mb-3">Fitness Integration</h3>
              <p class="text-gray-500 leading-relaxed font-light text-sm">
                Align meal plans with fitness goals, whether weight loss, muscle gain, or maintenance.
              </p>
            </div>
          </div>

          <div class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-8 rounded-xl transition-all duration-300 overflow-hidden">
            <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
            <div class="relative">
              <div class="w-12 h-12 border border-gray-700 rounded-lg flex items-center justify-center mb-6 group-hover:border-yellow-400/50 transition-colors">
                <svg class="w-6 h-6 text-gray-400 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-medium text-white mb-3">Lightning Fast</h3>
              <p class="text-gray-500 leading-relaxed font-light text-sm">
                Plan your entire week of meals in under 5 minutes. Focus on studies while we handle planning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="py-20 bg-black relative overflow-hidden border-t border-gray-800/50">
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl sm:text-5xl font-light text-white mb-6">
          Ready to Get Started?
        </h2>
        <p class="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light">
          Join thousands of students simplifying meal planning and saving money
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            class="bg-yellow-400 text-black hover:bg-yellow-300 px-8 py-4 text-base font-medium rounded-lg transition-all duration-300"
            @click="goToRegister">
            Create Account
          </button>
          <button
            class="border border-gray-700 text-gray-300 hover:border-yellow-400/50 hover:text-yellow-400 px-8 py-4 text-base font-medium rounded-lg transition-all duration-300"
            @click="goToLogin">
            Sign In
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import foodPhoto from '@/assets/foodphoto.jpg';

export default {
  name: 'Landing',
  data() {
    return {
      foodPhoto,
      logo: '/ByteBites.png'
    }
  },
  methods: {
    goToRegister() {
      this.$router.push('/register')
    },
    goToLogin() {
      this.$router.push('/login')
    }
  }
}
</script>
