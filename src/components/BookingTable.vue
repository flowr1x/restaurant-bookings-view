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

  const left = reservation.tableIndex * CELL_WIDTH

  return {
    position: 'absolute',
    top: `${topPercent}%`,
    height: `${heightPercent}%`,
    left: `${left}px`,
    width: `${CELL_WIDTH}px`,
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '4px',
    boxSizing: 'border-box',
    borderRadius: '4px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    cursor: 'pointer',
    zIndex: 10,
  }
}
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="booking-table">
        <!-- Верхняя строка -->
        <div class="grid header-row">
          <div class="cell time-header"></div>
          <!-- Пустая ячейка -->
          <div v-for="table in tables" :key="table.id" class="cell table-header">
            <span class="table-header__number">{{ table.number }}</span>
            <span class="table-header__capacity">{{ table.capacity }}</span>
          </div>
        </div>

        <!-- Основная таблица -->
        <div v-for="time in timeline" :key="time" class="grid time-row">
          <div class="cell time-cell">{{ time }}</div>
          <div v-for="table in tables" :key="table.id" class="cell booking-cell"></div>
        </div>
        <!-- Отрисовка бронирований -->
        <div
          v-for="reservation in allReservations"
          :key="reservation.id"
          class="reservation"
          :style="getReservationStyle(reservation, openingTime, closingTime)"
        >
          {{ reservation.id }}
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.booking-table {
  position: relative;
}
.grid {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 80px;
  white-space: nowrap;
}

.reservation {
  position: absolute;
  transition: background-color 0.2s ease;
}

.header-row {
  font-weight: bold;
}

.time-row {
  min-height: 40px;
}

.cell {
  padding: 4px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.time-cell {
}

.table-header {
}
</style>
