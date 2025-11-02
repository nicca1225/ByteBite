<template>
  <div class="home min-h-screen bg-black">
    <!-- ========== HERO SECTION - Enhanced with animated gradient background ========= -->
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

        <!-- Background Image with gradient overlay -->
        <div class="absolute inset-0 rounded-3xl overflow-hidden opacity-30">
          <img
            src="/salt.png"
            alt="Background"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-transparent"></div>
        </div>

        <!-- Content with fade-in animation -->
        <div class="relative z-10 px-8 sm:px-12 py-28 animate-fade-in-up">
          <div class="flex items-center justify-between">
            <div>
              <div class="inline-block mb-4 animate-slide-in">
                <span class="text-xs font-mono uppercase tracking-wider text-yellow-400/80 bg-yellow-400/10 px-3 py-1.5 rounded-full border border-yellow-400/20 backdrop-blur-sm">
                  {{ timeOfDay }} Dashboard
                </span>
              </div>
              <h1 class="text-5xl sm:text-6xl font-light mb-3 text-white animate-slide-in-delayed">
                {{ greeting }}, <span class="font-semibold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent">{{ userName }}</span>
              </h1>
              <p class="text-gray-400 text-xl font-light animate-slide-in-delayed-more">{{ motivationalText }}</p>
            </div>
            <div class="hidden md:block animate-fade-in">
              <div class="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl px-6 py-4 shadow-2xl hover:shadow-yellow-400/10 transition-all duration-300 hover:scale-105">
                <div class="text-sm font-mono text-gray-500 uppercase tracking-wider mb-1">{{ currentDay }}</div>
                <div class="text-3xl font-light text-white">{{ currentDate }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== MAIN CONTENT WRAPPER ========== -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

      <!-- ========== QUICK ACTIONS - Enhanced with hover effects and icons ========== -->
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

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <!-- Plan Meals - Featured with pulse glow -->
          <button
            class="group relative bg-gradient-to-br from-gray-900 to-black border border-yellow-400/30 hover:border-yellow-400/60 p-6 rounded-2xl transition-all duration-300 text-left overflow-hidden hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-400/20"
            @click="$router.push('/plan-meal')"
          >
            <!-- Glow effect on hover -->
            <div class="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/5 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="absolute top-0 right-0 w-20 h-20 bg-yellow-400/10 rounded-full blur-2xl group-hover:bg-yellow-400/20 transition-all duration-300"></div>

            <div class="relative">
              <div class="w-12 h-12 border border-yellow-400/50 rounded-xl flex items-center justify-center mb-4 group-hover:border-yellow-400 group-hover:scale-110 transition-all duration-300 bg-yellow-400/5">
                <svg class="w-6 h-6 text-yellow-400 group-hover:text-yellow-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-base font-medium text-white mb-1 group-hover:text-yellow-400 transition-colors">Plan Meals</h3>
              <p class="text-gray-500 text-sm font-light">Create your weekly schedule</p>

              <!-- Pulse indicator -->
              <div class="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
              <div class="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full"></div>
            </div>
          </button>

          <!-- Calorie Tracker -->
          <button
            class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-6 rounded-2xl transition-all duration-300 text-left overflow-hidden hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-400/10"
            @click="$router.push('/calorie-tracker')"
          >
            <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
            <div class="relative">
              <div class="w-12 h-12 border border-gray-700 rounded-xl flex items-center justify-center mb-4 group-hover:border-yellow-400/50 group-hover:scale-110 transition-all duration-300">
                <svg class="w-6 h-6 text-gray-400 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 class="text-base font-medium text-white mb-1 group-hover:text-yellow-400 transition-colors">Calorie Tracker</h3>
              <p class="text-gray-500 text-sm font-light">Monitor daily nutrition</p>
            </div>
          </button>

          <!-- Find Recipes -->
          <button
            class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-6 rounded-2xl transition-all duration-300 text-left overflow-hidden hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-400/10"
            @click="$router.push('/find-recipes')"
          >
            <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
            <div class="relative">
              <div class="w-12 h-12 border border-gray-700 rounded-xl flex items-center justify-center mb-4 group-hover:border-yellow-400/50 group-hover:scale-110 transition-all duration-300">
                <svg class="w-6 h-6 text-gray-400 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <h3 class="text-base font-medium text-white mb-1 group-hover:text-yellow-400 transition-colors">Find Recipes</h3>
              <p class="text-gray-500 text-sm font-light">Explore meal options</p>
            </div>
          </button>

          <!-- Favourites -->
          <button
            class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-6 rounded-2xl transition-all duration-300 text-left overflow-hidden hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-400/10"
            @click="$router.push('/favourites')"
          >
            <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
            <div class="relative">
              <div class="w-12 h-12 border border-gray-700 rounded-xl flex items-center justify-center mb-4 group-hover:border-yellow-400/50 group-hover:scale-110 transition-all duration-300">
                <svg class="w-6 h-6 text-gray-400 group-hover:text-yellow-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <h3 class="text-base font-medium text-white mb-1 group-hover:text-yellow-400 transition-colors">Favourites</h3>
              <p class="text-gray-500 text-sm font-light">View saved recipes</p>
            </div>
          </button>

          <!-- Shopping List -->
          <button
            class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-6 rounded-2xl transition-all duration-300 text-left overflow-hidden hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-400/10"
            @click="$router.push('/shopping-list')"
          >
            <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
            <div class="relative">
              <div class="w-12 h-12 border border-gray-700 rounded-xl flex items-center justify-center mb-4 group-hover:border-yellow-400/50 group-hover:scale-110 transition-all duration-300">
                <svg class="w-6 h-6 text-gray-400 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 class="text-base font-medium text-white mb-1 group-hover:text-yellow-400 transition-colors">Shopping List</h3>
              <p class="text-gray-500 text-sm font-light">View your grocery list</p>
            </div>
          </button>

          <!-- Budget Tracker -->
          <button class="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 hover:border-yellow-400/30 p-6 rounded-2xl transition-all duration-300 text-left overflow-hidden hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-400/10"
            @click="$router.push('/budget-tracker')"
            >
            <div class="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-colors duration-300"></div>
            <div class="relative">
              <div class="w-12 h-12 border border-gray-700 rounded-xl flex items-center justify-center mb-4 group-hover:border-yellow-400/50 group-hover:scale-110 transition-all duration-300">
                <svg class="w-6 h-6 text-gray-400 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-base font-medium text-white mb-1 group-hover:text-yellow-400 transition-colors">Budget Tracker</h3>
              <p class="text-gray-500 text-sm font-light">Monitor your spending</p>
            </div>
          </button>
        </div>
      </div>

      <!-- ========== ANALYTICS OVERVIEW - Enhanced with animated counters ========== -->
      <div class="bg-gray-900/40 backdrop-blur-lg rounded-3xl p-8 border border-gray-800/30">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl font-light text-white mb-2">Analytics Overview</h2>
            <p class="text-gray-500 text-sm font-light">Your progress this week</p>
          </div>
          <div class="flex items-center gap-2">
            <button class="px-4 py-2 text-xs font-mono uppercase tracking-wider border border-gray-700 hover:border-yellow-400/50 text-gray-400 hover:text-yellow-400 rounded-lg transition-all duration-300">
              This Week
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Stat Card 1 - Animated counter -->
          <div class="group bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-2xl p-6 hover:border-yellow-400/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-400/10">
            <div class="flex items-start justify-between mb-4">
              <div class="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <span class="text-xs font-mono uppercase tracking-wider text-gray-500">Meals Planned</span>
            </div>
            <div class="text-4xl font-light text-white mb-2 animate-count-up">{{ animatedMealsPlanned }}</div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 bg-green-400/10 border border-green-400/20 text-green-400 text-xs font-mono rounded-full">+25%</span>
              <span class="text-gray-600 text-sm">vs last week</span>
            </div>
          </div>

          <!-- Stat Card 2 -->
          <div class="group bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-2xl p-6 hover:border-amber-400/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-400/10">
            <div class="flex items-start justify-between mb-4">
              <div class="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                </svg>
              </div>
              <span class="text-xs font-mono uppercase tracking-wider text-gray-500">Recipes Saved</span>
            </div>
            <div class="text-4xl font-light text-white mb-2 animate-count-up">{{ animatedRecipesSaved }}</div>
            <div class="flex items-center gap-2">
              <span class="text-gray-600 text-sm">In collection</span>
            </div>
          </div>

          <!-- Stat Card 3 -->
          <div class="group bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-2xl p-6 hover:border-cyan-400/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-400/10">
            <div class="flex items-start justify-between mb-4">
              <div class="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <span class="text-xs font-mono uppercase tracking-wider text-gray-500">Money Saved</span>
            </div>
            <div class="text-4xl font-light text-white mb-2 animate-count-up">${{ animatedMoneySaved }}</div>
            <div class="flex items-center gap-2">
              <span class="text-gray-600 text-sm">This month</span>
            </div>
          </div>

          <!-- Stat Card 4 -->
          <div class="group bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-2xl p-6 hover:border-yellow-400/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-400/10">
            <div class="flex items-start justify-between mb-4">
              <div class="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <span class="text-xs font-mono uppercase tracking-wider text-gray-500">Avg Calories</span>
            </div>
            <div class="text-4xl font-light text-white mb-2 animate-count-up">{{ animatedAvgCalories }}</div>
            <div class="flex items-center gap-2">
              <span class="text-gray-600 text-sm">Per day</span>
            </div>
          </div>
        </div>

        <!-- Weekly Calorie Chart Section -->
        <div class="mt-12">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-lg font-medium text-white">Weekly Calorie Intake</h3>
              <p class="text-gray-500 text-sm font-light">Calories consumed per day</p>
            </div>
          </div>
          <div class="bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-2xl p-6">
            <VueApexCharts
              type="bar"
              height="350"
              :options="chartOptions"
              :series="chartSeries"
            />
          </div>
        </div>
      </div>

      <!-- ========== SCHEDULED MEALS - Enhanced with carousel and hover effects ========== -->
      <div class="bg-gray-900/40 backdrop-blur-lg rounded-3xl p-8 border border-gray-800/30">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl font-light text-white mb-2">Scheduled Meals</h2>
            <p class="text-gray-500 text-sm font-light">Your upcoming meals for the week</p>
          </div>
          <div class="flex items-center gap-3">
            <button
              @click="openAddMealDialog"
              class="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              <span>Add Meal</span>
            </button>
            <button
              @click="$router.push('/plan-meal')"
              class="text-sm text-gray-400 hover:text-yellow-400 font-mono uppercase tracking-wider flex items-center gap-2 transition-colors group"
            >
              <span>View All</span>
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Scrollable meal cards -->
        <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          <!-- Meal Card 1 - Enhanced with zoom and overlay -->
          <div class="group flex-shrink-0 w-80 bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-2xl overflow-hidden hover:border-yellow-400/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-400/10">
            <div class="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop"
                alt="Caesar Salad Bowl"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <!-- Gradient overlay on hover -->
              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

              <!-- Tags overlay -->
              <div class="absolute top-3 left-3 flex gap-2">
                <span class="px-2 py-1 bg-green-400/20 backdrop-blur-md border border-green-400/30 text-green-300 text-xs font-mono rounded-full">
                  High Protein
                </span>
              </div>

              <!-- Calorie/Time overlay on hover -->
              <div class="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div class="flex gap-2">
                  <span class="px-2 py-1 bg-black/60 backdrop-blur-md border border-gray-700 text-gray-300 text-xs font-mono rounded-lg">
                    450 cal
                  </span>
                  <span class="px-2 py-1 bg-black/60 backdrop-blur-md border border-gray-700 text-gray-300 text-xs font-mono rounded-lg">
                    15 min
                  </span>
                </div>
              </div>
            </div>

            <div class="p-5">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs font-mono uppercase tracking-wider text-yellow-400/80 bg-yellow-400/10 px-2 py-1 rounded border border-yellow-400/20">Lunch</span>
                <span class="text-xs text-gray-500 font-mono">Today</span>
              </div>
              <h3 class="text-lg font-medium text-white mb-2 group-hover:text-yellow-400 transition-colors">Caesar Salad Bowl</h3>
              <p class="text-gray-500 text-sm mb-4 font-light">Fresh greens, grilled chicken, parmesan</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4 text-xs text-gray-500 font-mono">
                  <span class="flex items-center gap-1">
                    <span class="text-yellow-400">⏱</span> 15min
                  </span>
                  <span class="flex items-center gap-1">
                    <span class="text-yellow-400">🔥</span> 450cal
                  </span>
                </div>
                <button class="text-yellow-400 hover:text-yellow-300 text-sm font-mono transition-colors hover:underline">View</button>
              </div>
            </div>
          </div>

          <!-- Meal Card 2 -->
          <div class="group flex-shrink-0 w-80 bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-2xl overflow-hidden hover:border-yellow-400/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-400/10">
            <div class="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop"
                alt="Spaghetti Carbonara"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

              <div class="absolute top-3 left-3 flex gap-2">
                <span class="px-2 py-1 bg-amber-400/20 backdrop-blur-md border border-amber-400/30 text-amber-300 text-xs font-mono rounded-full">
                  Comfort Food
                </span>
              </div>

              <div class="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div class="flex gap-2">
                  <span class="px-2 py-1 bg-black/60 backdrop-blur-md border border-gray-700 text-gray-300 text-xs font-mono rounded-lg">
                    680 cal
                  </span>
                  <span class="px-2 py-1 bg-black/60 backdrop-blur-md border border-gray-700 text-gray-300 text-xs font-mono rounded-lg">
                    25 min
                  </span>
                </div>
              </div>
            </div>

            <div class="p-5">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs font-mono uppercase tracking-wider text-yellow-400/80 bg-yellow-400/10 px-2 py-1 rounded border border-yellow-400/20">Dinner</span>
                <span class="text-xs text-gray-500 font-mono">Today</span>
              </div>
              <h3 class="text-lg font-medium text-white mb-2 group-hover:text-yellow-400 transition-colors">Spaghetti Carbonara</h3>
              <p class="text-gray-500 text-sm mb-4 font-light">Classic Italian pasta with bacon & egg</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4 text-xs text-gray-500 font-mono">
                  <span class="flex items-center gap-1">
                    <span class="text-yellow-400">⏱</span> 25min
                  </span>
                  <span class="flex items-center gap-1">
                    <span class="text-yellow-400">🔥</span> 680cal
                  </span>
                </div>
                <button class="text-yellow-400 hover:text-yellow-300 text-sm font-mono transition-colors hover:underline">View</button>
              </div>
            </div>
          </div>

          <!-- Meal Card 3 -->
          <div class="group flex-shrink-0 w-80 bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-2xl overflow-hidden hover:border-yellow-400/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-400/10">
            <div class="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400&h=300&fit=crop"
                alt="Protein Pancakes"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

              <div class="absolute top-3 left-3 flex gap-2">
                <span class="px-2 py-1 bg-cyan-400/20 backdrop-blur-md border border-cyan-400/30 text-cyan-300 text-xs font-mono rounded-full">
                  Quick Meal
                </span>
              </div>

              <div class="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div class="flex gap-2">
                  <span class="px-2 py-1 bg-black/60 backdrop-blur-md border border-gray-700 text-gray-300 text-xs font-mono rounded-lg">
                    380 cal
                  </span>
                  <span class="px-2 py-1 bg-black/60 backdrop-blur-md border border-gray-700 text-gray-300 text-xs font-mono rounded-lg">
                    20 min
                  </span>
                </div>
              </div>
            </div>

            <div class="p-5">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs font-mono uppercase tracking-wider text-yellow-400/80 bg-yellow-400/10 px-2 py-1 rounded border border-yellow-400/20">Breakfast</span>
                <span class="text-xs text-gray-500 font-mono">Tomorrow</span>
              </div>
              <h3 class="text-lg font-medium text-white mb-2 group-hover:text-yellow-400 transition-colors">Protein Pancakes</h3>
              <p class="text-gray-500 text-sm mb-4 font-light">Fluffy pancakes with berries & maple syrup</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4 text-xs text-gray-500 font-mono">
                  <span class="flex items-center gap-1">
                    <span class="text-yellow-400">⏱</span> 20min
                  </span>
                  <span class="flex items-center gap-1">
                    <span class="text-yellow-400">🔥</span> 380cal
                  </span>
                </div>
                <button class="text-yellow-400 hover:text-yellow-300 text-sm font-mono transition-colors hover:underline">View</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ========== MOTIVATIONAL TIP SECTION ========== -->
      <div class="bg-gradient-to-br from-yellow-400/10 via-amber-400/5 to-yellow-400/10 backdrop-blur-lg rounded-3xl p-8 border border-yellow-400/20">
        <div class="flex items-start gap-6">
          <div class="w-12 h-12 border border-yellow-400/30 rounded-xl flex items-center justify-center flex-shrink-0 bg-yellow-400/5">
            <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-3">
              <h3 class="text-xl font-medium text-white">Today's Nutrition Tip</h3>
              <span class="text-xs font-mono uppercase tracking-wider text-gray-500 bg-gray-800/50 px-2 py-1 rounded border border-gray-700/50">Daily</span>
            </div>
            <p class="text-gray-400 mb-6 leading-relaxed font-light">
              {{ dailyTip }}
            </p>
            <button class="text-sm font-mono uppercase tracking-wider text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-2 group">
              <span>Learn More</span>
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== ADD MEAL MODAL ========== -->
    <AddMealModal
      :isOpen="showAddMealModal"
      :selectedDate="selectedDateForModal"
      title="Add Meal"
      @close="closeAddMealDialog"
      @submit="handleMealSubmit"
    />
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import VueApexCharts from 'vue3-apexcharts'
import AddMealModal from '@/components/AddMealModal.vue'
import { getFirestore, collection, query, where, onSnapshot, addDoc, serverTimestamp, getDocs } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { onUnmounted } from 'vue'

export default {
  name: 'UserHome',
  components: {
    VueApexCharts,
    AddMealModal,
  },
  setup() {
    const authStore = useAuthStore()
    const db = getFirestore()
    const auth = getAuth()

    // ========== USER INFO ==========
    const userName = computed(() => {
      const name = authStore.userName
      return name.split(' ')[0] || 'there'
    })

    const currentDate = ref(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
    const currentDay = ref(new Date().toLocaleDateString('en-US', { weekday: 'long' }))

    // ========== ANIMATED COUNTERS ==========
    const animatedMealsPlanned = ref(0)
    const animatedRecipesSaved = ref(0)
    const animatedMoneySaved = ref(0)
    const animatedAvgCalories = ref(0)
    const unsubscribe = ref(null)

    // Initialize Firestore listener on mount
    onMounted(() => {
      animateCounter(animatedMealsPlanned, 12, 1000)
      animateCounter(animatedRecipesSaved, 24, 1200)
      animateCounter(animatedMoneySaved, 87, 1400)

      // Fetch weekly calories from Firestore
      if (auth.currentUser) {
        fetchWeeklyCalories()
      } else {
        console.warn('⚠️ No authenticated user - cannot fetch calorie data')
      }
    })

    // Cleanup listener on unmount
    onUnmounted(() => {
      if (unsubscribe.value) {
        unsubscribe.value()
      }
    })

    // ========== ANIMATION HELPER ==========
    function animateCounter(ref, target, duration) {
      const start = 0
      const increment = target / (duration / 16) // 60fps
      let current = start

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          ref.value = target
          clearInterval(timer)
        } else {
          ref.value = Math.floor(current)
        }
      }, 16)
    }

    // ========== CHART DATA ==========
    const chartSeries = ref([
      {
        name: 'Calories',
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ])

    const chartOptions = ref({
      chart: {
        id: 'weekly-calories',
        type: 'bar',
        height: 350,
        background: 'transparent',
        toolbar: {
          show: false,
        },
        fontFamily: 'inherit',
      },
      theme: {
        mode: 'dark',
      },
      colors: ['#FBBF24'],
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '40%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        borderColor: '#374151',
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true,
          },
        },
        xaxis: {
          lines: {
            show: false,
          },
        }
      },
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        labels: {
          style: {
            colors: '#9CA3AF',
            fontSize: '12px',
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#9CA3AF',
            fontSize: '12px',
          },
          formatter: (val) => `${val} kcal`,
        },
      },
      tooltip: {
        theme: 'dark',
        y: {
          formatter: (val) => `${val} kcal`,
        },
      },
      legend: {
        show: false,
      },
    })

    // ========== FETCH WEEKLY CALORIES FROM FIRESTORE (Both mealPlans & calorieEntries) ==========
    async function fetchWeeklyCalories() {
      if (!auth.currentUser) {
        console.warn('⚠️ No user logged in, cannot fetch calories.')
        return
      }

      const userEmail = auth.currentUser.email
      console.log('📊 Fetching weekly calories from both mealPlans and calorieEntries:', userEmail)

      // Helper to format date as YYYY-MM-DD
      function getFormattedDate(date) {
        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const day = date.getDate().toString().padStart(2, '0')
        return `${year}-${month}-${day}`
      }

      // Get the current week (Mon-Sun)
      const today = new Date()
      const dayOfWeek = today.getDay() // 0=Sun, 1=Mon, ...
      const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1
      const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysToSubtract)

      const dateStrings = []
      const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      const dailyCaloriesMap = {}

      for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek)
        day.setDate(day.getDate() + i)
        const dateStr = getFormattedDate(day)
        dateStrings.push(dateStr)
        dailyCaloriesMap[dateStr] = 0
      }

      console.log('📅 This week dates:', dateStrings)

      try {
        // Set up listener for mealPlans
        const mealPlansCol = collection(db, 'users', userEmail, 'mealPlans')
        const mealPlansQuery = query(mealPlansCol, where('date', 'in', dateStrings))

        // Set up listener for calorieEntries - fetch all and filter by date on client
        const calorieEntriesCol = collection(db, 'users', userEmail, 'calorieEntries')
        const calorieEntriesSnapshot = await getDocs(calorieEntriesCol)

        console.log('🔍 Query paths:')
        console.log('   - Meals: users/' + userEmail + '/mealPlans')
        console.log('   - Entries: users/' + userEmail + '/calorieEntries')

        // Real-time listener for mealPlans
        unsubscribe.value = onSnapshot(
          mealPlansQuery,
          (mealSnapshot) => {
            console.log('🎯 MealPlans snapshot received! Count:', mealSnapshot.size)

            let totalCalories = 0
            let daysWithEntries = 0
            const dailyMap = { ...dailyCaloriesMap }

            // Process meal plans
            mealSnapshot.forEach((doc) => {
              const data = doc.data()
              const calories = data.calories || 0
              const date = data.date

              console.log(`  📍 Meal: ${data.name} (${calories} cal) on ${date}`)

              if (dailyMap[date] !== undefined) {
                dailyMap[date] += calories
                totalCalories += calories
              }
            })

            // Process calorie entries
            calorieEntriesSnapshot.forEach((doc) => {
              const data = doc.data()
              const calories = data.calories || 0

              // Get date from timestamp or createdAt
              let date = null
              if (data.timestamp) {
                const timestamp = data.timestamp.toDate ? data.timestamp.toDate() : new Date(data.timestamp)
                date = getFormattedDate(timestamp)
              } else if (data.createdAt) {
                const createdAt = data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt)
                date = getFormattedDate(createdAt)
              }

              if (date && dateStrings.includes(date)) {
                console.log(`  🍽️  Entry: ${data.food} (${calories} cal) on ${date}`)
                dailyMap[date] += calories
                totalCalories += calories
              }
            })

            // Count days with entries
            daysWithEntries = dateStrings.filter(dateStr => dailyMap[dateStr] > 0).length

            // Update chart data
            const chartData = dateStrings.map(dateStr => dailyMap[dateStr])
            chartSeries.value[0].data = chartData
            chartOptions.value.xaxis.categories = dayLabels

            // Update average calories
            const avg = daysWithEntries > 0 ? Math.round(totalCalories / daysWithEntries) : 0
            animateCounter(animatedAvgCalories, avg, 1000)

            console.log('✅ Chart updated from both sources!')
            console.log('   📊 Daily breakdown:', dailyMap)
            console.log('   📈 Total calories:', totalCalories)
            console.log('   📅 Days with entries:', daysWithEntries)
            console.log('   ⚡ Average:', avg)
          },
          (error) => {
            console.error('❌ Error setting up listener:', error)
            animateCounter(animatedAvgCalories, 0, 1000)
          }
        )
      } catch (error) {
        console.error('❌ Error fetching calorie data:', error)
        animateCounter(animatedAvgCalories, 0, 1000)
      }
    }

    // ========== DYNAMIC GREETING ==========
    const timeOfDay = computed(() => {
      const hour = new Date().getHours()
      if (hour < 12) return '🌅 Morning'
      if (hour < 17) return '☀️ Afternoon'
      return '🌙 Evening'
    })

    const greeting = computed(() => {
      const hour = new Date().getHours()
      if (hour < 12) return 'Good morning'
      if (hour < 17) return 'Good afternoon'
      return 'Good evening'
    })

    const motivationalText = computed(() => {
      const tips = [
        'Your personalized nutrition hub 🍽️',
        'Ready to fuel your day? 💪',
        "Let's make healthy eating simple 🥗",
        'Time to plan something delicious 👨‍🍳',
        'Your wellness journey starts here 🌟'
      ]
      const dayIndex = new Date().getDay()
      return tips[dayIndex % tips.length]
    })

    // ========== DAILY TIP ==========
    const dailyTip = computed(() => {
      const tips = [
        'Meal prep on Sundays can save up to 5 hours during the week and reduce food waste by 30%. Consider batch cooking proteins and portioning vegetables in advance. 🥘',
        'Staying hydrated is key! Aim for 8 glasses of water daily. Add lemon or cucumber for extra flavor and nutrients. 💧',
        'Protein at breakfast keeps you fuller longer. Try eggs, Greek yogurt, or protein smoothies to start your day right. 🥚',
        'Eating colorful vegetables ensures you get a variety of nutrients. Aim for at least 5 different colors on your plate daily. 🌈',
        'Portion control tip: Use smaller plates to naturally reduce serving sizes without feeling deprived. 🍽️',
        'Healthy fats are essential! Include avocados, nuts, and olive oil in your meals for brain health and satiety. 🥑',
        'Meal timing matters: Try to eat your largest meal earlier in the day when your metabolism is most active. ⏰'
      ]
      const dayIndex = new Date().getDay()
      return tips[dayIndex % tips.length]
    })

    // ========== ADD MEAL MODAL ==========
    const showAddMealModal = ref(false)
    const selectedDateForModal = ref(null)

    function openAddMealDialog() {
      // Open modal for today's date (in local timezone)
      const today = new Date()
      const year = today.getFullYear()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const day = String(today.getDate()).padStart(2, '0')
      selectedDateForModal.value = `${year}-${month}-${day}`
      showAddMealModal.value = true
    }

    function closeAddMealDialog() {
      showAddMealModal.value = false
      selectedDateForModal.value = null
    }

    // Add meal to Firestore from modal
    async function handleMealSubmit(mealData) {
      if (!auth.currentUser) {
        console.warn('⚠️ User not authenticated')
        return
      }

      const userEmail = auth.currentUser.email
      const mealPlansCol = collection(db, 'users', userEmail, 'mealPlans')

      try {
        await addDoc(mealPlansCol, {
          name: mealData.name,
          calories: Number(mealData.calories) || 0,
          type: mealData.type,
          date: mealData.date, // YYYY-MM-DD format
          time: mealData.time,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        })

        console.log('✅ Meal added successfully to mealPlans')
        closeAddMealDialog()
      } catch (error) {
        console.error('❌ Error adding meal:', error)
      }
    }

    return {
      userName,
      currentDate,
      currentDay,
      animatedMealsPlanned,
      animatedRecipesSaved,
      animatedMoneySaved,
      animatedAvgCalories,
      timeOfDay,
      greeting,
      motivationalText,
      dailyTip,
      showAddMealModal,
      selectedDateForModal,
      openAddMealDialog,
      closeAddMealDialog,
      handleMealSubmit,
      chartSeries,
      chartOptions,
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

/* Hide scrollbar but keep functionality */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
