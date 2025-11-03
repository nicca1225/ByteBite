<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    @click.self="close"
  >
    <div class="bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-light text-white">Edit Meal</h2>
        <button
          @click="close"
          class="w-8 h-8 rounded-lg border border-gray-700 hover:border-gray-600 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <form @submit.prevent="submit" class="space-y-5">
        <!-- Image Upload Section -->
        <div>
          <label class="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Meal Image (Optional)</label>
          <div class="relative">
            <!-- Image Preview or Placeholder -->
            <div class="w-full h-40 bg-black border border-gray-800 rounded-lg overflow-hidden flex items-center justify-center mb-3">
              <img
                v-if="preview"
                :src="preview"
                :alt="formData.name"
                class="w-full h-full object-cover"
              />
              <div v-else class="text-4xl opacity-30">
                {{ getMealTypeEmoji(formData.type) }}
              </div>
            </div>

            <!-- File Input -->
            <div class="flex items-center gap-2">
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                @change="handleImageUpload"
                class="hidden"
              />
              <button
                type="button"
                @click="$refs.fileInput.click()"
                class="flex-1 px-3 py-2 bg-yellow-400 text-black text-sm font-medium rounded-lg hover:bg-yellow-300 transition-colors flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
                <span>Upload Image</span>
              </button>
              <button
                v-if="preview"
                type="button"
                @click="removeImage"
                class="px-3 py-2 bg-red-900/20 text-red-300 border border-red-500/30 rounded-lg hover:bg-red-900/40 transition-colors text-sm font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        <!-- Meal Type -->
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

        <!-- Meal Name -->
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

        <!-- Calories and Time -->
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

        <!-- Error Message -->
        <div v-if="error" class="text-red-400 text-sm">
          {{ error }}
        </div>

        <!-- Buttons -->
        <div class="flex gap-3 pt-2">
          <button
            type="submit"
            :disabled="isUploading"
            class="flex-1 bg-yellow-400 hover:bg-yellow-300 disabled:bg-gray-600 text-black font-medium py-3 rounded-lg transition-colors"
          >
            {{ isUploading ? 'Saving...' : 'Save Changes' }}
          </button>
          <button
            type="button"
            @click="close"
            class="flex-1 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white font-medium py-3 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>

        <!-- Delete Button -->
        <button
          type="button"
          @click="deleteMeal"
          class="w-full px-4 py-2 bg-red-900/20 text-red-300 border border-red-500/30 rounded-lg hover:bg-red-900/40 transition-colors text-sm font-medium"
        >
          Delete Meal
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  meal: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'submit', 'delete'])

const formData = ref({
  type: 'Breakfast',
  name: '',
  calories: null,
  time: ''
})

const preview = ref(null)
const imageFile = ref(null)
const error = ref('')
const isUploading = ref(false)
const fileInput = ref(null)
const storage = getStorage()

// Initialize form when meal prop changes
const initializeForm = () => {
  if (props.meal) {
    formData.value = {
      type: props.meal.type || 'Breakfast',
      name: props.meal.name || '',
      calories: props.meal.calories || null,
      time: props.meal.time || ''
    }
    preview.value = props.meal.imageUrl || null
    imageFile.value = null
  }
}

const handleImageUpload = (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  // Validate file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    error.value = 'Image must be less than 5MB'
    return
  }

  imageFile.value = file
  const reader = new FileReader()
  reader.onload = (e) => {
    preview.value = e.target?.result
  }
  reader.readAsDataURL(file)
  error.value = ''
}

const removeImage = () => {
  preview.value = null
  imageFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const getMealTypeEmoji = (type) => {
  const emojis = {
    'Breakfast': '🥞',
    'Lunch': '🥗',
    'Dinner': '🍝',
    'Snack': '🍎'
  }
  return emojis[type] || '🍽️'
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
  preview.value = null
  imageFile.value = null
  error.value = ''
}

const submit = async () => {
  // Validate
  if (!formData.value.name) {
    error.value = 'Please enter a meal name'
    return
  }

  if (!formData.value.calories || formData.value.calories <= 0) {
    error.value = 'Please enter valid calories'
    return
  }

  isUploading.value = true
  error.value = ''

  try {
    let imageUrl = preview.value && !imageFile.value ? props.meal.imageUrl : null

    // Upload image if new one selected
    if (imageFile.value) {
      const timestamp = Date.now()
      const filename = `meals/${props.meal.id}_${timestamp}`
      const mealStorageRef = storageRef(storage, filename)

      const snapshot = await uploadBytes(mealStorageRef, imageFile.value)
      imageUrl = await getDownloadURL(snapshot.ref)
    }

    // Emit submit with updated data
    emit('submit', {
      id: props.meal.id,
      type: formData.value.type,
      name: formData.value.name,
      calories: formData.value.calories,
      time: formData.value.time,
      imageUrl: imageUrl,
      date: props.meal.date
    })

    resetForm()
  } catch (err) {
    console.error('Error saving meal:', err)
    error.value = 'Failed to save meal. Please try again.'
  } finally {
    isUploading.value = false
  }
}

const deleteMeal = async () => {
  if (!confirm('Are you sure you want to delete this meal?')) {
    return
  }

  try {
    // Delete image from storage if exists
    if (props.meal.imageUrl && props.meal.imageUrl.includes('firebasestorage')) {
      try {
        const imageRef = storageRef(storage, `meals/${props.meal.id}*`)
        // Note: Firebase doesn't support wildcard deletes, so we'll just let it be
      } catch (err) {
        console.warn('Could not delete image:', err)
      }
    }

    emit('delete', props.meal.id)
    resetForm()
  } catch (err) {
    console.error('Error deleting meal:', err)
    error.value = 'Failed to delete meal. Please try again.'
  }
}

// Initialize form when component mounts or meal prop changes
watch(() => props.meal, initializeForm, { immediate: true, deep: true })
</script>
