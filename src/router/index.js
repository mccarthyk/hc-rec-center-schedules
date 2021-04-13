import { createWebHistory, createRouter } from 'vue-router'
import Home from '../views/index.vue'
import Location from '../views/location.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/:sitecoreItemId',
    name: 'Location',
    component: Location,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  base: import.meta.env.PROD ? '/hc-rec-center-schedules/' : undefined,
  routes,
})

export default router
