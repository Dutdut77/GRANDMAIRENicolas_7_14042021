import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Storie from "../views/Storie.vue";
import OneStorie from "../views/OneStorie.vue";
import NotFound from "../views/NotFound.vue";
import Profil from "../views/Profil.vue";
import Admin from "../views/Admin.vue";
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
      requiresAuth: true
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
    requiresAuth: true
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
    let start = store.state.user.start;
    let now = Date.now();
    let diff = now - start;
    // Vérification si le Token à été crée il y a plus de 24H.
    if (diff >= 86400000) { 
      localStorage.removeItem('user');
      store.state.user = "";
       next({ path: "/login" })
    }
    else {     
      next()
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
