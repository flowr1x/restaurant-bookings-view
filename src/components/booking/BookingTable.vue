<script setup lang="ts">
import { defineProps, toRef } from 'vue'
import type { Table, Zone } from '@/types'
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
  activesZone: Zone[]
}

const props = defineProps<Props>()

const timeline = useTimescale(props.openingTime, props.closingTime)
const { eventFilterCurrentDateAndZone } = useReservations(
  props.tables,
  toRef(props, 'selectedDate'),
  toRef(props, 'activesZone'),
)
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
.booking-table {
  position: relative;
  overflow: auto;
  &__body {
    position: relative;
  }
}
</style>
