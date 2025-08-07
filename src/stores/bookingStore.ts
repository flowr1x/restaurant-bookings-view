import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import data from '@/data/data.json'
import type { RestaurantData, Zone, Table } from '@/types'
import { getDateLabel } from '@/utils/time.ts'

export const useBookingStore = defineStore('bookingStore', () => {
  const restaurant = ref<RestaurantData>()
  const selectedDate = ref('')
  const zoneFilters = ref<Zone[]>([])
  const availableDays = ref<string[]>([])

  const availableDaysFormat = computed(() => {
    return availableDays.value.map((date) => getDateLabel(date))
  })

  // In the future use the API
  function loadData() {
    restaurant.value = data as RestaurantData
    selectedDate.value = restaurant.value.current_day
    zoneFilters.value = [...new Set(restaurant.value.tables.map((t: Table) => t.zone))]
    availableDays.value = restaurant.value.available_days
    selectedDate.value = restaurant.value.current_day
  }

  return {
    restaurant,
    loadData,
    selectedDate,
    zoneFilters,
    availableDays,
    availableDaysFormat,
  }
})
