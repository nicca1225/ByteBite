<template>
  <transition name="toast">
    <div
      v-if="visible"
      :class="[
        'fixed top-4 right-4 z-50 px-6 py-4 rounded-2xl shadow-2xl max-w-md flex items-start space-x-3 backdrop-blur-sm',
        type === 'success' ? 'bg-emerald-50 border-2 border-emerald-200' : '',
        type === 'error' ? 'bg-red-50 border-2 border-red-200' : '',
        type === 'info' ? 'bg-blue-50 border-2 border-blue-200' : ''
      ]"
    >
      <div class="flex-shrink-0">
        <svg v-if="type === 'success'" class="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <svg v-if="type === 'error'" class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <svg v-if="type === 'info'" class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <div class="flex-1">
        <p :class="[
          'font-semibold text-sm',
          type === 'success' ? 'text-emerald-900' : '',
          type === 'error' ? 'text-red-900' : '',
          type === 'info' ? 'text-blue-900' : ''
        ]">{{ message }}</p>
      </div>
      <button @click="close" class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors">
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  </transition>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'Toast',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'info',
      validator: (value) => ['success', 'error', 'info'].includes(value)
    },
    duration: {
      type: Number,
      default: 4000
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const visible = ref(false)

    const close = () => {
      visible.value = false
      setTimeout(() => emit('close'), 300)
    }

    onMounted(() => {
      visible.value = true
      if (props.duration > 0) {
        setTimeout(close, props.duration)
      }
    })

    return {
      visible,
      close
    }
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
