<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col">
          <Card />
        </div>
        <div class="col">
          
         <div class="row">
            <h1>Bienvenue sur le réseau social interne GROUPOMANIA</h1>
        </div>
<div class="row">
            <p>
              Postez ici vos photos afin de favoriser les échanges entre
              collègues.
            </p>
            </div>
            <div class="row">
              <div class="col">
            <button type="button" class="btn btn-outline-secondary" @click="storie()">ALBUM PHOTO</button>
            </div>
            <div class="col">
            <button type="button" class="btn btn-outline-primary" @click="ajout()">AJOUTER PHOTO</button>
       </div>
       </div>
         
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Card from "@/components/Card.vue";
// @ is an alias to /src

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
@import "bootstrap/scss/bootstrap.scss";



section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 130px;
  min-height: 100vh;
}

.content {
  min-width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}

.titre {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 40px 0;
  order: -1;

}
.titre h1,
p {
  color: $primary;
}

.titre h1 {
  font-size: 2.1rem;
  padding: 40px;
}
.titre p {
  font-size: 1.4rem;
}



</style>
