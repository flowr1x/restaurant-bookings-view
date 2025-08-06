<script setup lang="ts">
import { onMounted } from 'vue'
import { useBookingStore } from './stores/bookingStore'
const bookingStore = useBookingStore()

onMounted(() => bookingStore.loadData())
</script>

<template>hello</template>

<style></style>
