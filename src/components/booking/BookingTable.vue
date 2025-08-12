<script setup lang="ts">
import { defineProps, toRef, type Ref } from 'vue'
import type { Table, Zone } from '@/types'
import TableHeader from './TableHeader.vue'
import EventBlock from './EventBlock.vue'
import TimelineRow from './TimelineRow.vue'

import { useTimescale } from '@/composables/useTimescale'
import { useEvents } from '@/composables/useEvents'

interface Props {
  tables: Table[]
  selectedDate: string
  openingTime: string
  closingTime: string
  activesZone: Zone[]
}

const props = defineProps<Props>()

const timeline = useTimescale(props.openingTime, props.closingTime)
const { allEvents } = useEvents(props.tables, toRef(props, 'selectedDate'), toRef(props, 'activesZone'))

function getWidthAndHegithTable(tables: Table[], timeline: Ref<string[], string[]>) {
  const column = tables.length
  const row = timeline.value.length

  console.log(column, row)
  return {
    width: `${column * 80}px`,
    height: `${row * 80 - 1000}px`,
  }
}
const getWidth = getWidthAndHegithTable(props.tables, timeline)
</script>

<template>
  <section class="section section-booking">
    <div class="container">
      <div class="booking-table" :style="{ width: getWidth.width }">
        <div class="booking-table__body">
          <TableHeader :tables />
          <EventBlock v-for="event in allEvents" :key="event.id" :event :openingTime :closingTime />
          <TimelineRow v-for="time in timeline" :key="time" :tables :time />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.section-booking {
  overflow-x: auto;
  height: 500px;
  scrollbar-width: none;
  /* Для IE/Edge (старых) */
  -ms-overflow-style: none;
}
.booking-table {
  position: relative;
  &__body {
    position: relative;
  }
}
</style>
