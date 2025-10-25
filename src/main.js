import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './style.css'
import VueApexCharts from 'vue3-apexcharts'

// Debug: Check if environment variables are loaded
console.log('Environment check:', {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? 'Loaded' : 'Missing',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ? 'Loaded' : 'Missing'
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueApexCharts)

app.mount('#app')
