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
    class="event"
  />
</template>
<style lang="scss">
.event {
  position: absolute;
  display: block;
  color: var(--white);
  z-index: 10;
  border-radius: var(--event-border-radius);
  padding: 2px 6px;
  overflow: hidden;
  transition: color 0.3s;
  @media screen and (hover: hover) {
    &:hover {
      width: max-content !important;
      backdrop-filter: blur(2px);
      z-index: 999 !important;
    }
  }
  &:before {
    content: '';
    display: block;
    position: absolute;
    background-color: var(--order-clr);
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    transition: background-color 0.3s;
  }
  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-color: var(--order-clr);
    opacity: 0.16;
    transition: background-color 0.3s;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  &__status {
    display: inline-block;
    background-color: var(--order-status-default-bg);
    color: var(--order-status-default-text);
    padding: 2px;
    border-radius: var(--event-border-radius);
    transition:
      background-color 0.3s,
      color 0.3s,
      border-color 0.3s;
    &.status-bill {
      background-color: var(--order-status-bill-bg);
      color: var(--order-status-bill-text);
    }
  }
}
</style>
