import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Storie from "../views/Storie.vue";
import OneStorie from "../views/OneStorie.vue";
import NotFound from "../views/NotFound.vue";
import Profil from "../views/Profil.vue";
import Admin from "../views/Admin.vue";
import Lock from "../views/Lock.vue";
import store from "../store";


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Groupomania - Accueil",
      requiresAuth: false
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      title: "Admin - Groupomania",
      requiresAuth: true,
      isAdmin: true
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Connexion sur Groupomania",
      requiresAuth: false
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: {
      title: "Enregistrement sur Groupomania",
      requiresAuth: false
    },
  },
  {
    path: "/profil",
    name: "Profil",
    component: Profil,
    meta: {
      title: "Mon profil Groupomania",
      requiresAuth: true,

    },
  },
  {
    path: "/storie",
    name: "Storie",
    component: Storie,
    meta: {
      title: "Albums photos Groupomania",
      requiresAuth: true
    },
  },
  {
    path: "/lock",
    name: "Lock",
    component: Lock,
    meta: {
      title: "Locked Page",
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


router.beforeEach((to, from, next) => {

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const start = store.state.user.start;
    let now = Date.now();
    let diff = now - start;
    // V??rification si le Token ?? ??t?? cr??e il y a plus de 24H.
    if (diff >= 86400000 || isNaN(diff)) {
      localStorage.removeItem('user');
      store.state.user = {
        userId: -1,
        token: "",
      };
      next({ path: "/login" })
    }
  }

  if (to.matched.some((record) => record.meta.isAdmin)) {
    if (store.state.user.role === 0) {
      next()
    }
    else {
      next({ path: "/lock" })
    }
  }

  else {
    next(); //requiresAuth = false
  }



});


router.afterEach((to) => {
  document.title = to.meta.title;
});


export default router;
