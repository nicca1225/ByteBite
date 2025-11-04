<template>
  <div v-if="selectedPeriod === 'week' || selectedPeriod === 'month'" class="w-full bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-xl p-6 sm:p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-light text-white">Progress Overview</h2>
      <div class="text-xs font-mono uppercase tracking-wider text-gray-500">
        <span v-if="selectedPeriod === 'week'">Last 7 Days</span>
        <span v-else-if="selectedPeriod === 'month'">Last 4 Weeks</span>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoadingChart" class="flex items-center justify-center py-20">
      <svg class="animate-spin h-8 w-8 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span class="ml-3 text-gray-400 font-mono">Loading chart...</span>
    </div>

    <!-- Chart Container - Week View (Line Chart) -->
    <div v-if="selectedPeriod === 'week' && !isLoadingChart" class="mb-8">
      <VueApexCharts
        :options="chartOptions"
        :series="chartSeries"
        type="line"
        height="350"
      />
    </div>

    <!-- Chart Container - Month View (Line Chart) -->
    <div v-if="selectedPeriod === 'month' && !isLoadingChart" class="mb-8">
      <VueApexCharts
        :options="chartOptions"
        :series="chartSeries"
        type="line"
        height="350"
      />
    </div>

    <!-- Legend Information - Week View -->
    <div v-if="selectedPeriod === 'week'" class="flex gap-6 justify-center mb-6">
      <div class="flex items-center gap-2">
        <div class="w-6 h-4 rounded-sm" style="background-color: #facc15;"></div>
        <span class="text-sm text-gray-400 font-mono">Daily Intake</span>
      </div>
    </div>

    <!-- Legend Information - Month View -->
    <div v-if="selectedPeriod === 'month'" class="flex gap-6 justify-center mb-6">
      <div class="flex items-center gap-2">
        <div class="w-6 h-4 rounded-sm" style="background-color: #facc15;"></div>
        <span class="text-sm text-gray-400 font-mono">Daily Intake</span>
      </div>
    </div>

    <!-- Week View Entries - Grouped by Day -->
    <div v-if="selectedPeriod === 'week'" class="mt-8">
      <h3 class="text-lg font-light text-white mb-4">Week Entries</h3>
      <div class="space-y-4">
        <div v-for="day in weekEntriesGrouped" :key="day.date" class="bg-black/50 border border-gray-800/50 rounded-lg p-4">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-mono uppercase tracking-wider text-gray-400">{{ day.dayName }} - {{ day.date }}</span>
            <span class="text-xs font-mono text-yellow-400">{{ day.totalCalories }} kcal</span>
          </div>
          <div v-if="day.entries.length > 0" class="space-y-2">
            <div v-for="(entry, idx) in day.entries" :key="idx" class="flex justify-between items-center p-2 bg-black border border-gray-700/30 rounded text-xs group hover:border-yellow-400/30 transition-colors">
              <div class="flex-1">
                <span class="text-gray-300 font-mono">{{ entry.mealType }}</span>
                <span class="text-gray-500 ml-2">{{ entry.name }}</span>
              </div>
              <div class="flex items-center gap-2 ml-2">
                <span class="text-yellow-400 font-mono">{{ entry.calories }} kcal</span>
                <button
                  @click="$emit('edit', entry)"
                  class="p-1 text-gray-400 hover:text-yellow-400 transition-colors"
                  title="Edit"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-9-3l9-9m-9 9l4 4"></path>
                  </svg>
                </button>
                <button
                  @click="$emit('delete', entry.id)"
                  class="p-1 text-gray-400 hover:text-red-400 transition-colors"
                  title="Delete"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div v-else class="text-xs text-gray-500 italic">No entries</div>
        </div>
      </div>
    </div>

    <!-- Month View Entries - Grid of Cards -->
    <div v-if="selectedPeriod === 'month'" class="mt-8">
      <h3 class="text-lg font-light text-white mb-4">Month Entries</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="day in monthEntriesGrouped" :key="day.date" class="bg-black/50 border border-gray-800/50 rounded-lg p-4">
          <div class="flex items-center justify-between mb-3">
            <div>
              <span class="text-sm font-mono uppercase tracking-wider text-gray-400">{{ day.dayName }}</span>
              <p class="text-xs text-gray-500 mt-1">{{ day.date }}</p>
            </div>
            <span class="text-sm font-mono text-yellow-400 text-right">{{ day.totalCalories }}<br><span class="text-xs text-gray-500">kcal</span></span>
          </div>
          <div v-if="day.entries.length > 0" class="space-y-2">
            <div v-for="(entry, idx) in day.entries" :key="idx" class="p-2 bg-black/50 border border-gray-700/30 rounded text-xs group hover:border-yellow-400/30 transition-colors">
              <div class="flex justify-between items-start gap-2">
                <div class="flex-1 min-w-0">
                  <span class="text-gray-300 font-mono block">{{ entry.mealType }}</span>
                  <span class="text-gray-500 text-xs truncate block">{{ entry.name }}</span>
                </div>
                <div class="flex items-center gap-1 flex-shrink-0">
                  <span class="text-yellow-400 font-mono whitespace-nowrap">{{ entry.calories }}</span>
                  <button
                    @click="$emit('edit', entry)"
                    class="p-0.5 text-gray-400 hover:text-yellow-400 transition-colors"
                    title="Edit"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-9-3l9-9m-9 9l4 4"></path>
                    </svg>
                  </button>
                  <button
                    @click="$emit('delete', entry.id)"
                    class="p-0.5 text-gray-400 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-xs text-gray-600 italic text-center py-2">No entries</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { useAuthStore } from '@/stores/auth';
