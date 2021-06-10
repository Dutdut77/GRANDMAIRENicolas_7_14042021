<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
    <body>
    <header>
      <Navbar />
    </header>
    <div class="container">
      <router-view /> 
    </div>

  </body>
 
</template>


<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Groupomania",
  components: {
    Navbar,
  },
};
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

*{
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}

.container {
  padding-top: 60px;
}
</style>
