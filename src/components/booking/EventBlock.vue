<script lang="ts" setup>
import { defineProps, computed } from 'vue'

import type { TableEvent } from '@/types'

import OrderEvent from './OrderEvent.vue'
import ReservationEvent from './ReservationEvent.vue'

interface Props {
  event: TableEvent
  openingTime: string
  closingTime: string
}

const props = defineProps<Props>()

const eventComponent = computed(() => {
  if (props.event.type === 'order') return OrderEvent
  if (props.event.type === 'reservation') return ReservationEvent
  return null
})
</script>

<template>
  <component
    :is="eventComponent"
    v-if="eventComponent"
    :event="props.event"
    :openingTime="props.openingTime"
    :closingTime="props.closingTime"
  />
</template>
