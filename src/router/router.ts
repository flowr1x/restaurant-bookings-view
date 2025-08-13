import { createRouter, createMemoryHistory } from 'vue-router'

const routes = [{ path: '/', component: () => import('@/views/BookingPage.vue') }]

const router = createRouter({
  history: createMemoryHistory('/restaurant-bookings-view/'),
  routes,
})

export default router
