import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import data from '@/data/data.json'
import type { RestaurantData, Zone, Table } from '@/types'
import { getDateLabel } from '@/utils/time.ts'

export const useBookingStore = defineStore('bookingStore', () => {
  const restaurant = ref<RestaurantData>()
  const selectedDate = ref('')
  const allZones = ref<Zone[]>([])
  const activeZones = ref<Zone[]>([])
  const availableDays = ref<string[]>([])

  const availableDaysFormat = computed(() =>
    availableDays.value.map((date) =>
      getDateLabel(date, restaurant.value?.current_day ?? '2025-04-04'),
    ),
  )

  // In the future use the API
  function loadData() {
    restaurant.value = data as RestaurantData
    selectedDate.value = restaurant.value.current_day
    allZones.value = [...new Set(restaurant.value.tables.map((t: Table) => t.zone))].sort(
      (a, b) => {
        const isFloor = (zone: Zone) => zone.includes('этаж')
        if (isFloor(a) && !isFloor(b)) return -1
        if (!isFloor(a) && isFloor(b)) return 1
        return a.localeCompare(b)
      },
    )
    if (allZones.value.length > 0) {
      activeZones.value = [allZones.value[0]]
    }
    availableDays.value = restaurant.value.available_days
    selectedDate.value = restaurant.value.current_day
  }

  function toggleZone(currentZone: Zone) {
    const index = activeZones.value.indexOf(currentZone)

    if (index !== -1) {
      activeZones.value.splice(index, 1)
    } else {
      activeZones.value.push(currentZone)
    }
  }

  const isActiveZone = (zone: Zone) => activeZones.value.includes(zone)
  return {
    restaurant,
    loadData,
    selectedDate,
    allZones,
    availableDays,
    availableDaysFormat,
    toggleZone,
    isActiveZone,
    activeZones,
  }
})
