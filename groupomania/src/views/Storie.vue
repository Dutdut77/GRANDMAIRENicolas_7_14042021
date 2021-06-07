<template>
  <div class="container">
    <h1>Mes photos</h1>
    <div class="card" v-for="storie in stories" :key="storie.id">
      Url photo : {{ storie.content }}<br />
      Nom utilisateur : {{ storie.userId }}<br />
      Date : {{ storie.date}}<br />
      <button @click="OneStorie(storie.id)">En savoir plus</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Storie",
  mounted() {
    this.$store.dispatch("getAllStories");
  },
  computed: {
    ...mapState(["stories"]),
  },
  methods: {
    OneStorie(id) {
      this.$router.push({ name: "OneStorie", params: { id: id } });
    },
  },
};
</script>

<style>
* {
  color: black;
}
.container {
  padding-top: 60px;
}
.card {
  margin: 20px;
}
</style>
