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
      <li><a href="#">Accueil</a></li>
      <li><a href="#">Se connecter</a></li>
      <li><a href="#">S'enregistrer</a></li>
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
      document.getElementById("menu-bg").classList.toggle("change-bg");
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
  position: absolute;

}
.logo {
  display: flex;
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
  min-height: calc(100vh - 60px);
  padding: 0;
  margin: 0;
  transition: 0.9s ease;
  display: none;
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    background: none;
    width: auto;
    min-height: auto;
  }
}

.nav li {
  list-style: none;
  padding: 10px 10px;
}

.nav li a {
  color: #fff;
  text-decoration: none;
}
.nav li a:hover {
  font-weight: bold;
}

.change {
  display: block;

}
</style>
