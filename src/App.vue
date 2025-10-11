<template>
  <div id="app" class="min-h-screen flex flex-col bg-black">
    <nav v-if="!isLandingPage" class="bg-black/90 backdrop-blur-md border-b border-yellow-400/30 shadow-lg sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <!-- Logo -->
          <router-link :to="isAuthenticated ? '/home' : '/'" class="flex items-center space-x-3 group">
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 overflow-hidden">
              <img src="/ByteBites.png" alt="ByteBite Logo" class="w-full h-full object-cover" />
            </div>
            <span class="text-2xl font-black text-white group-hover:text-yellow-400 transition-colors duration-300">
              Byte<span class="text-yellow-400">Bite</span>
            </span>
          </router-link>
          
          <!-- Navigation Links -->
          <div class="hidden md:flex items-center space-x-8">
            <router-link
              v-if="!isAuthenticated"
              to="/"
              class="text-gray-300 hover:text-yellow-400 font-semibold transition-colors duration-300 relative group"
              active-class="text-yellow-400"
            >
              Home
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </router-link>
            <router-link
              v-if="isAuthenticated"
              to="/home"
              class="text-gray-300 hover:text-yellow-400 font-semibold transition-colors duration-300 relative group"
              active-class="text-yellow-400"
            >
              Home
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </router-link>
            <router-link
              to="/about"
              class="text-gray-300 hover:text-yellow-400 font-semibold transition-colors duration-300 relative group"
              active-class="text-yellow-400"
            >
              About
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </router-link>
            
            <!-- Auth Buttons -->
            <div v-if="!isAuthenticated" class="flex items-center space-x-4">
              <router-link
                to="/login"
                class="text-gray-300 hover:text-yellow-400 font-semibold transition-colors duration-300"
              >
                Sign In
              </router-link>
              <router-link
                to="/register"
                class="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2.5 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get Started
              </router-link>
            </div>
            
            <!-- User Menu -->
            <div v-if="isAuthenticated" class="relative group">
              <button class="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-colors duration-300 bg-gray-800 hover:bg-gray-700 px-4 py-2.5 rounded-2xl">
                <div class="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-semibold text-sm">
                  {{ userName.charAt(0).toUpperCase() }}
                </div>
                <span class="font-semibold">{{ userName }}</span>
                <svg class="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div class="absolute right-0 mt-2 w-56 bg-gray-900 rounded-2xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-yellow-400/30">
                <router-link to="/dashboard" class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-yellow-400 transition-colors duration-200">
                  <svg class="w-5 h-5 mr-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  Dashboard
                </router-link>
                <button @click="handleLogout" class="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-red-400 transition-colors duration-200">
                  <svg class="w-5 h-5 mr-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
          
          <!-- Mobile Menu Button -->
          <div class="md:hidden">
            <button @click="toggleMobileMenu" class="text-gray-300 hover:text-yellow-400 transition-colors duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div v-if="showMobileMenu" class="md:hidden py-4 border-t border-yellow-400/30">
          <div class="space-y-4">
            <router-link v-if="!isAuthenticated" to="/" class="block text-gray-300 hover:text-yellow-400 font-semibold transition-colors duration-300">Home</router-link>
            <router-link v-if="isAuthenticated" to="/home" class="block text-gray-300 hover:text-yellow-400 font-semibold transition-colors duration-300">Home</router-link>
            <router-link to="/about" class="block text-gray-300 hover:text-yellow-400 font-semibold transition-colors duration-300">About</router-link>

            <div v-if="!isAuthenticated" class="space-y-4 pt-4 border-t border-yellow-400/30">
              <router-link to="/login" class="block text-gray-300 hover:text-yellow-400 font-semibold transition-colors duration-300">Sign In</router-link>
              <router-link to="/register" class="block bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-2xl font-semibold text-center transition-all duration-300">Get Started</router-link>
            </div>

            <div v-if="isAuthenticated" class="space-y-4 pt-4 border-t border-yellow-400/30">
              <router-link to="/dashboard" class="block text-gray-300 hover:text-yellow-400 font-semibold transition-colors duration-300">Dashboard</router-link>
              <button @click="handleLogout" class="block w-full text-left text-gray-300 hover:text-red-400 font-semibold transition-colors duration-300">Sign Out</button>
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
      toggleMobileMenu
    }
  }
}
</script>

<style scoped>
/* Responsive navigation */
@media (max-width: 768px) {
  .nav-container {
    @apply flex-col gap-4;
  }
  
  .nav-menu {
    @apply gap-4;
  }
}
</style>
