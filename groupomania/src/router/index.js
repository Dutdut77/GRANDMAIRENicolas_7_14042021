import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Storie from "../views/Storie.vue";
import OneStorie from "../views/OneStorie.vue";
import NotFound from "../views/NotFound.vue";
import Profil from "../views/Profil.vue";
import Admin from "../views/Admin.vue";

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
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      title: "Admin - Groupomania",
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
    path: "/profil",
    name: "Profil",
    component: Profil,
    meta: {
      title: "Mon profil",
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
