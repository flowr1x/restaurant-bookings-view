<script setup lang="ts">
import { defineProps } from 'vue'
import BaseButton from './BaseButton.vue'
import MainIcon from './MainIcon.vue'

type Props = {
  icon: string
}
const props = defineProps<Props>()
</script>

<template>
  <BaseButton class="btn-icon">
    <MainIcon :name="props.icon" />
    <slot>Выйти</slot>
  </BaseButton>
</template>

<style lang="scss" scoped>
.btn-icon {
  flex-direction: row;
  gap: 4px;
  border-radius: 4px;
}
</style>
