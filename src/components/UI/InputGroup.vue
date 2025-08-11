<template>
  <div class="input-group">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.input-group {
  display: flex;
  align-items: center;
  & .input {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
