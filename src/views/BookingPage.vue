<script setup lang="ts">
import { onMounted } from 'vue'
import { useBookingStore } from '@/stores/bookingStore'
import BookingControls from '@/components/BookingControls.vue'
const bookingStore = useBookingStore()

onMounted(() => bookingStore.loadData())

console.log(bookingStore.availableDays)
</script>

<template>
  <BookingControls
    :currentDay="bookingStore.selectedDate"
    :availableDays="bookingStore.availableDaysFormat"
    :zones="bookingStore.zoneFilters"
  />
</template>
