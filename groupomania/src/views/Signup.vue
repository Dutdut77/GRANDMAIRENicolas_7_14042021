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
                <div class="file-input">
              <input type="file" name="file-input" id="file-input" class="file-input__input" @change="previewFile" />
              <label class="file-input__label" for="file-input">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="upload"  class="svg-inline--fa fa-upload fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 512 512" >
                    <path fill="currentColor" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z" ></path>
                  </svg>
                <span v-if="contentImageUrl === null">Choissisez votre Photo</span>
             <span v-else>{{contentImageUrl.name}}</span>
             </label>
    </div>
              </div>      
        </div>
        
        <button
          class="custom-btn btn-10"          
          @click="signup()"
        >
          <span v-if="status == 'loading'">Connexion en cours</span>
          <span v-else>ENREGISTRER</span>
        </button>


        <div class="error" v-if="status == 'error_login'">
          <div class="list-error" v-for="(err, index) in errMessage" :key="index">
              <li>{{err.message}}</li>
          </div>
        </div>

        <!-- <div class="error" v-if="status == 'error_login'">
          Erreur lors de l'enregistrement
        </div> -->
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


export default {
  name: "Signup",
  components: { Input},
  data() {
    return {

      contentNom : "",
      contentPrenom : "",
      contentPseudo : "",
      contentEmail : "",
      contentPassword : "",
      contentImageUrl : null,

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

    };
  },
  computed: {
    ...mapState(["status", "errMessage"]),
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
      this.contentImageUrl = event.target.files[0];         
    },
  },
};

</script>

<style scoped lang="scss">
@import "bootstrap/scss/bootstrap.scss";
$gray: #091f43;


section {
   padding-top: 160px;
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
  margin : 20px 0;
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
  color: white;;
}

.file-input__input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.file-input__label {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  font-size: 14px;
  padding: 10px 12px;
  background-color: $secondary;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
}

.file-input__label svg {
  height: 16px;
  margin-right: 4px;
}

.error {
  width: 80%;
  background-color : $secondary;
  color: white;
  margin-top : 20px;
padding: 10px;
border-radius : 4px;
}

.list-error {
  padding: 5px;
}
</style>