<script setup lang="ts">
interface Props {
  title: string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="booking-btns">
    <div class="booking-btns__title">{{ props.title }}</div>
    <ul class="booking-btns__list">
      <slot></slot>
    </ul>
  </div>
</template>

<style lang="scss">
.booking-btns {
  scrollbar-color: #414141 #9d9d9d;
  scrollbar-width: thin;
  overflow: auto;
  margin-right: -20px;
  &__title {
    margin-bottom: 4px;
  }
  &__list {
    display: flex;
    gap: 8px;
    width: 100%;
    & li {
      flex: 0 0 max-content;
    }
  }
  &__days {
    margin-bottom: 16px;
  }
}
</style>
