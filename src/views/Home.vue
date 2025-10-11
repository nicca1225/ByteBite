<template>
  <div class="home min-h-screen bg-black">
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-950">
      <!-- Background Pattern -->
      <div class="absolute inset-0 bg-yellow-400/5">
        <div class="absolute inset-0 opacity-20" style="background-image: url(&quot;data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23facc15' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;)"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div class="text-center">
          <!-- Logo/Brand -->
          <div class="mb-8">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-yellow-400/20 backdrop-blur-sm rounded-2xl mb-6 border border-yellow-400/30">
              <span class="text-3xl">🍽️</span>
            </div>
            <h1 class="text-5xl sm:text-7xl font-black text-white mb-6 tracking-tight">
              Byte<span class="text-yellow-400">Bite</span>
            </h1>
          </div>

          <!-- Tagline -->
          <p class="text-xl sm:text-2xl text-yellow-300 mb-4 font-medium">
            Smart Meal Planning for Students
          </p>
          <p class="text-lg sm:text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your eating habits with AI-powered meal planning that fits your budget,
            dietary needs, and busy student lifestyle.
          </p>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              class="group relative bg-yellow-400 text-black hover:bg-yellow-300 px-8 py-4 text-lg font-bold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-yellow-400/20 transform hover:-translate-y-2 hover:scale-105 focus:ring-4 focus:ring-yellow-400/50"
              @click="goToRegister"
            >
              <span class="relative z-10">Start Planning Free</span>
            </button>
            <button
              class="group border-2 border-yellow-400/30 text-white hover:bg-yellow-400/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 hover:border-yellow-400/50 focus:ring-4 focus:ring-yellow-400/50"
              @click="goToLogin"
            >
              Sign In
            </button>
          </div>
          
          <!-- Stats -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div class="text-center">
              <div class="text-3xl font-bold text-yellow-400 mb-2">10K+</div>
              <div class="text-gray-300 text-sm">Students Helped</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-yellow-400 mb-2">50K+</div>
              <div class="text-gray-300 text-sm">Meals Planned</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-yellow-400 mb-2">$2M+</div>
              <div class="text-gray-300 text-sm">Money Saved</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Problem Statement -->
    <div class="py-16 bg-gray-950">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gray-900 backdrop-blur-sm border border-yellow-400/30 rounded-3xl p-8 shadow-xl">
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-yellow-400/20 rounded-2xl flex items-center justify-center border border-yellow-400/30">
                <span class="text-2xl">⚠️</span>
              </div>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-yellow-400 mb-3">The Student Meal Planning Crisis</h2>
              <p class="text-gray-300 leading-relaxed text-lg">
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
          <div class="group bg-gray-900 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-yellow-400/10 transition-all duration-300 hover:-translate-y-2 border border-yellow-400/30">
            <div class="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-2xl">🤖</span>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">AI Recipe Discovery</h3>
            <p class="text-gray-300 leading-relaxed">
              Our smart algorithm finds recipes that match your dietary preferences, allergies, and budget constraints from thousands of options.
            </p>
          </div>

          <div class="group bg-gray-900 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-yellow-400/10 transition-all duration-300 hover:-translate-y-2 border border-yellow-400/30">
            <div class="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-2xl">🛒</span>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">Smart Shopping Lists</h3>
            <p class="text-gray-300 leading-relaxed">
              Automatically generate organized shopping lists with price estimates and store recommendations to save time and money.
            </p>
          </div>

          <div class="group bg-gray-900 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-yellow-400/10 transition-all duration-300 hover:-translate-y-2 border border-yellow-400/30">
            <div class="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-2xl">📅</span>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">Intelligent Scheduling</h3>
            <p class="text-gray-300 leading-relaxed">
              Plan your meals for the week with our smart scheduling system that considers your class schedule and preferences.
            </p>
          </div>

          <div class="group bg-gray-900 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-yellow-400/10 transition-all duration-300 hover:-translate-y-2 border border-yellow-400/30">
            <div class="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-2xl">💰</span>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">Budget Optimization</h3>
            <p class="text-gray-300 leading-relaxed">
              Set and track your meal budget with real-time spending analysis and cost-saving suggestions.
            </p>
          </div>

          <div class="group bg-gray-900 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-yellow-400/10 transition-all duration-300 hover:-translate-y-2 border border-yellow-400/30">
            <div class="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-2xl">🏃‍♀️</span>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">Fitness Integration</h3>
            <p class="text-gray-300 leading-relaxed">
              Align your meal plans with your fitness goals, whether it's weight loss, muscle gain, or maintenance.
            </p>
          </div>

          <div class="group bg-gray-900 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-yellow-400/10 transition-all duration-300 hover:-translate-y-2 border border-yellow-400/30">
            <div class="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-2xl">⚡</span>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
            <p class="text-gray-300 leading-relaxed">
              Plan your entire week of meals in under 5 minutes. Focus on your studies while we handle the meal planning.
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- CTA Section -->
    <div class="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-950 relative overflow-hidden">
      <div class="absolute inset-0 bg-yellow-400/5"></div>
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl sm:text-5xl font-bold text-white mb-6">
          Ready to Transform Your Eating Habits?
        </h2>
        <p class="text-xl sm:text-2xl text-yellow-300 mb-12 max-w-2xl mx-auto">
          Join thousands of students who've simplified their meal planning and saved money with ByteBite
        </p>
        <div class="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            class="group bg-yellow-400 text-black hover:bg-yellow-300 px-10 py-5 text-xl font-bold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-yellow-400/20 transform hover:-translate-y-2 hover:scale-105 focus:ring-4 focus:ring-yellow-400/50"
            @click="goToRegister"
          >
            <span class="relative z-10">Start Your Free Plan</span>
          </button>
          <button
            class="border-2 border-yellow-400/30 text-white hover:bg-yellow-400/10 backdrop-blur-sm px-10 py-5 text-xl font-semibold rounded-2xl transition-all duration-300 hover:border-yellow-400/50 focus:ring-4 focus:ring-yellow-400/50"
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
  name: 'Home',
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
