<template>
  <div class="booking-table">
    <!-- Заголовок -->
    <div class="header-row">
      <div class="time-header"></div>
      <div v-for="table in tables" :key="table.id" class="table-header">
        {{ table.number }} ({{ table.capacity }})
      </div>
    </div>

    <div class="grid-body">
      <!-- Левая колонка времени -->
      <div class="timeline-column">
        <div v-for="time in timeline" :key="time" class="time-label">
          {{ time }}
        </div>
      </div>

      <!-- Колонки столов -->
      <div v-for="table in tables" :key="table.id" class="table-column">
        <div
          v-for="res in table.reservations"
          :key="res.id"
          class="reservation"
          :style="getEventStyle(res.seating_time, res.end_time)"
        >
          {{ res.id }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Table, Reservation } from '@/types'

interface Props {
  tables: (Table & { reservations: Reservation[] })[]
  openingTime: string // "11:00"
  closingTime: string // "23:00"
  step?: number // 30 минут
}

const props = defineProps<Props>()

function parseTime(time: string) {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

const openMinutes = parseTime(props.openingTime)
const closeMinutes = parseTime(props.closingTime)
const totalMinutes = closeMinutes - openMinutes

// Генерация шкалы времени
function generateTimeScale(open: string, close: string, step = 30): string[] {
  const start = parseTime(open)
  const end = parseTime(close)
  const result: string[] = []
  for (let t = start; t <= end; t += step) {
    const h = String(Math.floor(t / 60)).padStart(2, '0')
    const m = String(t % 60).padStart(2, '0')
    result.push(`${h}:${m}`)
  }
  return result
}

const timeline = generateTimeScale(props.openingTime, props.closingTime, props.step ?? 30)

// Для позиционирования брони
function getEventStyle(start: string, end: string) {
  const startMin = parseTime(start) - openMinutes
  const endMin = parseTime(end) - openMinutes
  return {
    top: `${(startMin / totalMinutes) * 100}%`,
    height: `${((endMin - startMin) / totalMinutes) * 100}%`,
  }
}
</script>

<style scoped>
.booking-table {
  display: flex;
  flex-direction: column;
}

.header-row {
  display: grid;
  grid-template-columns: 80px repeat(auto-fill, 120px);
  font-weight: bold;
}

.grid-body {
  display: grid;
  grid-template-columns: 80px repeat(auto-fill, 120px);
}

.timeline-column {
  position: relative;
  border-right: 1px solid #ddd;
}

.time-label {
  height: 40px; /* 1 шаг времени */
  font-size: 12px;
  padding-left: 4px;
  border-bottom: 1px dashed #ccc;
}

.table-column {
  position: relative;
  border-left: 1px solid #ddd;
  height: calc(var(--rows) * 40px); /* можно высчитать динамически */
}

.reservation {
  position: absolute;
  left: 4px;
  right: 4px;
  background: #4cafef;
  color: white;
  padding: 2px;
  border-radius: 4px;
  font-size: 12px;
}
</style>
