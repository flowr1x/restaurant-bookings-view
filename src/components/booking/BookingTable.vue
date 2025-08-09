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
        <!-- Header -->
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
  &__header {
    position: sticky;
    top: 24px;
    z-index: 999;
  }
}
.table-header {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 32px;
  grid-auto-columns: 80px;
  white-space: nowrap;
  &__cell {
    padding: 4px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: flex;
    flex-direction: column;
    color: var(--text-color);
    text-align: center;
    padding: 7px;
  }
  &__top {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin-bottom: 4px;
  }
  &__number {
    font-weight: 600;
    font-size: 13px;
    line-height: 20px;
    color: var(--white);
    &:before {
      content: '#';
      color: var(--text-color);
      font-size: 11px;
      line-height: 14px;
      font-weight: 400;
    }
  }
}
.time-row {
  min-height: 40px;
  display: grid;
  grid-template-columns: 32px;
  grid-auto-flow: column;
  grid-auto-columns: 80px;
  white-space: nowrap;
  &__cell {
    color: var(--text-color);
    font-size: 11px;
    line-height: 14px;
    position: sticky;
    left: 0;
    z-index: 10;
  }

  .booking-cell {
    border-right: var(--booking-border);
    border-top: var(--booking-border);
  }
}
.booking-cell {
  background-color: var(--dark);
}
.reservation {
  position: absolute;
  background-color: #4caf50;
  color: var(--white);
  z-index: 10;
}
</style>
