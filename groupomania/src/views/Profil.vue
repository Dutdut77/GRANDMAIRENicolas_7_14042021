<template>
  <div class="container">
    <h1>Mon Profil</h1>
    <div class="card">
        Nom : {{profil.nom}} <br />
        Prénom : {{profil.prenom}}<br />
         Pseudo : {{profil.pseudo}} <br />
         Email : {{profil.email}}<br />
         Avatar : {{profil.avatar}}<br />
         Niveau : {{profil.titre}}<br />
         </div>
  </div>
</template>

<script>
import { mapState } from "vuex";


export default {
    
  name: "Profil",
  mounted() {
    this.$store.dispatch("getProfil");
  },
    computed: {
    ...mapState(["profil"]),
  },
};
</script>

<style>
</style>