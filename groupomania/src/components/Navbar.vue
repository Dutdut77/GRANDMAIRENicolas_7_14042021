<template>
    <div class="navbar">
        <div class="logo">
            Dark World
        </div>
        <a href="#" class="hamburger" id="hamburger" @click="ShowMenu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </a>
        <nav>
            <ul>
                <li><a class="active" href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Projects</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    ShowMenu() {
      const hamburger = document.getElementById("hamburger");
      const ul = document.querySelector("nav > ul");
      ul.classList.toggle("menu-slide");
      hamburger.classList.toggle("cross");
    },
  },
};
</script>

<style lang="scss">
a {
  text-decoration: none;
  text-transform: uppercase;
}

ul {
  list-style-type: none;
}

.navbar {
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.7);
  align-items: center;
  padding: 2rem 0rem;
  height: 8vh;
}

.navbar .logo {
  font-size: 1rem;
  margin: 0rem 1.5rem;
}

ul {
  display: flex;
  justify-content: space-evenly;
}

ul li {
  margin-right: 1rem;
}

ul li a {
  font-size: 1.3 rem;
  padding: 8px 10px;
}

ul li a.active,
ul li a:hover {
  background-color: grey;
  transition: 0.5s;
  border-radius: 4px;
}

.hamburger {
  position: absolute;
  right: 1.5rem;
  flex-direction: column;
  justify-content: space-between;
  width: 20px;
  height: 16px;
  display: none;
}

.hamburger .bar {
  height: 2px;
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  transition: 0.3s all;
}

@media (max-width: 768px) {

  .hamburger {
    display: flex;
    cursor: pointer;
  }

  ul {
    flex-direction: column;
    position: absolute;
    top: 8vh;
    background-color: rgba(0, 0, 0, 0.7);
    height: 86vh;
    width: 100%;
    align-items: center;
    transition: right 0.3s ease-in;
  }

  ul li {
    margin-right: 0px;
  }

  .menu-slide {
    right: 0%;
    transition: right 0.3s ease-in;
  }

  .cross .bar:nth-child(2) {
    opacity: 0;
  }
  .cross .bar:first-child {
    transform: rotate(-45deg) translate(-5px, 7px);
  }
  .cross .bar:last-child {
    transform: rotate(45deg) translate(-5px, -7px);
  }
}
</style>
