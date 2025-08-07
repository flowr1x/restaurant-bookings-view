<script setup lang="ts">
import BaseButton from './UI/BaseButton.vue'
import { defineProps } from 'vue'
import type { Zone, AvailableDaysFormat } from '@/types'

interface Props {
  currentDay: string
  availableDays: AvailableDaysFormat[]
  zones: Zone[]
}

const props = defineProps<Props>()
</script>

<template>
  <section class="section">
    <div class="container">
      <h1>Бронирование</h1>
      <div class="block-btns block-btns__days">
        <div class="block-btns__title">Дата</div>
        <ul class="block-btns__list">
          <li v-for="day in props.availableDays" :key="day.date">
            <BaseButton :class="{ active: day.date === props.currentDay }">
              <span class="text-semibold">{{ day.day }}</span>
              <span>{{ day.prefix }}</span>
            </BaseButton>
          </li>
        </ul>
      </div>
      <div class="block-btns">
        <div class="block-btns__title">Отображаемые зоны</div>
        <ul class="block-btns__list">
          <li v-for="zone in props.zones" :key="zone">
            <BaseButton>
              <span>{{ zone }}</span>
            </BaseButton>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.text-semibold {
  font-weight: 600;
}
.block-btns {
  &__title {
    margin-bottom: 4px;
  }
  &__list {
    display: flex;
    gap: 8px;
  }
  &__days {
    margin-bottom: 16px;
  }
}
</style>
