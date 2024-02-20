import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main-layout",
      component: () => import("@/views/MainLayout.vue"),
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/views/DashboardPage.vue"),
        },
        {
          path: "/adherents",
          name: "adherents",
          component: () => import("@/views/adherents/AdherentPage.vue"),
        },
      ],
    },
  ],
});

export default router;
