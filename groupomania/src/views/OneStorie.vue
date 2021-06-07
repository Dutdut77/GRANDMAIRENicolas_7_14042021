<template>
  <div class="container">
    <h1>Mes photos</h1>
    <div class="card">
      id : {{id}}<br />
      Url photo : {{stories.content}}<br />
      Nom utilisateur : {{stories.userId}}<br />
      Date : {{stories.date}}<br />
      <button @click="Storie()">Retour</button>
    </div>
    
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  
  name: "OneStorie",
  props : ["id"],
  mounted () {
    this.$store.dispatch("getOneStorie", { id: this.id });
  },
  computed: {
    ...mapState(["stories"])
  },
  methods : {
    Storie() {
      this.$router.push({ path: '/storie' })
    }
  }
  
};
</script>

<style>
* {
  color: black;
}
.container {
  padding-top : 60px;
}
.card {
  margin : 20px;
}
</style>