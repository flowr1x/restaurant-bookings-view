<template>
  <div class="spinner"></div>
</template>

<style>
.spinner {
  width: 80px;
  height: 80px;
  border: 8px solid transparent;
  border-top: 8px solid var(--white);
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
  margin: 60px auto;
}

/* keyframes */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
