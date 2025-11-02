<template>
  <div id="app" class="min-h-screen flex flex-col bg-black">
    <nav v-if="!isLandingPage" class="sticky top-0 z-50 bg-gradient-to-r from-black via-black to-black backdrop-blur-xl shadow-2xl">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-3">
          <!-- Logo -->
          <router-link :to="isAuthenticated ? '/home' : '/'" class="flex items-center space-x-3 group flex-shrink-0">
            <div class="relative w-16 h-16 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 overflow-hidden ring-2 ring-yellow-400/50 group-hover:ring-yellow-400">
              <img src="/ByteBites.png" alt="ByteBite Logo" class="w-full h-full object-cover" />
            </div>
            <span class="text-2xl font-black text-white group-hover:text-yellow-400 transition-colors duration-300 hidden sm:block">
              Byte<span class="text-yellow-400">Bite</span>
            </span>
          </router-link>

          <!-- Centered Navigation Links - Desktop -->
          <div class="hidden lg:flex items-center justify-center flex-1 mx-8">
            <div class="flex items-center space-x-1 bg-gray-900/50 rounded-full px-6 py-3 backdrop-blur-md border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
              <!-- Find Recipes (Auth Only) -->
              <router-link
                v-if="isAuthenticated"
                to="/find-recipes"
                class="nav-link flex items-center space-x-2 px-4 py-2.5 rounded-full text-gray-300 hover:text-yellow-400 font-semibold transition-all duration-300"
                active-class="bg-yellow-400/20 text-yellow-400"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                </svg>
                <span>Recipes</span>
              </router-link>

              <!-- Meal Planner (Auth Only) -->
              <router-link
                v-if="isAuthenticated"
                to="/plan-meal"
                class="nav-link flex items-center space-x-2 px-4 py-2.5 rounded-full text-gray-300 hover:text-yellow-400 font-semibold transition-all duration-300"
                active-class="bg-yellow-400/20 text-yellow-400"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span>Planner</span>
              </router-link>

              <!-- Calorie Tracker (Auth Only) -->
              <router-link
                v-if="isAuthenticated"
                to="/calorie-tracker"
                class="nav-link flex items-center space-x-2 px-4 py-2.5 rounded-full text-gray-300 hover:text-yellow-400 font-semibold transition-all duration-300"
                active-class="bg-yellow-400/20 text-yellow-400"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <span>Calories</span>
              </router-link>

              <!-- Budget Tracker (Auth Only) -->
              <router-link
                v-if="isAuthenticated"
                to="/budget-tracker"
                class="nav-link flex items-center space-x-2 px-4 py-2.5 rounded-full text-gray-300 hover:text-yellow-400 font-semibold transition-all duration-300"
                active-class="bg-yellow-400/20 text-yellow-400"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Budget</span>
              </router-link>

              <!-- Shopping List (Auth Only) -->
              <router-link
                v-if="isAuthenticated"
                to="/shopping-list"
                class="nav-link flex items-center space-x-2 px-4 py-2.5 rounded-full text-gray-300 hover:text-yellow-400 font-semibold transition-all duration-300"
                active-class="bg-yellow-400/20 text-yellow-400"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
                <span>Shopping</span>
              </router-link>

              <!-- Favourites (Auth Only) -->
              <router-link
                v-if="isAuthenticated"
                to="/favourites"
                class="nav-link flex items-center space-x-2 px-4 py-2.5 rounded-full text-gray-300 hover:text-yellow-400 font-semibold transition-all duration-300"
                active-class="bg-yellow-400/20 text-yellow-400"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                <span>Saved</span>
              </router-link>
            </div>
          </div>

          <!-- Right Side: Auth Buttons / User Menu -->
          <div class="hidden lg:flex items-center space-x-4 flex-shrink-0">
            <!-- Auth Buttons (Not Authenticated) -->
            <div v-if="!isAuthenticated" class="flex items-center space-x-3">
              <router-link
                to="/login"
                class="text-gray-300 hover:text-yellow-400 font-semibold transition-colors duration-300 px-4 py-2"
              >
                Sign In
              </router-link>
              <router-link
                to="/register"
                class="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black px-6 py-2.5 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                </svg>
                <span>Get Started</span>
              </router-link>
            </div>

            <!-- User Menu (Authenticated) -->
            <div v-if="isAuthenticated" class="relative group flex-shrink-0">
              <button class="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-all duration-300 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 px-4 py-2.5 rounded-full border border-yellow-400/20 hover:border-yellow-400/50 shadow-lg">
                <div class="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-black font-bold text-sm ring-2 ring-yellow-400/50">
                  {{ userName.charAt(0).toUpperCase() }}
                </div>
                <span class="font-semibold">{{ userName }}</span>
                <svg class="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <!-- Dropdown Menu -->
              <div class="absolute right-0 mt-2 w-56 bg-gradient-to-b from-gray-900 to-black rounded-2xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-yellow-400/30 backdrop-blur-md">
                <router-link to="/dashboard" class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800/50 hover:text-yellow-400 transition-all duration-200 group/item">
                  <svg class="w-5 h-5 mr-3 text-yellow-400 group-hover/item:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Profile
                </router-link>
                <router-link to="/about" class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800/50 hover:text-yellow-400 transition-all duration-200 group/item">
                  <svg class="w-5 h-5 mr-3 text-yellow-400 group-hover/item:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  About
                </router-link>
                <div class="border-t border-yellow-400/20 my-2"></div>
                <button @click="handleLogout" class="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-red-900/30 hover:text-red-400 transition-all duration-200 group/item">
                  <svg class="w-5 h-5 mr-3 text-red-400 group-hover/item:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          <!-- Mobile Menu Button -->
          <div class="lg:hidden flex items-center space-x-4">
            <button @click="toggleMobileMenu" class="text-gray-300 hover:text-yellow-400 transition-colors duration-300 p-2 hover:bg-gray-900/50 rounded-lg">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div v-if="showMobileMenu" class="lg:hidden py-4 bg-gradient-to-b from-gray-900/50 to-black">
          <div class="space-y-2">
            <!-- Find Recipes (Auth Only) -->
            <router-link v-if="isAuthenticated" to="/find-recipes" @click="showMobileMenu = false" class="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-yellow-400 hover:bg-gray-900/50 font-semibold transition-all duration-300 rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
              </svg>
              <span>Find Recipes</span>
            </router-link>

            <!-- Meal Planner (Auth Only) -->
            <router-link v-if="isAuthenticated" to="/plan-meal" @click="showMobileMenu = false" class="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-yellow-400 hover:bg-gray-900/50 font-semibold transition-all duration-300 rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>Meal Planner</span>
            </router-link>

            <!-- Calorie Tracker (Auth Only) -->
            <router-link v-if="isAuthenticated" to="/calorie-tracker" @click="showMobileMenu = false" class="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-yellow-400 hover:bg-gray-900/50 font-semibold transition-all duration-300 rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <span>Calorie Tracker</span>
            </router-link>

            <!-- Budget Tracker (Auth Only) -->
            <router-link v-if="isAuthenticated" to="/budget-tracker" @click="showMobileMenu = false" class="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-yellow-400 hover:bg-gray-900/50 font-semibold transition-all duration-300 rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Budget Tracker</span>
            </router-link>

            <!-- Shopping List (Auth Only) -->
            <router-link v-if="isAuthenticated" to="/shopping-list" @click="showMobileMenu = false" class="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-yellow-400 hover:bg-gray-900/50 font-semibold transition-all duration-300 rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              <span>Shopping List</span>
            </router-link>

            <!-- Favourites (Auth Only) -->
            <router-link v-if="isAuthenticated" to="/favourites" @click="showMobileMenu = false" class="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-yellow-400 hover:bg-gray-900/50 font-semibold transition-all duration-300 rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              <span>Saved Recipes</span>
            </router-link>

            <!-- Auth Section -->
            <div v-if="!isAuthenticated" class="space-y-2 pt-4 border-t border-yellow-400/30 mt-4">
              <router-link to="/login" @click="showMobileMenu = false" class="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-yellow-400 hover:bg-gray-900/50 font-semibold transition-all duration-300 rounded-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                <span>Sign In</span>
              </router-link>
              <router-link to="/register" @click="showMobileMenu = false" class="flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black px-6 py-3 rounded-lg font-bold transition-all duration-300">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                </svg>
                <span>Get Started</span>
              </router-link>
            </div>

            <div v-if="isAuthenticated" class="space-y-2 pt-4 border-t border-yellow-400/30 mt-4">
              <router-link to="/dashboard" @click="showMobileMenu = false" class="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-yellow-400 hover:bg-gray-900/50 font-semibold transition-all duration-300 rounded-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                <span>Dashboard</span>
              </router-link>
              <button @click="handleLogoutMobile" class="flex items-center space-x-3 w-full px-4 py-3 text-gray-300 hover:text-red-400 hover:bg-red-900/20 font-semibold transition-all duration-300 rounded-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    
    <main class="flex-1">
      <router-view />
    </main>
    
    <footer v-if="!isLandingPage" class="bg-black border-t border-yellow-400/30 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="flex items-center justify-center space-x-3 mb-4">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden">
              <img src="/ByteBites.png" alt="ByteBite Logo" class="w-full h-full object-cover" />
            </div>
            <span class="text-xl font-black text-white">
              Byte<span class="text-yellow-400">Bite</span>
            </span>
          </div>
          <p class="text-gray-400 mb-4">Smart meal planning for students</p>
          <p class="text-sm text-gray-500">&copy; 2025 ByteBite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { showToast } from '@/utils/toast'

