import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}

// Check if all required environment variables are present
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID'
]

const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName])

if (missingVars.length > 0) {
  console.error('Missing Firebase environment variables:', missingVars)
  console.error('Please check your .env file')
}

// Initialize Firebase
let app, auth, db, analytics

try {
  console.log('🔥 Initializing Firebase...')
  console.log('📋 Firebase Config:', {
    apiKey: firebaseConfig.apiKey ? '✅ Set' : '❌ Missing',
    authDomain: firebaseConfig.authDomain ? '✅ Set' : '❌ Missing',
    projectId: firebaseConfig.projectId ? '✅ Set' : '❌ Missing',
    storageBucket: firebaseConfig.storageBucket ? '✅ Set' : '❌ Missing',
  })

  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
  analytics = typeof window !== 'undefined' ? getAnalytics(app) : null

  console.log('✅ Firebase initialized successfully')
  console.log('✅ Firestore database:', db ? 'Connected' : 'Not connected')
  console.log('✅ Auth:', auth ? 'Initialized' : 'Not initialized')
} catch (error) {
  console.error('❌ Firebase initialization error:', error)
  console.error('Error details:', error.message)
}

export { auth, db, analytics }
export default app
