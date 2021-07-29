<template>
  <section>
    <div class="content">
      <div class="signup">
        <img src="../assets/profil.svg" class="profil" />
        <div class="profil--titre">
          Pas encore inscrit ? <router-link to="/signup">Par ici </router-link>
        </div>
      </div>

      <div class="login">
        <img src="../assets/avatar.svg" class="avatar" />
        <div class="titre"><h1>SE CONNECTER</h1></div>

        <div class="form__group">
          <Input v-model="contentEmail" :inputInfo="inputEmail" />
        </div>

        <div class="form__group">
          <Input v-model="contentPassword" :inputInfo="inputPassword" />
        </div>

        <button
          :disabled="!validatedFields"
          class="custom-btn btn-10"
          :class="{ 'button-disabled': !validatedFields }"
          @click="login()"
        >
          <span v-if="status == 'loading'">Connexion en cours</span>
          <span v-else>VALIDER</span>
        </button>

        <div class="error" v-if="status == 'error_login'">
          <div
            class="list-error"
            v-for="(err, index) in errMessage"
            :key="index"
          >
            <li>{{ err.message }}</li>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import Input from "@/components/Input.vue";

export default {
  name: "Login",
  components: { Input },
  data() {
    return {
      email: "",
      password: "",
      contentEmail: "",
      contentPassword: "",
      inputEmail: {
        title: "Email :",
        type: "text",
      },
      inputPassword: {
        title: "Password :",
        type: "password",
      },
    };
  },
  computed: {
    validatedFields() {
      return this.contentEmail != "" && this.contentPassword != ""
        ? true
        : false;
    },
    ...mapState(["status", "errMessage"]),
  },
  methods: {
    login() {
      const self = this;
      this.$store
        .dispatch("login", {
          email: this.contentEmail,
          password: this.contentPassword,
        })
        .then(function () {
          self.$router.push("/storie");
        });
    },
  },
};
</script>



<style scoped lang="scss">
$primary: #091f43;
$secondary: #d1515a;
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
  margin-top: 50px;
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
  margin: 0 10px;
  h1 {
    font-size: 1.3rem;
    color: $primary;
    @media (min-width: 768px) {
      font-size: 2rem;
    }
  }
}

.form__group {
  margin: 5px;
  width: 80%;
  @media (min-width: 768px) {
    width: 40%;
  }
}

.custom-btn {
  color: $primary;
  width: 40%;
  height: 50px;
  margin: 30px 20% 10px 20%;
  padding: 0 15px;
  border: 2px solid $primary;
  font-size: 1.3rem;
  background: transparent;
  border-radius: 4px;
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

.btn-10:hover {
  border: 2px solid $secondary;
  background: $secondary;
  color: white;
}
.button-disabled {
  border: 2px solid grey;
  color: grey;
}
.button-disabled:hover {
  cursor: not-allowed;
  background: #cecece;
  border: 2px solid grey;
}

.error {
  width: 80%;
  background-color: $secondary;
  color: white;
  margin-top: 20px;
  padding: 10px;
  border-radius: 4px;
}

.list-error {
  padding: 5px;
}
</style>