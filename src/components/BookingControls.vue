<script setup lang="ts">
import { defineProps } from 'vue'
import type { Zone, AvailableDaysFormat } from '@/types'
import BookingButtons from './BookingButtons.vue'
import DateButton from './DateButton.vue'
import ZoneButton from './ZoneButton.vue'

interface Props {
  selectedDate: string
  availableDays: AvailableDaysFormat[]
  zones: Zone[]
}

const props = defineProps<Props>()
</script>

<template>
  <section class="section booking-controls">
    <div class="container">
      <h1>Бронирование</h1>
      <BookingButtons :title="'Дата'" class="booking-btns__days">
        <DateButton
          v-for="day in props.availableDays"
          :key="day.date"
          :availableDay="day"
          :selectedDate
        ></DateButton>
      </BookingButtons>
      <BookingButtons :title="'Отображаемые зоны'">
        <ZoneButton v-for="zone in props.zones" :key="zone" :zone></ZoneButton>
      </BookingButtons>
    </div>
  </section>
</template>

<style lang="scss">
.booking-controls {
  overflow: hidden;
}
</style>
