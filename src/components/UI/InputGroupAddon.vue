<template>
  <div class="input-group-addon">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.input-group-addon {
  background-color: var(--input-bg);
  color: var(--input-text);
  font-size: var(--input-text-fz);
  padding: 6px 8px;
  border: var(--input-bd);
  border-top-left-radius: var(--input-border-radius);
  border-bottom-left-radius: var(--input-border-radius);
}
</style>
