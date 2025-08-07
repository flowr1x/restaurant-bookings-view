<script setup lang="ts">
import BaseButton from './UI/BaseButton.vue'
import { defineProps } from 'vue'
import type { AvailableDaysFormat } from '@/types'
import { useBookingStore } from '@/stores/bookingStore'

interface Props {
  selectedDate: string
  availableDay: AvailableDaysFormat
}

const props = defineProps<Props>()
const bookingStore = useBookingStore()

function changeDayBooking(currentDay: string) {
  bookingStore.selectedDate = currentDay
}
</script>

<template>
  <li class="booking-item-btn">
    <BaseButton
      :class="{ active: availableDay.date === props.selectedDate }"
      @click="changeDayBooking(availableDay.date)"
    >
      <span class="text-semibold">{{ availableDay.day }}</span>
      <span>{{ availableDay.prefix }}</span>
    </BaseButton>
  </li>
</template>
