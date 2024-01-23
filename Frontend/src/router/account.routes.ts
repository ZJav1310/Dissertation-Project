import LoginView from "@/views/account/LoginView.vue";
import RegisterView from "@/views/account/RegisterView.vue";
import ProfileView from "@/views/account/ProfileView.vue";
import NotificationsView from "@/views/account/NotificationsView.vue";

import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: { guest: true },
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
    meta: { guest: true },
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: NotificationsView,
  },
  {
    path: "/profile",
    name: "My Profile",
    component: ProfileView,
  },
];

export default routes;
