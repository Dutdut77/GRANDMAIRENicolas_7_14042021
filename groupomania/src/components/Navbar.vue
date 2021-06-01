<template>
  <div class="navbar">
    <img
      class="logo"
      src="../assets/logo.svg"
      alt="Groupomania Mon réseau social d'entreprise"
    />
    <div class="hamburger" id="hamburger" @click="ShowMenu()">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
    <ul class="nav" id="nav">
      <li><a href="#"><router-link to="/">Accueil</router-link></a></li>
      <li><a href="#"><router-link to="/login">Se connecter</router-link></a></li>
      <li><a href="#"><router-link to="/signup">S'enregistrer</router-link></a></li>
      <li><a href="#"><router-link to="/storie">Album</router-link></a></li>
      <li><a href="#"><router-link to="/profil">Mon profil</router-link></a></li>
      <li><a href="#"><router-link to="/logout">Logout</router-link></a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    ShowMenu() {
      document.getElementById("hamburger").classList.toggle("cross");
      document.getElementById("nav").classList.toggle("change");
    },
  },
};
</script>

<style scoped lang="scss">
.navbar {
  transition: 0.6s ease;
  background-color: #45cafc;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  position: fixed;
  @media (min-width: 768px) {
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
  }
}
.logo {
  display: flex;
  z-index: 10;
  align-items: center;
  color: white;
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
  background-color: white;
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
  background: linear-gradient(#45cafc, #303f9f);
  width: 100%;
  height: 0;
  padding: 0;
  margin: 0;
  visibility: hidden;
  transition: 0.4s ease;
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    background: none;
    height: 60px;
    width: auto;
    margin: 0 10px;
    z-index: 1;
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
  color: #fff;
  text-decoration: none;
}
.nav li a:hover {
  font-weight: bold;
}

.change {
  visibility: visible;
  z-index: 5;
  height: 100vh;
  transition: 0.4s ease;
}
</style>
