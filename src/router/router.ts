import { createRouter, createMemoryHistory } from 'vue-router'

const routes = [{ path: '/', component: () => import('@/views/BookingPage.vue') }]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
