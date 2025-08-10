<script setup lang="ts">
import { computed, defineProps } from 'vue'
import type { Reservation, Table, Zone } from '@/types'
import TableHeader from './TableHeader.vue'
import ReservationBlock from './ReservationBlock.vue'
import TimelineRow from './TimelineRow.vue'
// import type { Reservation, Table } from '@/types'

import { useTimescale } from '@/composables/useTimescale'
import { useReservations } from '@/composables/useReservations'

interface Props {
  tables: Table[]
  selectedDate: string
  openingTime: string
  closingTime: string
  activesZone: Zone[]
}

const props = defineProps<Props>()

const timeline = useTimescale(props.openingTime, props.closingTime)
const eventFilterCurrentDateAndZone = computed(() =>
  props.tables
    .map((table, index) => {
      return table.reservations
        .filter((reservation) => {
          const date = reservation.seating_time.split('T')[0]
          return date === props.selectedDate && props.activesZone.includes(table.zone)
        })
        .sort((a, b) => (a.seating_time > b.seating_time ? 1 : -1))
        .map((reservation) => ({ ...reservation, tableIndex: index }))
    })
    .flat(),
)
console.log(eventFilterCurrentDateAndZone.value)
// const allReservations = useReservations(eventFilterCurrentDate)
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
            v-for="reservation in eventFilterCurrentDateAndZone"
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
