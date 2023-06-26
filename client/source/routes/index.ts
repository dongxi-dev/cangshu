import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  { path: "", component: () => import("~/views/home.vue") },
  {
    path: "/workspace",
    component: () => import("~/layouts/workspace.vue"),
    children: [
      {
        path: "files",
        component: () => import("~/views/files.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
