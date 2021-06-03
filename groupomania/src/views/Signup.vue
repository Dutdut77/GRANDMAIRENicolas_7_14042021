<template>
<div class="content">

  Nom : <input type="text" v-model="nom" /> <br /><br />
  Prénom : <input type="text" v-model="prenom" /> <br /><br />
  Pseudo : <input type="text" v-model="pseudo" /> <br /><br />
      Email : <input type="text" v-model="email" /> <br /><br />
      Password : <input type="text" v-model="password" /> <br /><br />
       Photo : <input type="file"  @change="previewFile" /> <br /><br />
      
      <button  class="button" :class="{ 'button-disabled': !validatedFields }" @click="signup()">
        <span v-if="status == 'loading'">Connexion en cours</span>
        <span v-else>S'enregistrer</span>
      </button>      
      <div class="error" v-if="status == 'error_login'">
        Erreur lors de l'enregistrement
      </div>
</div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";

export default {
  name: "Signup",
  components: {
  },
  data() {
    return {
      nom : null,
      prenom : null,
      pseudo : null,
      email: null,
      password: null,      
      image_url : null,
    };
  },
  computed: {
    validatedFields() {
      return  this.email != "" && this.password != "" && this.pseudo != "" && this.nom != ""  && this.prenom != "" ? true : false;
    },
    ...mapState(["status"])
  },
  methods: {
    signup() {
      const self = this;
      this.$store.dispatch("signup", {email: this.email, password: this.password, nom: this.nom, prenom: this.prenom, pseudo: this.pseudo, role: 1, image_url:this.image_url})
        .then(
          function () {
            self.$router.push("/storie");
          },
          function (error) {
            console.log(error);
          }
        );
    },
    previewFile() {      
      this.image_url = event.target.files[0];
      // this.image_url = formData.append('files', this.files[i])
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