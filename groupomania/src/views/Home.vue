<template>
<body>
    <header>
  <Navbar /> 
      </header>
  </body>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Home",
  components: {
    Navbar,
  },
};
</script>

<style scoped lang="scss">
body {
  background-color: white ;
  background-size: cover;
  height: 100vh;
}
</style>