import { loadCalorieEntriesByPeriod } from '@/utils/firestoreUtils';

// Props
const props = defineProps({
  selectedPeriod: {
    type: String,
    default: 'day',
    validator: (value) => ['day', 'week', 'month'].includes(value),
  },
});

// Emits
defineEmits(['edit', 'delete']);

// State
const authStore = useAuthStore();
const isLoadingChart = ref(true);
const chartReady = ref(false);
const chartSeries = ref([]);
const chartOptions = ref({});
const calorieData = ref([]);
const entries = ref([]);

// Computed Properties
const weekEntriesGrouped = computed(() => {
  if (props.selectedPeriod !== 'week') return [];

  const today = new Date();
  const currentDay = today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - currentDay);

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const grouped = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const dayEntries = entries.value.filter(entry => {
      const entryDate = new Date(entry.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return entryDate === dateStr;
    });

    const totalCalories = dayEntries.reduce((sum, entry) => sum + entry.calories, 0);

    grouped.push({
      date: dateStr,
      dayName: dayNames[i],
      entries: dayEntries.map(entry => ({
        id: entry.id,
        name: entry.food || 'Unknown',
        mealType: entry.mealType || 'Meal',
        calories: entry.calories,
      })),
      totalCalories,
    });
  }

  return grouped;
});

const monthEntriesGrouped = computed(() => {
  if (props.selectedPeriod !== 'month') return [];

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const lastDay = new Date(year, month + 1, 0);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days = [];

  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const dayOfWeek = date.getDay();

    const dayEntries = entries.value.filter(entry => {
      const entryDate = new Date(entry.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return entryDate === dateStr;
    });

    const totalCalories = dayEntries.reduce((sum, entry) => sum + entry.calories, 0);

    days.push({
      date: dateStr,
      dayName: dayNames[dayOfWeek],
      entries: dayEntries.map(entry => ({
        id: entry.id,
        name: entry.food || 'Unknown',
        mealType: entry.mealType || 'Meal',
        calories: entry.calories,
      })),
      totalCalories,
    });
  }

  return days;
});

