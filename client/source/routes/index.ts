import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('~/pages/login.vue'),
  },
  {
    path: '/workspace',
    component: () => import('~/pages/workspace.vue'),
    children: [
      {
        path: 'files',
        component: () => import('~/pages/files.vue'),
      },
    ],
  },
  {
    path: '/',
    redirect: '/workspace',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
