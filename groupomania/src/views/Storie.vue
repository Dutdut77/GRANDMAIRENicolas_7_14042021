<template>
  <section>
    <h1>Album photo GROUPOMANIA</h1>
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
import Card from "@/components/Card2.vue";

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

<style lang="scss">


section {
  padding-top: 160px;
  display : flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;


}
section h1 {
  width: 100%;
  padding: 30px;
  font-size: 1.9rem;
}

.card {
  margin: 20px;
}
</style>