// Methods
async function loadChartData() {
  try {
    if (!authStore.user) {
      console.error('No user logged in');
      isLoadingChart.value = false;
      return;
    }

    isLoadingChart.value = true;
    const loadedEntries = await loadCalorieEntriesByPeriod(authStore.user.email, props.selectedPeriod);
    entries.value = loadedEntries; // Store entries for the computed properties

    // Process entries into daily data
    const dailyMap = new Map();
    const baseGoal = 2000;

    loadedEntries.forEach((entry) => {
      const date = new Date(entry.timestamp).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });

      if (!dailyMap.has(date)) {
        dailyMap.set(date, {
          date,
          calories: 0,
          goal: baseGoal,
        });
      }

      const dayData = dailyMap.get(date);
      dayData.calories += entry.calories;
    });

    // Convert to array and sort by date
    let dailyArray = Array.from(dailyMap.values());

    // For week view: show current week (Sunday to Saturday) with line only until today
    if (props.selectedPeriod === 'week') {
      const today = new Date();
      const todayTime = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

      const currentDay = today.getDay(); // 0 = Sunday, 6 = Saturday
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - currentDay); // Go back to Sunday

      const weekDays = [];
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const dateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

        const existingDay = dailyArray.find(d => d.date === dateStr);

        // Only populate calories for days up to and including today
        if (dateTime <= todayTime) {
          weekDays.push(
            existingDay || {
              date: dateStr,
              dayName: dayNames[i],
              calories: 0,
              goal: 2000,
            }
          );
        } else {
          // For future days, push null to break the line
          weekDays.push({
            date: dateStr,
            dayName: dayNames[i],
            calories: null,
            goal: 2000,
          });
        }
      }
      dailyArray = weekDays;
    }

    // For month view: show current month with all days, but only line until today
    if (props.selectedPeriod === 'month') {
      const today = new Date();
      const todayDate = today.getDate();
      const year = today.getFullYear();
      const month = today.getMonth();
      const lastDay = new Date(year, month + 1, 0);

      const monthDays = [];

      // Include all days of the month
      for (let i = 1; i <= lastDay.getDate(); i++) {
        const date = new Date(year, month, i);
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        const existingDay = dailyArray.find(d => d.date === dateStr);

        // Only populate calories for days up to and including today
        if (i <= todayDate) {
          monthDays.push(
            existingDay || {
              date: dateStr,
              calories: 0,
              goal: 2000,
            }
          );
        } else {
          // For future days, push null to break the line
          monthDays.push({
            date: dateStr,
            calories: null,
            goal: 2000,
          });
        }
      }
      dailyArray = monthDays;
    }

    calorieData.value = dailyArray;

    // Prepare chart data
    const dates = calorieData.value.map((day) => day.date);
    const calorieChartSeries = calorieData.value.map((day) => day.calories);

    if (props.selectedPeriod === 'week') {
      // Line chart for week showing daily intake with nulls breaking the line
      chartSeries.value = [
        {
          name: 'Daily Intake',
          data: calorieChartSeries,
        },
      ];
    } else if (props.selectedPeriod === 'month') {
      // Line chart for month showing calories consumed
      chartSeries.value = [
        {
          name: 'Daily Intake',
          data: calorieChartSeries,
        },
      ];
    } else {
      chartSeries.value = [];
    }

    const isWeekView = props.selectedPeriod === 'week';
    const isMonthView = props.selectedPeriod === 'month';

    chartOptions.value = {
      chart: {
        type: 'line',
        fontFamily: 'Menlo, monospace',
        sparkline: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      colors: ['#facc15'],
      plotOptions: {
        line: {
          showArea: true,
          connectNulls: false,
        },
      },
      dataLabels: {
        enabled: false,
        style: {
          fontSize: '13px',
          fontWeight: 'bold',
          fontFamily: 'Courier New, monospace',
          colors: ['#facc15'],
        },
        background: {
          enabled: false,
        },
        offsetY: -5,
        formatter: (value) => {
          return Math.round(value);
        },
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      fill: {
        type: 'solid',
      },
      markers: {
        size: 0,
        hover: {
          size: 0,
        },
      },
      xaxis: {
        categories: dates && dates.length > 0 ? dates : Array.from({length: isWeekView ? 7 : 30}, (_, i) => {
          const date = new Date();
          if (isWeekView) {
            const currentDay = date.getDay();
            const startOfWeek = new Date(date);
            startOfWeek.setDate(date.getDate() - currentDay);
            startOfWeek.setDate(startOfWeek.getDate() + i);
            return startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          } else {
            const year = date.getFullYear();
            const month = date.getMonth();
            return new Date(year, month, i + 1).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          }
        }),
        labels: {
          show: true,
          style: {
            colors: '#d1d5db',
            fontSize: '12px',
            fontFamily: 'Menlo, monospace',
            fontWeight: 500,
          },
          offsetY: 5,
        },
        axisBorder: {
          show: true,
          color: '#4b5563',
          width: 2,
        },
        axisTicks: {
          show: true,
          color: '#4b5563',
          width: 2,
          height: 6,
        },
        crosshairs: {
          show: true,
          width: 1,
          position: 'front',
          opacity: 0.9,
          stroke: {
            color: '#374151',
            width: 1,
            dashArray: 0,
          },
        },
        type: 'category',
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          style: {
            colors: '#9ca3af',
            fontSize: '12px',
            fontFamily: 'Menlo, monospace',
          },
        },
        axisBorder: {
          show: true,
          color: '#4b5563',
          width: 2,
        },
      },
      grid: {
        show: true,
        borderColor: '#4b5563',
        strokeDashArray: 3,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        floating: false,
        labels: {
          colors: '#d1d5db',
        },
      },
      tooltip: {
        theme: 'dark',
        style: {
          fontSize: '12px',
          fontFamily: 'Menlo, monospace',
        },
        x: {
          format: 'dd MMM',
        },
        y: {
          formatter: (value) => {
            return Math.round(value) + ' kcal';
          },
        },
      },
    };

    isLoadingChart.value = false;
  } catch (error) {
    console.error('Error loading chart data:', error);
    isLoadingChart.value = false;
  }
}

// Watchers
watch(() => props.selectedPeriod, () => {
  loadChartData();
});

// Lifecycle
onMounted(() => {
  loadChartData();
});
</script>
