<script lang="ts" setup>
import { defineProps } from 'vue'
import type { Table } from '@/types'

interface Props {
  tables: Table[]
  time: string
}

const props = defineProps<Props>()
</script>
<template lang="">
  <div class="time-row">
    <div class="time-row__cell">{{ props.time }}</div>
    <div v-for="table in props.tables" :key="table.id" class="booking-cell"></div>
  </div>
</template>

<style lang="scss" scoped>
.time-row {
  min-height: 40px;
  display: grid;
  grid-template-columns: 32px;
  grid-auto-flow: column;
  grid-auto-columns: 80px;
  white-space: nowrap;
  &__cell {
    transition: color 0.1s;
    color: var(--text-color);
    font-size: 11px;
    line-height: 14px;
    position: sticky;
    left: 0;
    z-index: 999;
  }

  .booking-cell {
    border-right: var(--booking-border);
    border-top: var(--booking-border);
  }
}
.booking-cell {
  transition: background-color 0.3s;
  background-color: var(--dark);
}
</style>
