<script lang="ts" setup>
import { defineProps } from 'vue'
import type { Reservation, TableEvent, ReservationStatus } from '@/types'
import { getReservationStyle, getTime } from '@/utils/getReservationStyle'
import { useStatusReservation } from '@/composables/useStatusReservation'
import { computed } from 'vue'

interface Props {
  event: TableEvent
  openingTime: string
  closingTime: string
}
const props = defineProps<Props>()
const isReservation = computed(() => props.event.type === 'reservation')

const reservationMeta = computed(() => {
  if (!isReservation.value) return null
  return props.event.meta as Reservation
})

const { currentStatus } = useStatusReservation(reservationMeta.value?.status as ReservationStatus)
</script>
<template>
  <div class="event-reservation" :style="getReservationStyle(props.event, openingTime, closingTime)">
    <div class="event-reservation__id text-8">№{{ event.id }}</div>
    <div class="event-reservation__number">
      <span class="text-semibold">{{ reservationMeta?.name_for_reservation }}; </span>
      <span class="text-semibold">{{ reservationMeta?.num_people }}</span>
      <span class="text-8">чел</span>
    </div>
    <div class="text-semibold text-8 event-reservation__status event__status" :class="currentStatus.selector">
      {{ currentStatus.text }}
    </div>
    <div class="event-reservation__phone">
      <BaseIcon :name="'phone'" class="event-reservation__phone_icon" />{{ reservationMeta?.phone_number }}
    </div>
    <div>{{ getTime(event.start) }}-{{ getTime(event.end) }}</div>
  </div>
</template>

<style lang="scss" scoped>
.event-reservation {
  &:before,
  &:after {
    background-color: var(--reservation-clr);
  }
  &:has(.status-live) {
    &:before {
      background-color: var(--reservation-live-clr);
    }
    &:after {
      background-color: var(--reservation-live-clr);
    }
  }
  &__phone {
    display: flex;
    align-items: center;
    &_icon {
      flex: 0 0 12px;
      height: 12px;
      color: var(--white);
    }
  }
  &__status {
    background-color: var(--reservation-status-default-bg);
    color: var(--reservation-status-default-text);
    &.status-request {
      background-color: var(--reservation-status-awaiting-bg);
      color: var(--reservation-status-awaiting-text);
    }
    &.status-open {
      background-color: var(--reservation-status-hall-bg);
      color: var(--reservation-status-hall-text);
    }
    &.status-close {
      background-color: var(--reservation-status-cancel-bg);
      color: var(--reservation-status-cancel-text);
    }
    &.status-live {
      background-color: var(--reservation-status-live-bg);
      color: var(--reservation-status-live-text);
    }
  }
}
</style>
