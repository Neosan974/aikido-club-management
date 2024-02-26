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
          children: [
            {
              path: "",
              name: "adherents.list",
              component: () => import("@/views/adherents/AdherentPage.vue"),
            },
            {
              path: ":id(\\d+)",
              name: "adherents.view",
              component: () => import("@/views/adherents/AdherentView.vue"),
            },
          ],
        },
      ],
    },
  ],
});

export default router;
