import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/storie",
    name: "Storie",
    component: function () {
      return import(/* webpackChunkName: "storie" */ "../views/Storie.vue");
    },
  },
  {
    path: "/login",
    name: "Login",
    component: function () {
      return import(/* webpackChunkName: "login" */ "../views/Login.vue");
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: function () {
      return import(/* webpackChunkName: "signup" */ "../views/Signup.vue");
    },
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
