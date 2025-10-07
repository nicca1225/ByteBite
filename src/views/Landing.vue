<template>
  <div class="landing min-h-screen">
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700">
      <!-- Background Pattern -->
      <div class="absolute inset-0 bg-black/10">
        <div class="absolute inset-0 opacity-20" style="background-image: url(&quot;data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;)"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div class="text-center">
          <!-- Logo/Brand -->
          <div class="mb-8">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
              <span class="text-3xl">🍽️</span>
            </div>
            <h1 class="text-5xl sm:text-7xl font-black text-white mb-6 tracking-tight">
              Byte<span class="text-emerald-200">Bite</span>
            </h1>
          </div>

          <!-- Tagline -->
          <p class="text-xl sm:text-2xl text-emerald-100 mb-4 font-medium">
            Smart Meal Planning for Students
          </p>
          <p class="text-lg sm:text-xl text-emerald-50/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your eating habits with AI-powered meal planning that fits your budget,
            dietary needs, and busy student lifestyle.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              class="group relative bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg font-bold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105"
              @click="goToRegister"
            >
              <span class="relative z-10">Start Planning Free</span>
              <div class="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
            <button
              class="group border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 hover:border-white/50"
              @click="goToLogin"
            >
              Sign In
            </button>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div class="text-center">
              <div class="text-3xl font-bold text-white mb-2">10K+</div>
              <div class="text-emerald-200 text-sm">Students Helped</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-white mb-2">50K+</div>
              <div class="text-emerald-200 text-sm">Meals Planned</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-white mb-2">$2M+</div>
              <div class="text-emerald-200 text-sm">Money Saved</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Problem Statement -->
    <div class="py-16 bg-gradient-to-r from-red-50 to-orange-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white/80 backdrop-blur-sm border border-red-200/50 rounded-3xl p-8 shadow-xl">
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                <span class="text-2xl">⚠️</span>
              </div>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-red-800 mb-3">The Student Meal Planning Crisis</h2>
              <p class="text-red-700 leading-relaxed text-lg">
                73% of students struggle with meal planning, leading to poor nutrition, overspending,
                and difficulty achieving fitness goals. The average student spends $300+ extra per month
                on unplanned meals and takeout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            How <span class="text-emerald-600">ByteBite</span> Solves This
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform combines smart recipe discovery, budget tracking, and meal scheduling
            to give you the perfect meal planning solution.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="group bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-emerald-100">
            <div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-2xl">🤖</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">AI Recipe Discovery</h3>
            <p class="text-gray-600 leading-relaxed">
              Our smart algorithm finds recipes that match your dietary preferences, allergies, and budget constraints from thousands of options.
            </p>
          </div>

          <div class="group bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-blue-100">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-2xl">🛒</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Smart Shopping Lists</h3>
            <p class="text-gray-600 leading-relaxed">
              Automatically generate organized shopping lists with price estimates and store recommendations to save time and money.
            </p>
          </div>

          <div class="group bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-purple-100">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-2xl">📅</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Intelligent Scheduling</h3>
            <p class="text-gray-600 leading-relaxed">
              Plan your meals for the week with our smart scheduling system that considers your class schedule and preferences.
            </p>
          </div>

          <div class="group bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-orange-100">
            <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-2xl">💰</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Budget Optimization</h3>
            <p class="text-gray-600 leading-relaxed">
              Set and track your meal budget with real-time spending analysis and cost-saving suggestions.
            </p>
          </div>

          <div class="group bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-green-100">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-2xl">🏃‍♀️</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Fitness Integration</h3>
            <p class="text-gray-600 leading-relaxed">
              Align your meal plans with your fitness goals, whether it's weight loss, muscle gain, or maintenance.
            </p>
          </div>

          <div class="group bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-indigo-100">
            <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-2xl">⚡</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
            <p class="text-gray-600 leading-relaxed">
              Plan your entire week of meals in under 5 minutes. Focus on your studies while we handle the meal planning.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="py-20 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 relative overflow-hidden">
      <div class="absolute inset-0 bg-black/10"></div>
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl sm:text-5xl font-bold text-white mb-6">
          Ready to Transform Your Eating Habits?
        </h2>
        <p class="text-xl sm:text-2xl text-emerald-100 mb-12 max-w-2xl mx-auto">
          Join thousands of students who've simplified their meal planning and saved money with ByteBite
        </p>
        <div class="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            class="group bg-white text-emerald-600 hover:bg-emerald-50 px-10 py-5 text-xl font-bold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105"
            @click="goToRegister"
          >
            <span class="relative z-10">Start Your Free Plan</span>
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
          <button
            class="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-10 py-5 text-xl font-semibold rounded-2xl transition-all duration-300 hover:border-white/50"
            @click="goToLogin"
          >
            Sign In to Continue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Landing',
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
