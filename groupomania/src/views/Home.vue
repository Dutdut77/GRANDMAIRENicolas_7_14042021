<template>

    <div class="content"> 
  Le contenu <br>
  {{afficheMessage}}
    </div>

</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: { },
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
