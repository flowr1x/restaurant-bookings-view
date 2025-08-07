<script setup lang="ts">
import BaseButton from './UI/BaseButton.vue'
import { defineProps } from 'vue'
import type { Zone, AvailableDaysFormat } from '@/types'
import { useBookingStore } from '@/stores/bookingStore'

interface Props {
  selectedDate: string
  availableDays: AvailableDaysFormat[]
  zones: Zone[]
}

const props = defineProps<Props>()
const bookingStore = useBookingStore()

function changeDayBooking(currentDay: string) {
  bookingStore.selectedDate = currentDay
}
</script>

<template>
  <div class="booking-btns booking-btns__days">
    <div class="booking-btns__title">Дата</div>
    <ul class="booking-btns__list">
      <li v-for="day in props.availableDays" :key="day.date">
        <BaseButton
          :class="{ active: day.date === props.selectedDate }"
          @click="changeDayBooking(day.date)"
        >
          <span class="text-semibold">{{ day.day }}</span>
          <span>{{ day.prefix }}</span>
        </BaseButton>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.text-semibold {
  font-weight: 600;
}
.booking-btns {
  &__title {
    margin-bottom: 4px;
  }
  &__list {
    display: flex;
    gap: 8px;
  }
  &__days {
    margin-bottom: 16px;
  }
}
</style>
