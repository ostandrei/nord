import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "signup",
    component: () => import("@/components/Signup.vue"),
  },
  {
    path: "/success",
    name: "success",
    component: () => import("@/components/Success.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
