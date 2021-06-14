<template>
  <section>
    <div class="custom-shape-divider-top-1623269035">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          opacity=".25"
          class="shape-fill"
        ></path>
        <path
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
          opacity=".5"
          class="shape-fill"
        ></path>
        <path
          d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
          class="shape-fill"
        ></path>
      </svg>
    </div>
    <div class="content">

      <div class="login">
        <div class="form">
        <img src="../assets/avatar.svg" class="avatar" />
        <div class="titre"><h1>ENREGISTREMENT</h1></div>
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
          <label for="nom" class="form__label">Nom :</label>
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
          <label for="prenom" class="form__label">Prénom :</label>
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
          <label for="pseudo" class="form__label">Pseudo :</label>
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
          <label for="email" class="form__label">Email :</label>
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
          <label for="password" class="form__label">Mot de passe :</label>
        </div>

        <div class="form__group form__file">
          <input type="file" id="file" class="custom-file-input" @change="previewFile" />
          <label for="file" class="form__label">File :</label>
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
.custom-shape-divider-top-1623269035 {
  padding-top: 60px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  z-index: -1;
}

.custom-shape-divider-top-1623269035 svg {
  position: relative;
  display: block;
  width: calc(168% + 1.3px);
  height: 100px;
  transform: rotateY(180deg);
}

.custom-shape-divider-top-1623269035 .shape-fill {
  fill: $secondary;
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
.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: $primary;
  z-index: -1;
}

.form__field:focus {
  ~ .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: $secondary;
  }
  padding-bottom: 6px;
  border-width: 3px;
  border-color: $secondary;
  border-image-slice: 1;
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