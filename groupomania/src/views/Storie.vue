<template>
  <section>
    <h1>Mes photos</h1>
    <Card  v-for="storie in stories" :key="storie.id" :storie="storie"/>




    <!-- <div class="card" v-for="storie in stories" :key="storie.id">
      Url photo : {{ storie.content }}<br />
      Nom utilisateur : {{ storie.userId }}<br />
      Date : {{ storie.date}}<br />
      <button @click="OneStorie(storie.id)">En savoir plus</button>
    </div> -->


  </section>
</template>

<script>
import { mapState } from "vuex";
import Card from "@/components/Card.vue";

export default {
  name: "Storie",
  mounted() {
    this.$store.dispatch("getAllStories");
  },
  components: { Card },
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
section {
  padding-top: 160px;
}
.card {
  margin: 20px;
}
</style>
