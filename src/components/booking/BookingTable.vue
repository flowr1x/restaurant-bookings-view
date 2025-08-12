<script setup lang="ts">
import { defineProps, toRef, onMounted, onBeforeUnmount, ref, useTemplateRef } from 'vue'
import type { Table, Zone } from '@/types'
import TableHeader from './TableHeader.vue'
import EventBlock from './EventBlock.vue'
import TimelineRow from './TimelineRow.vue'

import { useTimescale } from '@/composables/useTimescale'
import { useEvents } from '@/composables/useEvents'
import { createGlobalState } from '@vueuse/core'

interface Props {
  tables: Table[]
  selectedDate: string
  openingTime: string
  closingTime: string
  activesZone: Zone[]
}

const props = defineProps<Props>()

const timeline = useTimescale(props.openingTime, props.closingTime)
const { allEvents } = useEvents(props.tables, toRef(props, 'selectedDate'), toRef(props, 'activesZone'))

const headerRef = ref(null);
const tableRef = ref(null);



const onScroll = () => {
  if (!headerRef.value?.root || !tableRef.value) return;

  const headerEl = headerRef.value.root;
  const tableEl = tableRef.value;

  const rect = tableEl.getBoundingClientRect();
  const headerHeight = headerEl.offsetHeight;
  const scrollLeft = tableEl.scrollLeft ?? 0;


  let top = 0;
  if (rect.top < 0 && rect.bottom > headerHeight) {
    top = -rect.top; 
  } else {
    top = 0;
  }

  headerEl.style.position = 'relative';
  headerEl.style.top = `${top}px`;
};
let ticking = false;

const onScrollHandler = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      onScroll();
      ticking = false;
    });
    ticking = true;
  }
};
onMounted(() => {
  window.addEventListener('scroll', onScrollHandler);
  onScroll(); // сразу проверяем
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScrollHandler);
});
</script>

<template>
  <section class="section section-booking">
    <div class="section-wrapper" ref="tableRef">
      <div class="container">
      <div class="booking-table" >
        <!-- Основная таблица -->
        <div class="booking-table__body">
          <TableHeader  ref="headerRef" :tables/>
          <!-- Отрисовка бронирований -->
          <EventBlock v-for="event in allEvents" :key="event.id" :event :openingTime :closingTime />
          <!-- Отрисовка сетки -->
          <TimelineRow v-for="time in timeline" :key="time" :tables :time />
        </div>
      </div>
    </div>
    </div>

  </section>
</template>

<style lang="scss">
.section-booking {
  overflow: hidden;
}
.section-wrapper {
  overflow:auto;
}
.booking-table {
  position: relative;
  &__body {
    position: relative;
  }
}
</style>
