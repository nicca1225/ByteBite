<template>
  <div class="text-center p-8 bg-white rounded-2xl shadow-lg my-8">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ msg }}</h2>
    <p class="text-gray-600 mb-6">This is a sample component to get you started with Vue.js development and Tailwind CSS.</p>
    <button 
      @click="increment" 
      class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
    >
      Count: {{ count }}
    </button>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: 'Hello Vue!'
    }
  },
  setup() {
    const count = ref(0)
    
    const increment = () => {
      count.value++
    }
    
    return {
      count,
      increment
    }
  }
}
</script>
