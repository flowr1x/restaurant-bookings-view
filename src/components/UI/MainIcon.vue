
<script setup lang="ts">
import { computed, defineProps } from 'vue'
const icons = import.meta.glob('@/components/icons/*.vue', { eager: true })

type Props = {
  name: string
}

const props = defineProps<Props>();
console.log(icons)
const iconComponent = computed(() => {
  const fileName = `/src/components/icons/Icon${props.name}.vue`
  console.log(fileName)
  return icons[fileName]?.default || null
})
console.log(iconComponent.value)
</script>

<template>
  <component
    :is="iconComponent"
    v-bind="$attrs"
    class="icon"
  />
</template>

<style scoped>
.icon {
  display: inline-block;
  vertical-align: middle;
}
</style>
