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

<style lang="scss"></style>
