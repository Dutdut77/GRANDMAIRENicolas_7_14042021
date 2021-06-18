<template>
  <section>

    <div class="content">

      <div class="login">
        <div class="form">
        <img src="../assets/avatar.svg" class="avatar" />
        <div class="titre"><h1>INSCRIPTION</h1></div>
.
        <div class="form__group">
          <input
            type="text"
            class="form__field"
            placeholder="Nom"
            name="Nom"
            id="nom"
            autocomplete="off"
            v-model="nom"
          />
          
        </div>

        <div class="form__group">
          <input
            type="text"
            class="form__field"
            placeholder="Prenom"
            name="Prenom"
            id="prenom"
            autocomplete="off"
            v-model="prenom"
          />
          
        </div>

        <div class="form__group">
          <input
            type="text"
            class="form__field"
            placeholder="Pseudo"
            name="Pseudo"
            id="pseudo"
            autocomplete="off"
            v-model="pseudo"
          />
          
        </div>

        <div class="form__group">
          <input
            type="email"
            class="form__field"
            placeholder="Email"
            name="Email"
            id="email"
            autocomplete="off"
            v-model="email"
          />
          
        </div>

        <div class="form__group">
          <input
            type="password"
            class="form__field"
            placeholder="Mot de passe"
            name="Password"
            id="password"
            v-model="password"
          />
         
        </div>

        <div class="form__group form__file">
          <input type="file" id="file" class="custom-file-input" @change="previewFile" />
         </div>
</div>
        <button
          class="custom-btn btn-10"
          :class="{ 'button-disabled': !validatedFields }"
          @click="signup()"
        >
          <span v-if="status == 'loading'">Connexion en cours</span>
          <span v-else>ENREGISTRER</span>
        </button>

        <div class="error" v-if="status == 'error_login'">
          Erreur lors de l'enregistrement
        </div>
      </div>

      <div class="signup">
        <img src="../assets/profil.svg" class="profil" />
        <div class="profil--titre">
          Déjà inscrit ? Connectez-vous <router-link to="/login">Par ici </router-link>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";

export default {
  name: "Signup",
  components: {},
  data() {
    return {
      nom: null,
      prenom: null,
      pseudo: null,
      email: null,
      password: null,
      image_url: null,
    };
  },
  computed: {
    validatedFields() {
      return this.email != "" &&
        this.password != "" &&
        this.pseudo != "" &&
        this.nom != "" &&
        this.prenom != ""
        ? true
        : false;
    },
    ...mapState(["status"]),
  },
  methods: {
    signup() {
      const self = this;
      this.$store
        .dispatch("signup", {
          email: this.email,
          password: this.password,
          nom: this.nom,
          prenom: this.prenom,
          pseudo: this.pseudo,
          role: 1,
          image_url: this.image_url,
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
      this.image_url = event.target.files[0];
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
  margin-top: 160px;
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
  margin: 15px;
  @media (min-width: 768px) {
    width: 15%;
  }
}
.titre {
  width: 100%;
  margin: 10px;
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
  padding: 15px 0 0;
  margin: 10px;
  width: 80%;
      @media (min-width: 768px) {
       width: 40%;
    }
}

.form__field {
  width: 100%;
  border: 0;
  border-bottom: 2px solid $primary;
  outline: 0;
  font-size: 1.3rem;
  color: $primary;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;


  &:placeholder-shown ~ .form__label {
    font-size: 1.1rem;
    cursor: text;
    top: 20px;
    @media (min-width: 768px) {
      font-size: 1.3rem;
    }
  }
}
.form__file {
  width: 90%;
  margin : 15px;
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