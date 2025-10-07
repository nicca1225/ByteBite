<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <div class="mx-auto h-20 w-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
          <span class="text-3xl">🍽️</span>
        </div>
        <h2 class="text-4xl font-black text-gray-900 mb-2">
          Join ByteBite
        </h2>
        <p class="text-lg text-gray-600 mb-2">
          Start your smart meal planning journey
        </p>
        <p class="text-sm text-gray-500">
          Already have an account?
          <router-link to="/login" class="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors">
            Sign in here
          </router-link>
        </p>
      </div>

      <!-- Google Sign Up -->
      <div class="space-y-4">
        <button
          @click="handleGoogleLogin"
          :disabled="isLoading"
          class="group relative w-full flex justify-center items-center py-4 px-4 border-2 border-gray-300 rounded-2xl bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span class="text-gray-700 font-semibold">
            {{ isLoading ? 'Creating account...' : 'Continue with Google' }}
          </span>
        </button>

        <!-- Divider -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 text-gray-500">Or create account with email</span>
          </div>
        </div>
      </div>

      <!-- Registration Form -->
      <form class="space-y-6" @submit.prevent="handleRegister">
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              id="name"
              v-model="form.name"
              @blur="validateName"
              name="name"
              type="text"
              autocomplete="name"
              required
              :class="[
                'w-full px-4 py-4 border-2 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 bg-white shadow-sm hover:shadow-md',
                validationErrors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-emerald-500 focus:border-emerald-500'
              ]"
              placeholder="Enter your full name"
            />
            <p v-if="validationErrors.name" class="mt-2 text-sm text-red-600">{{ validationErrors.name }}</p>
          </div>

          <div>
            <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              id="email"
              v-model="form.email"
              @blur="validateEmail"
              name="email"
              type="email"
              autocomplete="email"
              required
              :class="[
                'w-full px-4 py-4 border-2 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 bg-white shadow-sm hover:shadow-md',
                validationErrors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-emerald-500 focus:border-emerald-500'
              ]"
              placeholder="Enter your email"
            />
            <p v-if="validationErrors.email" class="mt-2 text-sm text-red-600">{{ validationErrors.email }}</p>
          </div>

          <div>
            <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                @input="validatePassword"
                @blur="validatePassword"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="new-password"
                required
                :class="[
                  'w-full px-4 py-4 pr-12 border-2 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 bg-white shadow-sm hover:shadow-md',
                  validationErrors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-emerald-500 focus:border-emerald-500'
                ]"
                placeholder="Create a password (min. 6 characters)"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700"
              >
                <svg v-if="!showPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
            <div v-if="form.password" class="mt-2">
              <div class="flex items-center space-x-2 mb-1">
                <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    :class="[
                      'h-full transition-all duration-300',
                      passwordStrength === 'weak' ? 'w-1/3 bg-red-500' : '',
                      passwordStrength === 'medium' ? 'w-2/3 bg-yellow-500' : '',
                      passwordStrength === 'strong' ? 'w-full bg-green-500' : ''
                    ]"
                  ></div>
                </div>
                <span :class="[
                  'text-xs font-semibold',
                  passwordStrength === 'weak' ? 'text-red-600' : '',
                  passwordStrength === 'medium' ? 'text-yellow-600' : '',
                  passwordStrength === 'strong' ? 'text-green-600' : ''
                ]">{{ passwordStrength }}</span>
              </div>
            </div>
            <p v-if="validationErrors.password" class="mt-2 text-sm text-red-600">{{ validationErrors.password }}</p>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
            <div class="relative">
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                @blur="validateConfirmPassword"
                name="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                autocomplete="new-password"
                required
                :class="[
                  'w-full px-4 py-4 pr-12 border-2 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 bg-white shadow-sm hover:shadow-md',
                  validationErrors.confirmPassword ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-emerald-500 focus:border-emerald-500'
                ]"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700"
              >
                <svg v-if="!showConfirmPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
            <p v-if="validationErrors.confirmPassword" class="mt-2 text-sm text-red-600">{{ validationErrors.confirmPassword }}</p>
          </div>
        </div>

        <div class="flex items-start">
          <input
            id="agree-terms"
            v-model="form.agreeTerms"
            name="agree-terms"
            type="checkbox"
            required
            class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded mt-1"
          />
          <label for="agree-terms" class="ml-3 block text-sm text-gray-700">
            I agree to the
            <a href="#" class="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors">Terms of Service</a>
            and
            <a href="#" class="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors">Privacy Policy</a>
          </label>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-bold rounded-2xl text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <span v-if="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-6">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            <span v-else class="absolute left-0 inset-y-0 flex items-center pl-6">
              <svg class="h-5 w-5 text-emerald-200 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
            </span>
            {{ isLoading ? 'Creating account...' : 'Create Account' }}
          </button>
        </div>

        <div v-if="error" class="bg-red-50 border border-red-200 rounded-2xl p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-red-800">{{ error }}</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'Register',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    const form = ref({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false
    })

    const isLoading = ref(false)
    const error = ref('')
    const showPassword = ref(false)
    const showConfirmPassword = ref(false)
    const validationErrors = ref({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })

    const passwordStrength = computed(() => {
      const password = form.value.password
      if (!password) return ''

      let strength = 0
      if (password.length >= 8) strength++
      if (password.length >= 12) strength++
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
      if (/\d/.test(password)) strength++
      if (/[^a-zA-Z0-9]/.test(password)) strength++

      if (strength <= 2) return 'weak'
      if (strength <= 3) return 'medium'
      return 'strong'
    })

    const validateName = () => {
      const name = form.value.name.trim()
      if (!name) {
        validationErrors.value.name = 'Name is required'
        return false
      }
      if (name.length < 2) {
        validationErrors.value.name = 'Name must be at least 2 characters'
        return false
      }
      if (!/^[a-zA-Z\s]+$/.test(name)) {
        validationErrors.value.name = 'Name can only contain letters and spaces'
        return false
      }
      validationErrors.value.name = ''
      return true
    }

    const validateEmail = () => {
      const email = form.value.email.trim()
      if (!email) {
        validationErrors.value.email = 'Email is required'
        return false
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        validationErrors.value.email = 'Please enter a valid email address'
        return false
      }
      validationErrors.value.email = ''
      return true
    }

    const validatePassword = () => {
      const password = form.value.password
      if (!password) {
        validationErrors.value.password = 'Password is required'
        return false
      }
      if (password.length < 6) {
        validationErrors.value.password = 'Password must be at least 6 characters'
        return false
      }
      validationErrors.value.password = ''

      // Also validate confirm password if it has a value
      if (form.value.confirmPassword) {
        validateConfirmPassword()
      }
      return true
    }

    const validateConfirmPassword = () => {
      if (!form.value.confirmPassword) {
        validationErrors.value.confirmPassword = 'Please confirm your password'
        return false
      }
      if (form.value.password !== form.value.confirmPassword) {
        validationErrors.value.confirmPassword = 'Passwords do not match'
        return false
      }
      validationErrors.value.confirmPassword = ''
      return true
    }

    const handleRegister = async () => {
      // Clear previous errors
      error.value = ''

      // Validate all fields
      const isNameValid = validateName()
      const isEmailValid = validateEmail()
      const isPasswordValid = validatePassword()
      const isConfirmPasswordValid = validateConfirmPassword()

      if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
        error.value = 'Please fix the errors above'
        return
      }

      if (!form.value.agreeTerms) {
        error.value = 'Please agree to the terms and conditions'
        return
      }

      isLoading.value = true

      try {
        await authStore.register(form.value.name.trim(), form.value.email.trim(), form.value.password)
        // Redirect to login with success message
        router.push({
          path: '/login',
          query: { registered: 'true', email: form.value.email.trim() }
        })
      } catch (err) {
        error.value = err.message || 'Registration failed. Please try again.'
      } finally {
        isLoading.value = false
      }
    }

    const handleGoogleLogin = async () => {
      isLoading.value = true
      error.value = ''

      try {
        await authStore.loginWithGoogle()
        router.push('/home')
      } catch (err) {
        error.value = err.message || 'Google sign-up failed. Please try again.'
      } finally {
        isLoading.value = false
      }
    }

    return {
      form,
      isLoading,
      error,
      showPassword,
      showConfirmPassword,
      validationErrors,
      passwordStrength,
      validateName,
      validateEmail,
      validatePassword,
      validateConfirmPassword,
      handleRegister,
      handleGoogleLogin
    }
  }
}
</script>
