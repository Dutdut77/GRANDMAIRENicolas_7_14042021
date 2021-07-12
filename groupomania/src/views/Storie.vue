<template>
  <section>

<div class="album-title">
 <h1>Album photo GROUPOMANIA</h1>
    <button type="button" class="btn btn-secondary text-white" @click="ajout()">
      AJOUTER PHOTO
    </button>
</div>
   

    <Card v-for="storie in stories" :key="storie.id" :storie="storie" />

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

<style scoped lang="scss">
@import "bootstrap/scss/bootstrap.scss";

section {
  padding-top: 160px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.album-title {
  width : 100%;
  display: flex;
 flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;  
}



</style>
