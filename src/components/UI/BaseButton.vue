<script setup lang="ts"></script>

<template>
  <button type="button" class="btn"><slot></slot></button>
</template>

<style class="sass" scoped>
.btn {
  padding: 4px 8px;
  display: inline-flex;
  flex-direction: column;
  text-align: left;
  border-radius: var(--btn-border-radius);
  background-color: var(--btn-bg);
  color: var(--btn-text-color);
  transition-property: background-color;
  transition-duration: 0.3s;
  font-size: 12px;
}
@media screen and (hover: hover) {
  .btn:hover {
    background-color: var(--btn-bg-hover);
  }
}
</style>
