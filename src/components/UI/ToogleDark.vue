<script setup lang="ts">
import { useDark, useToggle} from '@vueuse/core'
import MainIcon from '@/components/UI/MainIcon.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)

</script>
<template lang="">
  <button class="btn-toggle-dark" :class="{dark: isDark}" @click="toggleDark()">
    <MainIcon :name="isDark ? 'Sun' : 'Moon'"/>
  </button>
</template>

<style lang="scss">
  .btn-toggle-dark {
    height: 24px;
    width: 24px;
    background-color: var(--gray);
    border-radius: 4px;
    padding: 4px;
    color: var(--white);
  }
</style>