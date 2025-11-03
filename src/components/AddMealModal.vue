<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    @click.self="close"
  >
    <div class="bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
      <h2 class="text-2xl font-light text-white mb-6">{{ title }}</h2>

      <form @submit.prevent="submit" class="space-y-5">
        <!-- Date Picker Section -->
        <div>
          <label class="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Select Date</label>
          <div class="flex items-center gap-2 mb-3">
            <input
              v-model="currentDate"
              type="date"
              class="flex-1 p-3 bg-black border border-gray-800 rounded-lg text-white focus:ring-1 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors"
            />
            <button
              type="button"
              @click="showCalendarPicker = !showCalendarPicker"
              class="p-3 bg-black border border-gray-800 rounded-lg text-gray-400 hover:text-yellow-400 hover:border-yellow-400/50 transition-colors"
              title="Open calendar"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </button>
          </div>

          <!-- Mini Calendar Picker -->
          <div v-if="showCalendarPicker" class="bg-black border border-gray-800 rounded-lg p-3 mb-3">
            <!-- Month Navigation -->
            <div class="flex items-center justify-between mb-3">
              <button
                type="button"
                @click="previousMonth"
                class="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <span class="text-xs font-mono text-gray-400">{{ calendarMonthYear }}</span>
              <button
                type="button"
                @click="nextMonth"
                class="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>

            <!-- Day Headers -->
            <div class="grid grid-cols-7 gap-1 mb-2">
              <div v-for="day in ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']" :key="day" class="text-xs text-gray-500 text-center font-mono">
                {{ day }}
              </div>
            </div>

            <!-- Calendar Days -->
            <div class="grid grid-cols-7 gap-1">
              <button
                v-for="day in calendarDays"
                :key="day.dateStr"
                type="button"
                @click="selectDateFromCalendar(day.dateStr)"
                :class="[
                  'text-xs py-1 rounded transition-colors',
                  !day.isCurrentMonth ? 'text-gray-700 bg-gray-900/30 cursor-default' :
                  day.dateStr === currentDate ? 'bg-yellow-400 text-black font-semibold' :
                  day.isToday ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30' :
                  'text-gray-300 hover:bg-gray-800'
                ]"
                :disabled="!day.isCurrentMonth"
              >
                {{ day.dayNumber }}
              </button>
            </div>
          </div>

          <div v-if="dateError" class="text-red-400 text-sm mb-2">
            {{ dateError }}
          </div>
        </div>

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
const showCalendarPicker = ref(false)
const calendarMonth = ref(new Date().getMonth())
const calendarYear = ref(new Date().getFullYear())

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

// Calendar month/year display
const calendarMonthYear = computed(() => {
  const date = new Date(calendarYear.value, calendarMonth.value)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
})

// Generate calendar days
const calendarDays = computed(() => {
  const firstDay = new Date(calendarYear.value, calendarMonth.value, 1)
  const lastDay = new Date(calendarYear.value, calendarMonth.value + 1, 0)
  const prevLastDay = new Date(calendarYear.value, calendarMonth.value, 0)

  const firstDayOfWeek = firstDay.getDay()
  const lastDateOfMonth = lastDay.getDate()
  const prevLastDate = prevLastDay.getDate()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const days = []

  // Previous month days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const dayNum = prevLastDate - i
    const date = new Date(calendarYear.value, calendarMonth.value - 1, dayNum)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    days.push({
      dayNumber: dayNum,
      dateStr: `${year}-${month}-${day}`,
      isCurrentMonth: false,
      isToday: false
    })
  }

  // Current month days
  for (let i = 1; i <= lastDateOfMonth; i++) {
    const date = new Date(calendarYear.value, calendarMonth.value, i)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    days.push({
      dayNumber: i,
      dateStr: `${year}-${month}-${day}`,
      isCurrentMonth: true,
      isToday: date.getTime() === today.getTime()
    })
  }

  // Next month days
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(calendarYear.value, calendarMonth.value + 1, i)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    days.push({
      dayNumber: i,
      dateStr: `${year}-${month}-${day}`,
      isCurrentMonth: false,
      isToday: false
    })
  }

  return days
})

// Calendar navigation
const previousMonth = () => {
  if (calendarMonth.value === 0) {
    calendarMonth.value = 11
    calendarYear.value--
  } else {
    calendarMonth.value--
  }
}

const nextMonth = () => {
  if (calendarMonth.value === 11) {
    calendarMonth.value = 0
    calendarYear.value++
  } else {
    calendarMonth.value++
  }
}

const selectDateFromCalendar = (dateStr) => {
  currentDate.value = dateStr
  showCalendarPicker.value = false
}

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
  showCalendarPicker.value = false
  currentDate.value = getDefaultDate()
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

  // Emit with data - use the selected date from input
  emit('submit', {
    type: formData.value.type,
    name: formData.value.name,
    calories: formData.value.calories,
    time: formData.value.time,
    date: currentDate.value
  })

  resetForm()
}

// Update date when selectedDate prop changes
watch(() => props.selectedDate, updateDate)
</script>
