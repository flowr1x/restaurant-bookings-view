<script setup lang="ts">
import { defineProps } from 'vue'
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'

type Props = {
  icon: string
}
const props = defineProps<Props>()
</script>

<template>
  <BaseButton class="btn-icon">
    <BaseIcon :name="props.icon" />
    <span class="btn-icon-slot"><slot>Выйти</slot></span>
  </BaseButton>
</template>

<style lang="scss" scoped>
.btn-icon {
  flex-direction: row;
  gap: 4px;
  border-radius: 4px;
  @media screen and (max-width: 767px) {
    & {
      padding: 4px;
      height: 24px;
      width: 24px;
    }
    &-slot {
      display: none;
    }
  }
}
</style>
