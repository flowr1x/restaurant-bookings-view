<script setup lang="ts">
import BaseButton from './UI/BaseButton.vue'
import { defineProps } from 'vue'
import type { AvailableDaysFormat } from '@/types'

interface Props {
  availableDays: AvailableDaysFormat[]
}

const props = defineProps<Props>()
</script>

<template>
  <div class="container">
    <h1>Бронирование</h1>
    <ul>
      <li v-for="day in props.availableDays" :key="day.data">
        <BaseButton>
          <span class="text-semibold">{{ day.data }}</span>
          <span>{{ day.prefix }}</span>
        </BaseButton>
      </li>
    </ul>
  </div>
</template>

<style class="scss">
.text-semibold {
  font-weight: 600;
}
</style>
