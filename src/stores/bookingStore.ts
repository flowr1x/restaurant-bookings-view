import { defineStore } from 'pinia'
import { ref } from 'vue'
import data from '@/data/data.json'
import type { RestaurantData, Zone } from '@/types'

export const useBookingStore = defineStore('bookingStore', () => {
  const restaurant = ref<RestaurantData>()
  const selectedDate = ref('')
  const zoneFilters = ref<Zone[]>()

  // In the future use the API
  function loadData() {
    restaurant.value = data as RestaurantData
    selectedDate.value = restaurant.value.current_day
    zoneFilters.value = [...new Set(restaurant.value.tables.map((t) => t.zone))]
  }

  return {
    restaurant,
    loadData,
    selectedDate,
    zoneFilters,
  }
})
