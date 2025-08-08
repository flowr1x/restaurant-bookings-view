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

function getTimeIndex(time: string): number {
  return timeline.findIndex((t) => t === time)
}

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
  const startTime = reservation.seating_time.slice(11, 16) // 'HH:mm'
  const endTime = reservation.end_time.slice(11, 16)

  const openMinutes = parseTimeToMinutes(openingTime)
  const closeMinutes = parseTimeToMinutes(closingTime)
  const totalMinutes = closeMinutes - openMinutes

  const startMinutes = parseTimeToMinutes(startTime) - openMinutes
  const endMinutes = parseTimeToMinutes(endTime) - openMinutes

  const topPercent = (startMinutes / totalMinutes) * 100
  const heightPercent = ((endMinutes - startMinutes) / totalMinutes) * 100

  const left = (reservation.tableIndex + 1) * CELL_WIDTH

  return {
    top: `${topPercent}%`,
    height: `${heightPercent}%`,
    left: `${left}px`,
    width: `${CELL_WIDTH}px`,

  }
}
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="booking-table">
        <!-- Отрисовка бронирований -->
        <div
          v-for="reservation in allReservations"
          :key="reservation.id"
          class="reservation"
          :style="getReservationStyle(reservation, openingTime, closingTime)"
        >
          {{ reservation.id }}
        </div>
        <!-- Table Header -->
        <div class="table-header">
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
        <div v-for="time in timeline" :key="time" class="time-row">
          <div class="time-row__cell">{{ time }}</div>
          <div v-for="table in tables" :key="table.id" class="booking-cell"></div>
        </div>


      </div>
    </div>
  </section>
</template>

<style lang="scss">
  .booking-table {
    position: relative;
  }
  .table-header {
    display: grid;
    grid-auto-flow: column;
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
    grid-auto-flow: column;
    grid-auto-columns: 80px;
    white-space: nowrap;
    width: 100vw;
    &__cell {
      color: var(--text-color);
      font-size: 11px;
      line-height: 14px;
      position: sticky;
      left: 0;
      z-index: 10;
    }

    .booking-cell {
      &:not(:last-child) {
        border-right: 1px solid var(--white);
      }
    }
    &:not(:last-child) .booking-cell {
      border-bottom: 1px solid var(--white);
    }

  }
  .booking-cell {
    background-color: var(--dark);
    // border: 1px solid rgba(255, 255,255,.16);
  }
  .reservation {
    position: absolute;
    background-color: #4caf50;
    color: var(--white);
    z-index: 10;
  }
  
</style>
