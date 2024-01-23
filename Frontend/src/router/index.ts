import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { useUserStore } from "@/store/auth.module";

import HomeView from "../views/HomeView.vue";
import TestView from "../views/TestView.vue";
import accountRoutes from "./account.routes";
import projectRoutes from "./project.routes";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  ...accountRoutes,
  ...projectRoutes,
  {
    path: "/test",
    name: "Test",
    component: TestView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const auth = useUserStore();

  if (authRequired && !auth.data.isAuthorised) {
    // auth.returnUrl = to.fullPath;
    return "/login";
  }
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (store.getters.isAuthenticated) {
//       next();
//       return;
//     }
//     next("/login");
//   } else {
//     next();
//   }
// });

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.guest)) {
//     if (store.getters.isAuthenticated) {
//       next("/test");
//       return;
//     }
//     next();
//   } else {
//     next();
//   }
// });

export default router;
