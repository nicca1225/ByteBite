<template>
  <div class="bg-black text-white p-6 rounded-lg border border-red-500/50 m-4">
    <h2 class="text-xl font-bold mb-4">🔍 Firestore Diagnostic Tool</h2>

    <button
      @click="runDiagnostics"
      class="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-medium rounded mb-4"
    >
      Run Diagnostics
    </button>

    <div class="space-y-3 font-mono text-sm bg-gray-900 p-4 rounded">
      <div v-if="loading" class="text-yellow-400">⏳ Running diagnostics...</div>

      <div v-for="(log, index) in logs" :key="index" :class="getLogColor(log.type)">
        {{ log.message }}
      </div>
    </div>

    <div v-if="diagnosticData" class="mt-4 space-y-2">
      <div class="bg-gray-900 p-4 rounded">
        <h3 class="font-bold mb-2">📊 Data Found:</h3>
        <pre class="text-xs overflow-auto">{{ JSON.stringify(diagnosticData, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

export default {
  name: 'FirestoreDiagnostic',
  setup() {
    const logs = ref([])
    const loading = ref(false)
    const diagnosticData = ref(null)
    const db = getFirestore()
    const auth = getAuth()

    const addLog = (message, type = 'info') => {
      logs.value.push({ message, type })
      console.log(`[${type.toUpperCase()}] ${message}`)
    }

    const getLogColor = (type) => {
      const colors = {
        info: 'text-blue-400',
        success: 'text-green-400',
        error: 'text-red-400',
        warn: 'text-yellow-400',
      }
      return colors[type] || 'text-gray-400'
    }

    const runDiagnostics = async () => {
      logs.value = []
      loading.value = true
      diagnosticData.value = null

      try {
        // Step 1: Check authentication
        addLog('Step 1: Checking authentication...', 'info')
        if (!auth.currentUser) {
          addLog('❌ No user logged in!', 'error')
          loading.value = false
          return
        }

        const userEmail = auth.currentUser.email
        const uid = auth.currentUser.uid
        addLog(`✅ User authenticated: ${userEmail}`, 'success')
        addLog(`   UID: ${uid}`, 'info')

        // Step 2: Check for email-based user document (direct access)
        addLog('Step 2: Checking for email-based user document...', 'info')
        const userDocRef = doc(db, 'users', userEmail)
        const emailDocSnapshot = await getDoc(userDocRef)

        if (!emailDocSnapshot.exists()) {
          addLog(`❌ No user document found at: users/${userEmail}`, 'error')
          addLog(``, 'info')
          addLog(`⚠️ IMPORTANT - Possible reasons:`, 'warn')
          addLog(`1. Data is stored under OLD UID-based paths (needs migration)`, 'warn')
          addLog(`2. User document hasn't been created yet`, 'warn')
          addLog(``, 'info')
          addLog(`Action: Check Firebase Console:`, 'info')
          addLog(`> Collections > users`, 'info')
          addLog(`Look for: ${uid.substring(0, 8)}... (UID) or ${userEmail}`, 'info')
          loading.value = false
          return
        }

        addLog(`✅ Found user document at: users/${userEmail}`, 'success')
        const userData = emailDocSnapshot.data()
        addLog(`   Name: ${userData.name}`, 'info')
        addLog(`   Email: ${userData.email}`, 'info')

        // Step 3: Check for meals
        addLog('Step 3: Checking for meal plans...', 'info')
        const mealsSnapshot = await getDocs(
          collection(db, 'users', userEmail, 'mealPlans')
        )

        if (mealsSnapshot.empty) {
          addLog(`⚠️  No meal plans found in users/${userEmail}/mealPlans`, 'warn')
          addLog(`   This is OK if you just added the data. Try adding a meal!`, 'info')
        } else {
          addLog(`✅ Found ${mealsSnapshot.size} meal(s)`, 'success')

          const meals = []
          mealsSnapshot.forEach((doc) => {
            const data = doc.data()
            addLog(`   📍 ${data.name} (${data.calories} cal) on ${data.date}`, 'info')
            meals.push({
              id: doc.id,
              ...data
            })
          })

          // Check date format
          addLog('Step 4: Checking date format...', 'info')
          const today = new Date()
          const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
          addLog(`   Expected format: ${formattedDate} (YYYY-MM-DD)`, 'info')

          const firstMeal = meals[0]
          if (firstMeal.date === formattedDate) {
            addLog('✅ Date format is CORRECT!', 'success')
          } else {
            addLog(`⚠️  First meal date: ${firstMeal.date}`, 'warn')
            addLog('   Expected format: YYYY-MM-DD (e.g., 2025-11-03)', 'info')
          }

          diagnosticData.value = {
            userEmail,
            uid,
            userDocPath: `users/${userEmail}`,
            mealsFound: meals.length,
            meals,
          }
        }

        addLog('', 'info')
        addLog('✅ Diagnostics complete!', 'success')
        addLog('', 'info')
        addLog('If meals found and dates are correct, graph should update!', 'success')

      } catch (error) {
        addLog(`❌ Diagnostic error: ${error.message}`, 'error')
        if (error.code === 'permission-denied') {
          addLog('', 'warn')
          addLog('⚠️ PERMISSION ISSUE DETECTED:', 'warn')
          addLog('Your Firestore rules may not be deployed correctly.', 'warn')
          addLog('', 'warn')
          addLog('Next steps:', 'info')
          addLog('1. Go to Firebase Console', 'info')
          addLog('2. Open Firestore > Rules tab', 'info')
          addLog('3. Copy rules from firestore.rules file', 'info')
          addLog('4. Paste and click "Publish"', 'info')
        }
        console.error(error)
      } finally {
        loading.value = false
      }
    }

    return {
      logs,
      loading,
      diagnosticData,
      runDiagnostics,
      getLogColor,
    }
  }
}
</script>
