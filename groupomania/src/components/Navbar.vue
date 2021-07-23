<template>

  <div class="navbar">

          <div class="mobile"></div>
    <img
      class="logo"
      src="../assets/logo-blue.png"
      alt="Groupomania Mon réseau social d'entreprise"
    />
    <div class="hamburger" id="hamburger" @click="ShowMenu()">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
    <ul class="nav" id="nav">
      <li><a href="#" @click="HideMenu()"><router-link to="/">ACCUEIL</router-link></a></li>
      <li v-if="user.userId < 0" ><a href="#" @click="HideMenu()"><router-link to="/login">CONNEXION</router-link></a></li>
      <li v-if="user.userId < 0" ><a href="#" @click="HideMenu()"><router-link to="/signup">INSCRIPTION</router-link></a></li>
      <li v-if="user.userId > 0" ><a href="#" @click="HideMenu()"><router-link to="/storie">ALBUM</router-link></a></li>
      <li v-if="user.userId > 0" ><a href="#" @click="HideMenu()"><router-link to="/profil">PROFIL</router-link></a></li>      
      <li v-if="user.role === 0" ><a href="#" @click="HideMenu()"><router-link to="/Admin">ADMIN</router-link></a></li>
      <li v-if="user.userId > 0" ><a href="#" @click="Logout()">LOGOUT</a></li>
    </ul>

  </div> 

</template>

<script>
import { mapState } from "vuex";


export default {
  name: "Navbar",

  methods: {
    ShowMenu() {
      document.getElementById("hamburger").classList.toggle("cross");
      document.getElementById("nav").classList.toggle("change");
    }, 
    HideMenu() {
      document.getElementById("hamburger").classList.remove("cross");
      document.getElementById("nav").classList.remove("change");
      this.$store.commit("errMessage","");
      this.$store.commit("setStatus","");
    }, 
    Logout() {
      this.$router.push({ name: "Home"});
      localStorage.removeItem('user');
      this.$store.commit("deleteStore");
      
    }
  },
   computed: {
    ...mapState(["user"]),
  }
};

</script>

<style scoped lang="scss">

@import "bootstrap/scss/bootstrap.scss";


.navbar {
  transition: 0.6s ease;
  background-color: $secondary;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  position: fixed;
  z-index: 100;
  @media (min-width: 768px) {
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
  }
}

.mobile{  
  height: 30px;
  width: 100%;
    @media (min-width: 768px) {
display: none;
  }
}
.logo {
  display: flex;
  z-index: 10;
  align-items: center;  
  height: 35px;
  font-size: 1rem;
  margin: 0 1rem;
}
.hamburger {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  margin: 0rem 1.5rem;
  width: 30px;
  height: 100%;
  cursor: pointer;
  z-index: 10;
  @media (min-width: 768px) {
    display: none;
  }
}
.hamburger .bar {
  height: 3px;
  width: 100%;
  margin: 2px;
  background-color: #091f43;
  border-radius: 10px;
  transition: 0.3s ease;
}
.cross .bar:nth-child(2) {
  opacity: 0;
}
.cross .bar:first-child {
  transform: rotate(-45deg) translate(-3px, 7px);
}
.cross .bar:last-child {
  transform: rotate(45deg) translate(-3px, -7px);
}

.nav {
  display: flex;
  flex-direction: column;
  background: linear-gradient(#d1515a, #f3838a);
  font-size: 1.2rem;
  width: 100%;
  height: 0;
  padding: 0;
  margin: 0;
  visibility: hidden;
  transition: 0.1s ease;
 
  
   @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    background: none;
    height: 60px;
    width: auto;
    margin: 0 10px;
    visibility: visible;
  }
}
.nav li:first-child {
  margin-top: 50px;
    @media (min-width: 768px) {
    margin-top: 0;
   }
}
.nav li {
  list-style: none;
  padding: 10px 10px;
  @media (min-width: 768px) {
    display: block;
  }
}

.nav li a {
  color: #091f43;
  text-decoration: none;
}
.nav li a:hover {
  font-weight: bold;
}

.change {
  visibility: visible;
  position: relative;
  z-index: 500;
  height: 100vh;
  transition: 0.4s ease;
}
</style>
