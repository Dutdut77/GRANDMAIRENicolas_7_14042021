<template>
  <body>
    <header>
      <Navbar />
    </header>
    <div class="content"> 
  Le contenu <br>
  {{afficheMessage}}
    </div>
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
  computed: {
afficheMessage(){
  return this.$store.state.messageFromVuex;
}
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
