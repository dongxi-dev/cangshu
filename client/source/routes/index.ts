import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

export type RouteRecord = RouteRecordRaw & {
  icon?: any;
  name?: string;
  hideInMenu?: boolean;
};

// const routes: RouteRecordRaw[] = [
//   { path: "", component: () => import("~/views/home.vue") },
//   { path: "/login", component: () => import("~/views/login.vue") },
//   {
//     path: "/workspace",
//     component: () => import("~/layouts/workspace.vue"),
//     children: [
//       {
//         path: "files",
//         component: () => import("~/views/files.vue"),
//       },
//     ],
//   },
// ];

export const routes: RouteRecord[] = [
  {
    path: "/",
    children: [
      {
        path: "/",
        name: "首页",
        component: () => import("~/views/home.vue"),
      },
      {
        path: "/workspace",
        component: () => import("~/layouts/workspace.vue"),
        name: "工作空间",
        children: [
          {
            path: "/workspace/files",
            name: "文件管理",
            component: () => import("~/views/files.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    component: () => import("~/views/login.vue"),
    hideInMenu: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
