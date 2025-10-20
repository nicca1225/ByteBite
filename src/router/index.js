import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Landing from '../views/Landing.vue'
import UserHome from '../views/UserHome.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import FindRecipes from '../views/FindRecipes.vue'
import RecipeDetail from '../views/RecipeDetail.vue'
import CalorieTracker from '../views/CalorieTracker.vue'
import PlanMeal from '../views/PlanMeal.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing,
      meta: { requiresGuest: true }
    },
    {
      path: '/home',
      name: 'home',
      component: UserHome,
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { requiresGuest: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/find-recipes',
      name: 'find-recipes',
      component: FindRecipes,
      meta: { requiresAuth: true } // keep it behind auth like /home
    },
    {
      path: '/recipe/:id',
      name: 'recipe-detail',
      component: RecipeDetail,
      meta: { requiresAuth: true }
    },
    {
      path: '/calorie-tracker',
      name: 'calorie-tracker',
      component: CalorieTracker,
      meta: { requiresAuth: true }
    },
    {
      path: '/plan-meal',
      name: 'plan-meal',
      component: PlanMeal,
      meta: { requiresAuth: true }
    }
  ]
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Initialize Firebase auth state and wait for it
  if (!authStore.authInitialized) {
    await new Promise((resolve) => {
      authStore.initializeAuth()
      // Wait maximum 500ms for auth to initialize
      const timeout = setTimeout(resolve, 500)
      // Check every 50ms if auth is initialized
      const interval = setInterval(() => {
        if (authStore.authInitialized) {
          clearTimeout(timeout)
          clearInterval(interval)
          resolve()
        }
      }, 50)
    })
  }

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
    return
  }

  // Check if route requires guest (not authenticated)
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/home')
    return
  }

  next()
})

export default router
