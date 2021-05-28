<template>
  <div class="container">
    <h1>Mes photos</h1>
    <div class="card" v-for="storie in allStories" :key="storie.id">
      Url photo : {{storie.content}}<br />
      Nom utilisateur : {{storie.userId}}<br />
      Date : {{storie.date}}<br />
    </div>
    
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  
  name: "Storie",
  mounted () {
    this.$store.dispatch("getAllStories");
  },
  computed: {
    ...mapState(["allStories", "user"])
  },
  
};
</script>

<style>
* {
  color: black;
}
.card {
  margin : 20px;
}
</style>