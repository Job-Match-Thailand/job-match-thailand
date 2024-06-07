
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../pages/index'), },
  { path: '/profile', component: () => import('../views/profile/ProfileManage'), },
  { path: '/register', component: () => import('../views/register/RegisterForm'), },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), routes
})

export default router
