<template>
  <section>
    <div class="content">

      <div class="signup">
        <img src="../assets/profil.svg" class="profil" />
        <div class="profil--titre">Pas encore inscrit ? <router-link to="/signup">Par ici </router-link></div>
      </div>


      <div class="login">
        <img src="../assets/avatar.svg" class="avatar" />
        <div class="titre"><h1>SE CONNECTER</h1></div>

<div class="form__group">
  <input type="input" class="form__field" placeholder="Email" name="Email" id='email' autocomplete="off" v-model="email"/>
  
</div>

<div class="form__group">
  <input type="password" class="form__field" placeholder="Mot de passe" name="Password" id='password' v-model="password"/>

</div>


        <button class="custom-btn btn-10" :class="{ 'button-disabled': !validatedFields }"  @click="login()">
          <span v-if="status == 'loading'">Connexion en cours</span>
          <span v-else>VALIDER</span>
        </button>


        
        <div class="error" v-if="status == 'error_login'">
          Adresse Email et / ou mot de passe invalide
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src

import { mapState } from "vuex";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      email: null,
      password: null,
    };
  },
  computed: {
    validatedFields() {
      return this.email != "" && this.password != "" ? true : false;
    },
    ...mapState(["status"]),
  },
  methods: {
    login() {
      const self = this;
      this.$store
        .dispatch("login", { email: this.email, password: this.password })
        .then(
          function () {
            self.$router.push("/storie");
          },
          function (error) {
            console.log(error);
          }
        );
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
.signup{
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
    border-left: solid 2px $primary;
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

.custom-btn {
  color : $primary;
  width: 40%;
  height: 50px;
  margin: 50px 20% 10px 20%;
  padding: 0 15px;
  border: 2px solid $primary; 
  font-size: 1.3rem; 
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  // position: relative;
  display: block;
  // z-index: 0;
}

.btn-10 {
  transition: all 0.3s ease;
  overflow: hidden;
}
// .btn-10:after {
//   position: relative;
//   content: " ";
//   // top: 0;
//   // left: 0;
//   // z-index: -1;
//   width: 0;
//   height: 0;
//   transition: all 0.3s ease;
//   // -webkit-transform: scale(.1);
//   // transform: scale(.1);
//   display: block;
// }
.btn-10:hover {
   border: 2px solid $secondary; 
  background: $secondary;
  // -webkit-transform: scale(1);
  // transform: scale(1);

}




</style>