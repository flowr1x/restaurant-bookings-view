<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import type { Order, TableEvent } from '@/types'
import { getReservationStyle, getTime } from '@/utils/getReservationStyle'
import { useStatusOrder } from '@/composables/useStatusOrder'

interface Props {
  event: TableEvent
  openingTime: string
  closingTime: string
}

const props = defineProps<Props>()
const isOrder = computed(() => props.event.type === 'order')

const orderMeta = computed(() => {
  if (!isOrder.value) return null
  return props.event.meta as Order
})
const { currentStatus } = useStatusOrder(orderMeta.value?.status)
</script>
<template>
  <div class="reservation" :style="getReservationStyle(props.event, openingTime, closingTime)">
    <div class="reservation__id text-semibold text-8">
      <span v-if="currentStatus.text === 'Банкет'">Банкет</span>
      <span v-else>Заказ</span>
    </div>
    <div
      v-if="currentStatus.text != 'Банкет'"
      class="text-semibold text-8 reservation__status"
      :class="currentStatus.selector"
    >
      {{ currentStatus.text }}
    </div>
    <div class="reservation__time">{{ getTime(event.start) }}-{{ getTime(event.end) }}</div>
  </div>
</template>

<style lang="scss" scoped>
.reservation {
  position: absolute;
  display: block;
  color: var(--white);
  z-index: 10;
  border-radius: var(--order-border-radius);
  padding: 2px 6px;
  overflow: hidden;

  @media screen and (hover: hover) {
    &:hover {
      width: max-content !important;
      backdrop-filter: blur(2px);
      z-index: 999 !important;
    }

    &:hover:after {
      filter: blur(10px);
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
  }
  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-color: var(--order-clr);
    opacity: 0.16;

    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  &:has(.status-banquet) {
    &:before {
      background-color: var(--order-banquet-clr);
    }
    &:after {
      background-color: var(--order-banquet-clr);
    }
  }
  &__status {
    display: inline-block;
    background-color: var(--order-status-default-bg);
    color: var(--order-status-default-text);
    padding: 2px;
    border-radius: var(--reservation-border-radius);
    &.status-bill {
      background-color: var(--order-status-bill-bg);
      color: var(--order-status-bill-text);
    }
  }
}
</style>
