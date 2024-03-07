import { useAuth } from "@/composables/auth";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login-layout",
      component: () => import("@/views/AuthLayout.vue"),
      children: [
        {
          path: "/login",
          name: "login",
          component: () => import("@/views/auth/LoginPage.vue"),
        },
      ],
    },
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

router.beforeEach(async (to) => {
  const { isAuthenticated } = useAuth();
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated && to.name !== "login") {
    // redirect the user to the login page
    return { name: "login" };
  } else {
    return true;
  }
});

export default router;
