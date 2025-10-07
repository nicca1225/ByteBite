import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/config/firebase'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const isLoading = ref(false)
  const authInitialized = ref(false)

  // Getters
  const isAuthenticated = computed(() => !!user.value)
  const userName = computed(() => user.value?.displayName || user.value?.email?.split('@')[0] || '')
  const userEmail = computed(() => user.value?.email || '')

  // Actions
  async function login(email, password) {
    isLoading.value = true
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
      return userCredential
    } catch (error) {
      let errorMessage = 'Login failed. Please try again.'
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address.'
          break
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password.'
          break
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.'
          break
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled.'
          break
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later.'
          break
        default:
          errorMessage = error.message || errorMessage
      }
      
      throw new Error(errorMessage)
    } finally {
      isLoading.value = false
    }
  }

  async function register(name, email, password) {
    isLoading.value = true

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      // Update user state immediately
      user.value = userCredential.user

      // Update the user's display name (don't wait)
      updateProfile(userCredential.user, {
        displayName: name
      }).catch(err => console.error('Profile update error:', err))

      // Create user document in Firestore (don't wait - do in background)
      setDoc(doc(db, 'users', userCredential.user.uid), {
        name: name,
        email: email,
        createdAt: new Date(),
        preferences: {
          dietaryRestrictions: [],
          allergies: [],
          budget: 0,
          fitnessGoals: ''
        }
      }).catch(err => console.error('Firestore error:', err))

      // Sign out immediately after registration so user can login fresh
      await signOut(auth)
      user.value = null

      return userCredential
    } catch (error) {
      let errorMessage = 'Registration failed. Please try again.'

      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists.'
          break
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.'
          break
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled.'
          break
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please choose a stronger password.'
          break
        default:
          errorMessage = error.message || errorMessage
      }

      throw new Error(errorMessage)
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    try {
      await signOut(auth)
      user.value = null
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  function initializeAuth() {
    if (authInitialized.value) return
    
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser
      authInitialized.value = true
    })
  }

  async function loginWithGoogle() {
    isLoading.value = true

    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)

      // Update user state immediately
      user.value = userCredential.user

      // Check if user document exists and create if needed (do in background)
      getDoc(doc(db, 'users', userCredential.user.uid)).then(userDoc => {
        if (!userDoc.exists()) {
          setDoc(doc(db, 'users', userCredential.user.uid), {
            name: userCredential.user.displayName,
            email: userCredential.user.email,
            createdAt: new Date(),
            preferences: {
              dietaryRestrictions: [],
              allergies: [],
              budget: 0,
              fitnessGoals: ''
            }
          }).catch(err => console.error('Firestore error:', err))
        }
      }).catch(err => console.error('Firestore check error:', err))

      return userCredential
    } catch (error) {
      let errorMessage = 'Google sign-in failed. Please try again.'

      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign-in was cancelled.'
          break
        case 'auth/popup-blocked':
          errorMessage = 'Popup was blocked. Please allow popups and try again.'
          break
        case 'auth/cancelled-popup-request':
          errorMessage = 'Sign-in was cancelled.'
          break
        default:
          errorMessage = error.message || errorMessage
      }

      throw new Error(errorMessage)
    } finally {
      isLoading.value = false
    }
  }

  async function getUserProfile() {
    if (!user.value) return null
    
    try {
      const userDoc = await getDoc(doc(db, 'users', user.value.uid))
      return userDoc.exists() ? userDoc.data() : null
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return null
    }
  }

  return {
    // State
    user,
    isLoading,
    authInitialized,
    // Getters
    isAuthenticated,
    userName,
    userEmail,
    // Actions
    login,
    register,
    logout,
    initializeAuth,
    loginWithGoogle,
    getUserProfile
  }
})