export default {
  name: 'App',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const authStore = useAuthStore()

    const isAuthenticated = computed(() => authStore.isAuthenticated)
    const userName = computed(() => authStore.userName)
    const showMobileMenu = ref(false)
    const isLandingPage = computed(() => route.path === '/')

    const handleLogout = async () => {
      await authStore.logout()
      showMobileMenu.value = false
      showToast('Logged out successfully', 'success')
      // Redirect to landing page after logout
      router.push('/')
    }

    const handleLogoutMobile = async () => {
      await handleLogout()
    }

    const toggleMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value
    }

    onMounted(() => {
      // Initialize auth state on app start
      authStore.initializeAuth()
    })

    return {
      isAuthenticated,
      userName,
      showMobileMenu,
      isLandingPage,
      handleLogout,
      handleLogoutMobile,
      toggleMobileMenu
    }
  }
}
</script>

<style scoped>
/* Navigation Link Animations */
.nav-link {
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: rgba(250, 204, 21, 0.1);
  transition: left 0.3s ease;
  z-index: -1;
}

.nav-link:hover::before {
  left: 0;
}

/* Smooth transitions for nav elements */
nav {
  animation: slideDown 0.5s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Logo pulse effect on hover */
.group:hover img {
  filter: brightness(1.1);
}

/* Responsive navigation */
@media (max-width: 768px) {
  .nav-container {
    @apply flex-col gap-4;
  }

  .nav-menu {
    @apply gap-4;
  }
}

/* Dropdown menu smooth animation */
@media (hover: hover) {
  .group:hover > div:last-child {
    animation: slideDownMenu 0.3s ease-out;
  }
}

@keyframes slideDownMenu {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Active link styling */
.nav-link.router-link-active {
  background-color: rgba(250, 204, 21, 0.2);
  color: rgb(250, 204, 21);
}

/* Mobile menu smooth transitions */
@media (max-width: 1024px) {
  [role="navigation"] {
    transition: all 0.3s ease;
  }
}
</style>
