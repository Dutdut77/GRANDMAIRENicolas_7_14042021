<template>
  <section>
    <div class="container">
      <div class="row align-items-center d-flex">
        <div class="col-xs-12 col-lg-6 order-lg-2 my-3">
          <div class="row">
            <h1>Bienvenue sur le réseau social interne GROUPOMANIA</h1>
          </div>
          <div class="row">
            <p class="h6">
              Postez ici vos photos afin de favoriser les échanges entre
              collègues.
            </p>
          </div>
          <div class="row justify-content-center my-4">
            <div class="col-6 d-grid">
              <button
                type="button"
                class="btn btn-secondary"
                @click="storie()"
              >
                ALBUM PHOTO
              </button>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-lg-6 order-lg-1">
          <Card />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  name: "Home",
  components: { Card },
  methods: {
    storie() {
      this.$router.push("/storie");
    },
  },
};
</script>

<style scoped lang="scss">

section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 140px;
}
.container {
  margin: 50px 0;
}
.btn-secondary{
 color: #050C1A;
 font-weight: 600;
}
</style>
