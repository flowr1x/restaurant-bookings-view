<script lang="ts" setup>
import { defineProps } from 'vue'
import type { Reservation, TableEvent } from '@/types'
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

const { currentStatus } = useStatusReservation(reservationMeta.value?.status)
</script>
<template>
  <div class="reservation" :style="getReservationStyle(props.event, openingTime, closingTime)">
    <div class="reservation__id text-semibold text-8">№{{ event.id }}</div>
    <div class="reservation__number">
      <span class="text-semibold">{{ reservationMeta?.name_for_reservation }}; </span>
      <span class="text-semibold">{{ reservationMeta?.num_people }}</span>
      <span class="text-8">чел</span>
    </div>
    <div class="text-semibold text-8 reservation__status" :class="currentStatus.selector">{{ currentStatus.text }}</div>
    <div class="reservation__phone">
      <BaseIcon :name="'phone'" class="reservation__phone_icon" />{{ reservationMeta?.phone_number }}
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
  border-radius: var(--reservation-border-radius);
  padding: 2px 6px;
  overflow: hidden;
  &__phone {
    display: flex;
    align-items: center;
    &_icon {
      flex: 0 0 12px;
      width: 12px;
      height: 12px;
    }
  }
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
    background-color: var(--reservation-clr);
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
    background-color: var(--reservation-clr);
    opacity: 0.16;

    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  &:has(.status-live) {
    &:before {
      background-color: var(--reservation-live-clr);
    }
    &:after {
      background-color: var(--reservation-live-clr);
    }
  }
  &__status {
    display: inline-block;
    background-color: var(--reservation-status-default-bg);
    color: var(--reservation-status-default-text);
    padding: 2px;
    border-radius: var(--reservation-border-radius);
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
