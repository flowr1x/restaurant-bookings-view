<script lang="ts" setup>
import { defineProps } from 'vue'
import type { Reservation } from '@/types'
import { getReservationStyle } from '@/utils/getReservationStyle'

interface Props {
  reservation: Reservation
  openingTime: string
  closingTime: string
}

const props = defineProps<Props>()
</script>
<template lang="">
  <div
    class="reservation"
    :style="getReservationStyle(props.reservation, openingTime, closingTime)"
  >
    {{ reservation.id }}
  </div>
</template>

<style lang="scss"></style>
