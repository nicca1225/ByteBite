<template>
  <div class="landing bg-black">
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-cover bg-center bg-no-repeat min-h-screen flex flex-col"
      :style="{ backgroundImage: `url(${foodPhoto})` }">

      <!-- Dark Overlay for Better Text Visibility -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>

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

          <!-- Get Started Button -->
          <button
            class="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2.5 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            @click="goToRegister">
            Get Started
          </button>
        </div>
      </nav>

      <div class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex-1 flex items-center">
        <div class="text-center w-full">
          <!-- Logo/Brand -->
          <div class="mb-4">
            <div
              class="inline-flex items-center justify-center w-48 h-48 sm:w-56 sm:h-56 rounded-3xl shadow-xl overflow-hidden">
              <img :src="logo" alt="ByteBite Logo" class=" mt-12 block w-[110%] h-[110%] object-contain scale-105" />


            </div>
            <h1 class="text-5xl sm:text-7xl font-black text-white -mt-2 mb-2 tracking-tight drop-shadow-2xl">
              Byte<span class="text-yellow-300 drop-shadow-lg">Bite</span>
            </h1>
          </div>

          <!-- Tagline -->
          <p class="text-xl sm:text-2xl text-white mb-4 font-bold drop-shadow-lg">
            Smart Meal Planning for Students
          </p>
          <p class="text-lg sm:text-xl text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Transform your eating habits with AI-powered meal planning that fits your budget,
            dietary needs, and busy student lifestyle.
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
    <div class="py-20 bg-black border-y border-yellow-400/20">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-2xl mb-6">
            <span class="text-3xl">⚠️</span>
          </div>
          <h2 class="text-4xl sm:text-5xl font-bold text-yellow-400 mb-6">
            The Student Meal Planning Crisis
          </h2>
          <p class="text-xl sm:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            73% of students struggle with meal planning, leading to poor nutrition, overspending,
            and difficulty achieving fitness goals.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div class="text-center">
            <div class="text-5xl font-bold text-yellow-400 mb-3">73%</div>
            <p class="text-gray-400 text-lg">Students struggle with meal planning</p>
          </div>
          <div class="text-center">
            <div class="text-5xl font-bold text-yellow-400 mb-3">$300+</div>
            <p class="text-gray-400 text-lg">Extra spending per month on unplanned meals</p>
          </div>
          <div class="text-center">
            <div class="text-5xl font-bold text-yellow-400 mb-3">5hrs</div>
            <p class="text-gray-400 text-lg">Average time wasted per week on meal decisions</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-20 bg-black">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl sm:text-5xl font-bold text-white mb-6">
            How <span class="text-yellow-400">ByteBite</span> Solves This
          </h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            Our AI-powered platform combines smart recipe discovery, budget tracking, and meal scheduling
            to give you the perfect meal planning solution.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            class="group bg-black p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300 hover:-translate-y-2 border border-yellow-400/30">
            <div
              class="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <span class="text-2xl filter drop-shadow-md">🤖</span>
            </div>
            <h3 class="text-2xl font-bold text-yellow-400 mb-4">AI Recipe Discovery</h3>
            <p class="text-gray-300 leading-relaxed">
              Our smart algorithm finds recipes that match your dietary preferences, allergies, and budget constraints
              from thousands of options.
            </p>
          </div>

          <div
            class="group bg-black p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300 hover:-translate-y-2 border border-yellow-400/30">
            <div
              class="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <span class="text-2xl filter drop-shadow-md">🛒</span>
            </div>
            <h3 class="text-2xl font-bold text-yellow-400 mb-4">Smart Shopping Lists</h3>
            <p class="text-gray-300 leading-relaxed">
              Automatically generate organized shopping lists with price estimates and store recommendations to save
              time and money.
            </p>
          </div>

          <div
            class="group bg-black p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300 hover:-translate-y-2 border border-yellow-400/30">
            <div
              class="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <span class="text-2xl filter drop-shadow-md">📅</span>
            </div>
            <h3 class="text-2xl font-bold text-yellow-400 mb-4">Intelligent Scheduling</h3>
            <p class="text-gray-300 leading-relaxed">
              Plan your meals for the week with our smart scheduling system that considers your class schedule and
              preferences.
            </p>
          </div>

          <div
            class="group bg-black p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300 hover:-translate-y-2 border border-yellow-400/30">
            <div
              class="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <span class="text-2xl filter drop-shadow-md">💰</span>
            </div>
            <h3 class="text-2xl font-bold text-yellow-400 mb-4">Budget Optimization</h3>
            <p class="text-gray-300 leading-relaxed">
              Set and track your meal budget with real-time spending analysis and cost-saving suggestions.
            </p>
          </div>

          <div
            class="group bg-black p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300 hover:-translate-y-2 border border-yellow-400/30">
            <div
              class="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <span class="text-2xl filter drop-shadow-md">🏃‍♀️</span>
            </div>
            <h3 class="text-2xl font-bold text-yellow-400 mb-4">Fitness Integration</h3>
            <p class="text-gray-300 leading-relaxed">
              Align your meal plans with your fitness goals, whether it's weight loss, muscle gain, or maintenance.
            </p>
          </div>

          <div
            class="group bg-black p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300 hover:-translate-y-2 border border-yellow-400/30">
            <div
              class="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <span class="text-2xl filter drop-shadow-md">⚡</span>
            </div>
            <h3 class="text-2xl font-bold text-yellow-400 mb-4">Lightning Fast</h3>
            <p class="text-gray-300 leading-relaxed">
              Plan your entire week of meals in under 5 minutes. Focus on your studies while we handle the meal
              planning.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="py-20 bg-black relative overflow-hidden border-t border-yellow-400/30">
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl sm:text-5xl font-bold text-white mb-6">
          Ready to Transform Your Eating Habits?
        </h2>
        <p class="text-xl sm:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Join thousands of students who've simplified their meal planning and saved money with ByteBite
        </p>
        <div class="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            class="group bg-yellow-400 text-black hover:bg-yellow-300 px-10 py-5 text-xl font-bold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105"
            @click="goToRegister">
            <span class="relative z-10">Start Your Free Plan</span>
          </button>
          <button
            class="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black backdrop-blur-sm px-10 py-5 text-xl font-semibold rounded-2xl transition-all duration-300"
            @click="goToLogin">
            Sign In to Continue
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
