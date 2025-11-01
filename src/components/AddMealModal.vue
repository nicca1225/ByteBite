<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    @click.self="close"
  >
    <div class="bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl p-6 sm:p-8 max-w-md w-full">
      <h2 class="text-2xl font-light text-white mb-6">{{ title }}</h2>

      <form @submit.prevent="submit" class="space-y-5">
        <div>
          <label class="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Meal Type</label>
          <select
            v-model="formData.type"
            required
            class="w-full p-3 bg-black border border-gray-800 rounded-lg text-white focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors"
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Meal Name</label>
          <input
            v-model="formData.name"
            type="text"
            placeholder="e.g., Grilled Chicken Salad"
            required
            class="w-full p-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Calories</label>
            <input
              v-model.number="formData.calories"
              type="number"
              placeholder="450"
              class="w-full p-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors"
            />
          </div>

          <div>
            <label class="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Time</label>
            <input
              v-model="formData.time"
              type="time"
              class="w-full p-3 bg-black border border-gray-800 rounded-lg text-white focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors"
            />
          </div>
        </div>

        <div v-if="dateError" class="text-red-400 text-sm">
          {{ dateError }}
        </div>

        <div class="flex gap-3 pt-2">
          <button
            type="submit"
            class="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-medium py-3 rounded-lg transition-colors"
          >
            Add Meal
          </button>
          <button
            type="button"
            @click="close"
            class="flex-1 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white font-medium py-3 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  selectedDate: {
    type: String,
    default: null // Format: YYYY-MM-DD
  },
  title: {
    type: String,
    default: 'Add Meal'
  }
})

const emit = defineEmits(['close', 'submit'])

const formData = ref({
  type: 'Breakfast',
  name: '',
  calories: null,
  time: ''
})

const dateError = ref('')

// Initialize date from props or use today (in local timezone)
const getDefaultDate = () => {
  if (props.selectedDate) {
    return props.selectedDate
  }
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const currentDate = ref(getDefaultDate())

// Watch for selectedDate changes
const updateDate = () => {
  if (props.selectedDate) {
    currentDate.value = props.selectedDate
  }
}

const close = () => {
  resetForm()
  emit('close')
}

const resetForm = () => {
  formData.value = {
    type: 'Breakfast',
    name: '',
    calories: null,
    time: ''
  }
  dateError.value = ''
}

const submit = async () => {
  // Validate
  if (!formData.value.name) {
    dateError.value = 'Please enter a meal name'
    return
  }

  if (!formData.value.calories || formData.value.calories <= 0) {
    dateError.value = 'Please enter valid calories'
    return
  }

  dateError.value = ''

  // Get the date to use
  const dateToUse = props.selectedDate || getDefaultDate()

  // Emit with data
  emit('submit', {
    type: formData.value.type,
    name: formData.value.name,
    calories: formData.value.calories,
    time: formData.value.time,
    date: dateToUse
  })

  resetForm()
}

// Update date when selectedDate prop changes
watch(() => props.selectedDate, updateDate)
</script>
