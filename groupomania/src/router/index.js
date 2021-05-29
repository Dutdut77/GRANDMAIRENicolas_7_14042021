import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
//import store from "../store/";

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
    meta: {
      requiresAuth: true
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


router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    let user = localStorage.getItem('user');
    if (!user) {
      console.log("pas bon")
      next({ name: 'Login' })
    }
    else {
      console.log("ok")
      next()
    }
  }
  else {
    console.log("ok ok")
    next({ name: "Login", path: "/login" });
  }  
});

export default router;
