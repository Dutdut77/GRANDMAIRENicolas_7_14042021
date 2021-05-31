import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Storie from "../views/Storie.vue";
import OneStorie from "../views/OneStorie.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Groupomania",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: {
      title: "S'enregistrer",
    },
  },
  {
    path: "/storie",
    name: "Storie",
    component: Storie,
    meta: {
      title: "Album Groupomania",
      requiresAuth: true
    },
  },
  {
    path: "/onestorie/:id",
    name: "OneStorie",
    component: OneStorie,
    props: true,
    meta: {
      title: "Photo Groupomania",
      requiresAuth: true
    },
  },
  {
    path: "/:patchMatch(.*)",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: "404 Not Found",
    },
  },

];



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


router.afterEach((to) => {
  document.title = to.meta.title;
});


// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     let user = localStorage.getItem('user');
//     if (!user) {
//       console.log("pas bon")
//       next({ name: 'Login' })
//     }
//     else {
//       console.log("ok")
//       next()
//     }
//   }
//   else {
//     console.log("ok ok")
//     next({ name: "Login", path: "/login" });
//   }  
// });

export default router;
