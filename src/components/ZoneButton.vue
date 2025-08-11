<script setup lang="ts">
import { defineProps } from 'vue'
import type { Zone } from '@/types'
import { useBookingStore } from '@/stores/bookingStore'

interface Props {
  zone: Zone
}

const props = defineProps<Props>()
const bookingStore = useBookingStore()
</script>

<template>
  <li class="booking-item-btn">
    <BaseButton :class="{ active: bookingStore.isActiveZone(props.zone) }" @click="bookingStore.toggleZone(props.zone)">
      <span>{{ zone }}</span>
    </BaseButton>
  </li>
</template>

<style lang="scss"></style>
