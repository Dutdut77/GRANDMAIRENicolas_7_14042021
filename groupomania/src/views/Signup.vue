<template>
  <section>
    <div class="content">
      <div class="login">
        <div class="form">
          <img src="../assets/avatar.svg" class="avatar" />
          <div class="titre"><h1>INSCRIPTION</h1></div>
          <div class="form__group">
            <Input v-model="contentNom" :inputInfo="inputNom" />
          </div>
          <div class="form__group">
            <Input v-model="contentPrenom" :inputInfo="inputPrenom" />
          </div>
          <div class="form__group">
            <Input v-model="contentPseudo" :inputInfo="inputPseudo" />
          </div>
          <div class="form__group">
            <Input v-model="contentEmail" :inputInfo="inputEmail" />
          </div>
          <div class="form__group">
            <Input v-model="contentPassword" :inputInfo="inputPassword" />
          </div>
          <div class="form__group">
            <InputFile v-model="contentImageUrl" :inputInfo="inputImageUrl" />
          </div>
        </div>
        <button
          class="custom-btn btn-10"          
          @click="signup()"
        >
          <span v-if="status == 'loading'">Connexion en cours</span>
          <span v-else>ENREGISTRER</span>
        </button>
{{contentImageUrl}}

        <div class="error" v-if="status == 'error_login'">
          Erreur lors de l'enregistrement
        </div>
      </div>

      <div class="signup">
        <img src="../assets/profil.svg" class="profil" />
        <div class="profil--titre">
          Déjà inscrit ? Connectez-vous
          <router-link to="/login">Par ici </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import Input from "@/components/Input.vue";
import InputFile from "@/components/InputFile.vue";

export default {
  name: "Signup",
  components: { Input, InputFile },
  data() {
    return {

      contentNom: null,
      contentPrenom: null,
      contentPseudo: null,
      contentEmail: null,
      contentPassword: null,
      contentImageUrl: null,

      inputEmail: {
        name : "email",
        title: "Votre Email :",
        type: "text",
        class: ""
      },
      inputPassword: {
        name : "password",
        title: "Votre Password :",
        type: "password",
        class: ""
      },
      inputNom: {
        name : "nom",
        title: "Votre nom :",
        type: "text",
        class: ""
      },
      inputPrenom: {
        name : "prenom",
        title: "Votre Prenom :",
        type: "text",
        class: ""
      },
      inputPseudo: {
        name : "pseudo",
        title: "Votre Pseudo :",
        type: "text",
        class: ""
      },
      inputImageUrl: {
         title: "Choisissez votre photo",
      },
    };
  },
  computed: {
    ...mapState(["status"]),
  },
  methods: {
    signup() {
      const self = this;
      this.$store
        .dispatch("signup", {
          email: this.contentEmail,
          password: this.contentPassword,
          nom: this.contentNom,
          prenom: this.contentPrenom,
          pseudo: this.contentPseudo,
          role: 1,
          image_url: this.contentImageUrl,
        })
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
      console.log(this.contentImageUrl.name)   
      this.contentImageUrl = event.target.files[0];
    },
  },
};

</script>

<style scoped lang="scss">
$primary: #091f43;
$secondary: #d1515a;
$white: #fff;
$gray: #091f43;
section {
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.signup {
  width: 50%;
  display: flex;
  flex-direction: column;
  display: none;
  @media (min-width: 768px) {
    display: block;
    animation-name: fade-in;
    animation-duration: 3s;
  }
}
.profil {
  margin: auto;
  width: 60%;
  height: 100%;
  margin-bottom: 40px;

  &--titre {
    font-size: 1.3rem;
    color: $primary;
  }
}

.login {
  display: flex;
  flex-direction: column;

  align-items: center;
  width: 100%;
  height: 100%;
  padding: auto;

  @media (min-width: 768px) {
    justify-content: center;
    border-right: solid 2px $primary;
    width: 50%;
  }
}
.avatar {
  width: 25%;
  @media (min-width: 768px) {
    width: 15%;
  }
}
.titre {
  width: 100%;
  h1 {
    font-size: 1.3rem;
    color: $primary;
    @media (min-width: 768px) {
      font-size: 2rem;
    }
  }
}
.form {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.form__group {
  margin: 15px;
  width: 80%;
  @media (min-width: 768px) {
    width: 40%;
  }
}




.custom-btn {
  color: $primary;
  width: 70%;
  height: 50px;
  margin: 40px 20% 0 20%;
  padding: 0 15px;
  border: 2px solid $primary;
  font-size: 1.3rem;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
}

.btn-10 {
  transition: all 0.3s ease;
  overflow: hidden;
}

.btn-10:hover {
  border: 2px solid $secondary;
  background: $secondary;
}
</style>