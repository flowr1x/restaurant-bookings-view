<script setup lang="ts">
import { onMounted } from 'vue'
import { useBookingStore } from '@/stores/bookingStore'
import BookingControls from '@/components/BookingControls.vue'
import BookingTable from '@/components/booking/BookingTable.vue'
const bookingStore = useBookingStore()

onMounted(() => bookingStore.loadData())
</script>

<template>
  <BookingControls
    :selectedDate="bookingStore.selectedDate"
    :availableDays="bookingStore.availableDaysFormat"
    :zones="bookingStore.allZones"
  />
  <BookingTable
    v-if="bookingStore.restaurant?.tables"
    :tables="bookingStore.restaurant.tables"
    :selectedDate="bookingStore.selectedDate"
    :openingTime="'11:00'"
    :closingTime="'23:00'"
    :activesZone="bookingStore.activeZones"
  />
</template>
