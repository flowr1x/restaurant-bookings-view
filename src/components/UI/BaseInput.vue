<script setup lang="ts">
import { defineEmits } from 'vue'

const emits = defineEmits(['update:modelValue'])
</script>

<template>
  <input class="input" @input="emits('update:modelValue', ($event.target as HTMLInputElement).value)" />
</template>

<style lang="scss" scoped>
input::placeholder {
  font-family: Inter, sans-serif;
  color: var(--input-text-placeholder);
  transition: color 0.3s;
}
.input {
  background-color: var(--input-bg);
  color: var(--input-text);
  font-size: var(--input-text-fz);
  padding: 7px 8px;
  border: var(--input-bd);
  border-radius: var(--input-border-radius);
  height: 28px;
  transition:
    background-color 0.3s,
    color 0.3s,
    border-color 0.3s;
}
</style>
