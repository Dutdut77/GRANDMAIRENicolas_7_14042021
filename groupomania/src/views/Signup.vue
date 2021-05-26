<template>
    <body>
    <header>
      <Navbar />
    </header>
    <div class="content"> 
  Signup
    </div>
  </body>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Signup",
  components: {
    Navbar,
  },
};
</script>

<style scoped lang="scss">
body {
  width: 100%;
  
}
.content {
 padding-top : 70px;
 color : #000;
}

</style>