<script setup lang="ts">
import { defineProps } from 'vue'
import type { Table } from '@/types'
import TableHeader from './TableHeader.vue'
import ReservationBlock from './ReservationBlock.vue'
import TimelineRow from './TimelineRow.vue'

import { useTimescale } from '@/composables/useTimescale'
import { useReservations } from '@/composables/useReservations'

interface Props {
  tables: Table[]
  selectedDate: string
  openingTime: string
  closingTime: string
}

const props = defineProps<Props>()

const timeline = useTimescale(props.openingTime, props.closingTime)
const allReservations = useReservations(props.tables)
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="booking-table">
        <TableHeader :tables />
        <!-- Основная таблица -->
        <div class="booking-table__body">
          <!-- Отрисовка бронирований -->
          <ReservationBlock
            v-for="reservation in allReservations"
            :key="reservation.id"
            :reservation
            :openingTime
            :closingTime
          />
          <!-- Отрисовка сетки -->
          <TimelineRow v-for="time in timeline" :key="time" :tables :time />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
:root {
  --booking-border: 1px solid rgba(255, 255, 255, 0.16);
}
.booking-table {
  position: relative;
  &__body {
    position: relative;
  }
}
</style>
