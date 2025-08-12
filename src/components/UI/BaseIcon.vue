<script setup lang="ts">
import { computed, defineProps } from 'vue'
const icons = import.meta.glob('@/components/icons/*.vue', { eager: true })

type Props = {
  name: string
}

const props = defineProps<Props>()
const iconComponent = computed(() => {
  const name = props.name[0].toUpperCase() + props.name.slice(1)
  const fileName = `/src/components/icons/Icon${name}.vue`

  return icons[fileName]?.default || null
})
</script>

<template>
  <component :is="iconComponent" v-bind="$attrs" class="icon" />
</template>

<style scoped>
.icon {
  display: inline-block;
  vertical-align: middle;
  width: 16px;
  height: 16px;
}
</style>
