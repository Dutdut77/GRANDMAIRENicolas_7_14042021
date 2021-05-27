<template>
    <body>
    <header>
      <Navbar />
    </header>
    <div class="content"> 
Email : <input type="text" v-model="email" />
 <br><br>
Password : <input type="text" v-model="password" />
 <br><br>
<button class="button" :class="{'button-disabled' : !validatedFields}" @click="login()">Login</button>
<div class="error" v-if="status == 'error_login'">
  Adresse Email et / ou mot de passe invalide
    </div>
    </div>
  </body>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import {mapState} from "vuex";

export default {
  name: "Login",
  components: {
    Navbar,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    validatedFields() {
      if (this.email != "" && this.password != "") {
        return true;
      } else {
        return false;
      }
    },
    ...mapState(["status"])
  },
  methods: {
    login() {
      const self = this;
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      }).then(function () {
        self.$router.push("/about");
      }, function (error) {
        console.log(error);
      })
    },
  },
};
</script>

<style scoped lang="scss">
body {
  width: 100%;
}
.content {
  padding-top: 70px;
  color: #000;
}

input {
  color: black;
  margin: 5px;
}
.button {
  padding: 5px;
  border: solid 1px;
  border-color: blue;
}
.button-disabled {
  border: solid 1px;
  border-color: red;
}
.error {
  color: black;
}
 
</style>