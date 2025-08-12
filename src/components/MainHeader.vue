<script lang="ts" setup></script>
<template>
  <header class="header">
    <div class="container header__container">
      <div class="header__logo">
        <BaseIcon :name="'logo'" class="header__logo-icon" />
      </div>
      <div class="header__block">
        <InputGroup>
          <InputGroupAddon>
            <BaseIcon :name="'search'" />
          </InputGroupAddon>
          <BaseInput type="text" placeholder="⌘+Л поиск по имени" />
        </InputGroup>
        <ToggleDark />
        <ButtonIcon :icon="'logout'">Выйти</ButtonIcon>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  padding: 15px 0;
  background-color: var(--header-bg);
  &__logo {
    color: var(--white);
    height: 14px;
    flex: 0 0 92px;
    &-icon {
      width: 100%;
      height: 100%;
    }
  }
  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }
  &__block {
    display: flex;
    gap: 8px;
    align-items: center;
  }
}
</style>
