<script setup lang="ts">
import { defineProps } from 'vue'
import type { Table, Reservation } from '@/types'
import { computed } from 'vue'

interface Props {
  tables: Table[]
  selectedDate: string
  openingTime: string
  closingTime: string
}

const props = defineProps<Props>()

function generateTimeScale(open: string, close: string, step: number = 30): string[] {
  const parseTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }
  const formatTime = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
  }

  const start = parseTime(open)
  const end = parseTime(close)
  const timeline: string[] = []

  console.log(start, end)
  for (let i = start; i <= end; i += step) {
    timeline.push(formatTime(i))
  }
  timeline.pop()
  return timeline
}
const timeline: string[] = generateTimeScale(props.openingTime, props.closingTime)

const allReservations = computed(() => {
  const res: Array<Reservation & { tableIndex: number }> = []
  props.tables.forEach((table, index) => {
    table.reservations.forEach((r) => {
      res.push({
        ...r,
        tableIndex: index,
      })
    })
  })
  return res
})

const CELL_WIDTH = 80

function parseTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

function getReservationStyle(
  reservation: Reservation & { tableIndex: number },
  openingTime: string,
  closingTime: string,
) {
  const widthFirstColumn = 32

  const startTime = reservation.seating_time.slice(11, 16) // 'HH:mm' 15:50
  const endTime = reservation.end_time.slice(11, 16) // 17:50

  const openMinutes = parseTimeToMinutes(openingTime) // 660
  const closeMinutes = parseTimeToMinutes(closingTime) // 1380
  const totalMinutes = closeMinutes - openMinutes //  720

  const startMinutes = parseTimeToMinutes(startTime) - openMinutes // 850 - 660 = 190
  const endMinutes = parseTimeToMinutes(endTime) - openMinutes // 1070 - 660 = 410

  const topPercent = (startMinutes / totalMinutes) * 100
  const heightPercent = ((endMinutes - startMinutes) / totalMinutes) * 100

  const left = reservation.tableIndex * CELL_WIDTH + widthFirstColumn

  return {
    top: `${topPercent}%`,
    height: `${heightPercent}%`,
    left: `${left}px`, // 40px имеет первый столбец
    width: `${CELL_WIDTH}px`,
  }
}
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="booking-table">
        <!-- Header -->
        <div class="table-header booking-table__header">
          <div class=""></div>
          <div v-for="table in tables" :key="table.id" class="table-header__cell">
            <div class="table-header__top">
              <span class="table-header__number">{{ table.number }}</span>
              <span class="table-header__capacity">{{ table.capacity }} чел</span>
            </div>
            <span class="table-header__zone">{{ table.zone }}</span>
          </div>
        </div>

        <!-- Основная таблица -->
        <div class="booking-table__body">
          <!-- Отрисовка бронирований -->
          <div
            v-for="reservation in allReservations"
            :key="reservation.id"
            class="reservation"
            :style="getReservationStyle(reservation, openingTime, closingTime)"
          >
            {{ reservation.id }}
          </div>
          <!-- Отрисовка сетки -->
          <div v-for="time in timeline" :key="time" class="time-row">
            <div class="time-row__cell">{{ time }}</div>
            <div v-for="table in tables" :key="table.id" class="booking-cell"></div>
          </div>
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
