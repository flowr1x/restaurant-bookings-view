<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import type { Order, TableEvent, OrderStatus } from '@/types'
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
const { currentStatus } = useStatusOrder(orderMeta.value?.status as OrderStatus)
</script>
<template>
  <div class="event-order" :style="getReservationStyle(props.event, openingTime, closingTime)">
    <div class="text-semibold">
      <span v-if="currentStatus.text === 'Банкет'">Банкет</span>
      <span v-else>Заказ</span>
    </div>
    <div
      v-if="currentStatus.text != 'Банкет'"
      class="text-semibold event-order__status event__status text-8"
      :class="currentStatus.selector"
    >
      {{ currentStatus.text }}
    </div>
    <div>{{ getTime(event.start) }}-{{ getTime(event.end) }}</div>
  </div>
</template>

<style lang="scss" scoped>
.event-order {
  &:before,
  &:after {
    background-color: var(--order-clr);
  }
  &:has(.status-banquet) {
    &:before,
    &:after {
      background-color: var(--order-banquet-clr);
    }
  }
  &__status {
    background-color: var(--order-status-default-bg);
    color: var(--order-status-default-text);
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
