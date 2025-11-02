<template>
  <div class="home min-h-screen bg-black">
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
            <div class="inline-block mb-4 animate-slide-in">
              <span class="text-xs font-mono uppercase tracking-wider text-yellow-400/80 bg-yellow-400/10 px-3 py-1.5 rounded-full border border-yellow-400/20 backdrop-blur-sm">
                Learn More
              </span>
            </div>
            <h1 class="text-5xl sm:text-6xl font-light mb-3 text-white animate-slide-in-delayed">
              About <span class="font-semibold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent">ByteBite</span>
            </h1>
            <p class="text-gray-400 text-xl font-light animate-slide-in-delayed-more">
              Smart meal planning solution for students who want to balance health, budget, and convenience
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== MAIN CONTENT WRAPPER ========== -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

      <!-- Mission Section -->
      <div class="bg-gray-900/40 backdrop-blur-lg rounded-3xl p-8 border border-gray-800/30">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl font-light text-white mb-2">Our Mission</h2>
            <p class="text-gray-500 text-sm font-light">Why ByteBite exists</p>
          </div>
          <div class="w-10 h-10 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
            <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
        </div>

        <p class="text-gray-400 leading-relaxed mb-4 font-light text-lg">
          Students nowadays struggle to plan affordable and healthy meals, causing health issues and making it hard to attain their fitness goals. ByteBite aims to provide students with greater utility to plan and make their meals with an "all-in-one" app.
        </p>
        <p class="text-gray-500 leading-relaxed font-light">
          Our application addresses the main problem of students struggling to balance cost, health, and convenience when planning their day-to-day meals.
        </p>
      </div>

      <!-- How It Works Section -->
      <div class="bg-gray-900/40 backdrop-blur-lg rounded-3xl p-8 border border-gray-800/30">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl font-light text-white mb-2">How ByteBite Works</h2>
            <p class="text-gray-500 text-sm font-light">The process made simple</p>
          </div>
          <div class="w-10 h-10 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
            <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button class="group relative bg-gradient-to-br from-gray-900 to-black border border-yellow-400/30 hover:border-yellow-400/60 p-6 rounded-2xl transition-all duration-300 text-left overflow-hidden hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-400/20">
            <div class="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/5 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="absolute top-0 right-0 w-20 h-20 bg-yellow-400/10 rounded-full blur-2xl group-hover:bg-yellow-400/20 transition-all duration-300"></div>

            <div class="relative">
              <div class="w-12 h-12 border border-yellow-400/50 rounded-xl flex items-center justify-center mb-4 group-hover:border-yellow-400 group-hover:scale-110 transition-all duration-300 bg-yellow-400/5">
                <span class="text-lg">🎯</span>
              </div>
              <h3 class="text-base font-medium text-white mb-1 group-hover:text-yellow-400 transition-colors">Set Preferences</h3>
              <p class="text-gray-500 text-sm font-light">Configure your dietary preferences and budget</p>
            </div>
          </button>

          <button class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-6 rounded-2xl transition-all duration-300 text-left overflow-hidden hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-400/10">
            <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
            <div class="relative">
              <div class="w-12 h-12 border border-gray-700 rounded-xl flex items-center justify-center mb-4 group-hover:border-yellow-400/50 group-hover:scale-110 transition-all duration-300">
                <span class="text-lg">🔍</span>
              </div>
              <h3 class="text-base font-medium text-white mb-1 group-hover:text-yellow-400 transition-colors">Discover Recipes</h3>
              <p class="text-gray-500 text-sm font-light">Find recipes matching your requirements</p>
            </div>
          </button>

          <button class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-6 rounded-2xl transition-all duration-300 text-left overflow-hidden hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-400/10">
            <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
            <div class="relative">
              <div class="w-12 h-12 border border-gray-700 rounded-xl flex items-center justify-center mb-4 group-hover:border-yellow-400/50 group-hover:scale-110 transition-all duration-300">
                <span class="text-lg">📅</span>
              </div>
              <h3 class="text-base font-medium text-white mb-1 group-hover:text-yellow-400 transition-colors">Plan Meals</h3>
              <p class="text-gray-500 text-sm font-light">Schedule your meals for the week</p>
            </div>
          </button>

          <button class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-6 rounded-2xl transition-all duration-300 text-left overflow-hidden hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-400/10">
            <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
            <div class="relative">
              <div class="w-12 h-12 border border-gray-700 rounded-xl flex items-center justify-center mb-4 group-hover:border-yellow-400/50 group-hover:scale-110 transition-all duration-300">
                <span class="text-lg">🛒</span>
              </div>
              <h3 class="text-base font-medium text-white mb-1 group-hover:text-yellow-400 transition-colors">Generate Lists</h3>
              <p class="text-gray-500 text-sm font-light">Create organized shopping lists</p>
            </div>
          </button>
        </div>
      </div>

      <!-- Technology Stack -->
      <div class="bg-gray-900/40 backdrop-blur-lg rounded-3xl p-8 border border-gray-800/30">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl font-light text-white mb-2">Technology Stack</h2>
            <p class="text-gray-500 text-sm font-light">Built with modern tools</p>
          </div>
          <div class="w-10 h-10 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
            <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            </svg>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="group bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-2xl p-6 hover:border-yellow-400/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-400/10">
            <div class="flex items-start justify-between mb-4">
              <div class="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span class="text-base">📦</span>
              </div>
            </div>
            <h4 class="font-medium text-white mb-1">Vue.js 3</h4>
            <p class="text-gray-500 text-sm font-light">Progressive JavaScript framework</p>
          </div>

          <div class="group bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-2xl p-6 hover:border-yellow-400/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-400/10">
            <div class="flex items-start justify-between mb-4">
              <div class="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span class="text-base">⚡</span>
              </div>
            </div>
            <h4 class="font-medium text-white mb-1">Vite</h4>
            <p class="text-gray-500 text-sm font-light">Next generation build tool</p>
          </div>

          <div class="group bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-2xl p-6 hover:border-yellow-400/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-400/10">
            <div class="flex items-start justify-between mb-4">
              <div class="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span class="text-base">🛣</span>
              </div>
            </div>
            <h4 class="font-medium text-white mb-1">Vue Router</h4>
            <p class="text-gray-500 text-sm font-light">Official Vue routing library</p>
          </div>

          <div class="group bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-2xl p-6 hover:border-yellow-400/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-400/10">
            <div class="flex items-start justify-between mb-4">
              <div class="w-10 h-10 rounded-xl bg-green-400/10 border border-green-400/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span class="text-base">🗂</span>
              </div>
            </div>
            <h4 class="font-medium text-white mb-1">Pinia</h4>
            <p class="text-gray-500 text-sm font-light">Vue state management</p>
          </div>

          <div class="group bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-2xl p-6 hover:border-yellow-400/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-400/10">
            <div class="flex items-start justify-between mb-4">
              <div class="w-10 h-10 rounded-xl bg-blue-400/10 border border-blue-400/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span class="text-base">🎨</span>
              </div>
            </div>
            <h4 class="font-medium text-white mb-1">Tailwind CSS</h4>
            <p class="text-gray-500 text-sm font-light">Utility-first CSS framework</p>
          </div>

          <div class="group bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-2xl p-6 hover:border-yellow-400/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-400/10">
            <div class="flex items-start justify-between mb-4">
              <div class="w-10 h-10 rounded-xl bg-orange-400/10 border border-orange-400/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span class="text-base">🔌</span>
              </div>
            </div>
            <h4 class="font-medium text-white mb-1">APIs</h4>
            <p class="text-gray-500 text-sm font-light">Recipe data sources</p>
          </div>
        </div>
      </div>

      <!-- Key Benefits -->
      <div class="bg-gray-900/40 backdrop-blur-lg rounded-3xl p-8 border border-gray-800/30">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl font-light text-white mb-2">Key Benefits</h2>
            <p class="text-gray-500 text-sm font-light">What makes ByteBite special</p>
          </div>
          <div class="w-10 h-10 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
            <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="group relative bg-gradient-to-br from-gray-900 to-black border border-yellow-400/30 hover:border-yellow-400/60 p-6 rounded-2xl transition-all duration-300 text-left overflow-hidden hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-400/20">
            <div class="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/5 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="absolute top-0 right-0 w-20 h-20 bg-yellow-400/10 rounded-full blur-2xl group-hover:bg-yellow-400/20 transition-all duration-300"></div>
            <div class="relative">
              <div class="text-3xl mb-3">💰</div>
              <h3 class="text-base font-medium text-white mb-1 group-hover:text-yellow-400 transition-colors">Save Money</h3>
              <p class="text-gray-500 text-sm font-light">Plan meals within your budget</p>
            </div>
          </div>

          <div class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-6 rounded-2xl transition-all duration-300 text-left overflow-hidden hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-400/10">
            <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
            <div class="relative">
              <div class="text-3xl mb-3">🏃</div>
              <h3 class="text-base font-medium text-white mb-1 group-hover:text-yellow-400 transition-colors">Fitness Goals</h3>
              <p class="text-gray-500 text-sm font-light">Nutrition-focused meal planning</p>
            </div>
          </div>

          <div class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-6 rounded-2xl transition-all duration-300 text-left overflow-hidden hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-400/10">
            <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
            <div class="relative">
              <div class="text-3xl mb-3">⏰</div>
              <h3 class="text-base font-medium text-white mb-1 group-hover:text-yellow-400 transition-colors">Save Time</h3>
              <p class="text-gray-500 text-sm font-light">Automated shopping lists</p>
            </div>
          </div>

          <div class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-6 rounded-2xl transition-all duration-300 text-left overflow-hidden hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-400/10">
            <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
            <div class="relative">
              <div class="text-3xl mb-3">🍎</div>
              <h3 class="text-base font-medium text-white mb-1 group-hover:text-yellow-400 transition-colors">Eat Healthy</h3>
              <p class="text-gray-500 text-sm font-light">Personalized recommendations</p>
            </div>
          </div>

          <div class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-6 rounded-2xl transition-all duration-300 text-left overflow-hidden hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-400/10">
            <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
            <div class="relative">
              <div class="text-3xl mb-3">🎯</div>
              <h3 class="text-base font-medium text-white mb-1 group-hover:text-yellow-400 transition-colors">Focus on Studies</h3>
              <p class="text-gray-500 text-sm font-light">Meal planning done for you</p>
            </div>
          </div>

          <div class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-6 rounded-2xl transition-all duration-300 text-left overflow-hidden hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-400/10">
            <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
            <div class="relative">
              <div class="text-3xl mb-3">🔗</div>
              <h3 class="text-base font-medium text-white mb-1 group-hover:text-yellow-400 transition-colors">Seamless Sync</h3>
              <p class="text-gray-500 text-sm font-light">Works across all devices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
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
