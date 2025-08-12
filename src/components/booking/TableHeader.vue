<script lang="ts" setup>
import { defineProps, ref, defineExpose } from 'vue'
import type { Table } from '@/types'

interface Props {
  tables: Table[]
}
const props = defineProps<Props>()

const root = ref<HTMLElement | null>(null);
defineExpose({
  root, // expose ref с корневым элементом
});
</script>
<template lang="">
  <div class="table-header booking-table__header" ref="root">
    <div class=""></div>
    <div v-for="table in props.tables" :key="table.id" class="table-header__cell">
      <div class="table-header__top">
        <span class="table-header__number">{{ table.number }}</span>
        <span class="table-header__capacity">{{ table.capacity }} чел</span>
      </div>
      <span class="table-header__zone">{{ table.zone }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table-header {
  will-change: transform, top;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 32px;
  grid-auto-columns: 80px;
  white-space: nowrap;
  position: sticky;
  top: 0;
  z-index: 999;
  &__cell {
    padding: 4px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: flex;
    flex-direction: column;
    color: var(--text-color);
    text-align: center;
    padding: 7px;
  }
  &__top {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin-bottom: 4px;
  }
  &__number {
    font-weight: 600;
    font-size: 13px;
    line-height: 20px;
    color: var(--white);
    &:before {
      content: '#';
      color: var(--text-color);
      font-size: 11px;
      line-height: 14px;
      font-weight: 400;
    }
  }
}
</style>
