<script lang="ts" setup>
import { defineProps } from 'vue'
import type { Table } from '@/types'

interface Props {
  tables: Table[]
}

const props = defineProps<Props>()
</script>
<template lang="">
  <div class="table-header booking-table__header">
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

<style lang="scss"></style>
