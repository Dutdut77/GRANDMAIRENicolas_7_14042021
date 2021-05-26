<template>
    <body>
    <header>
      <Navbar />
    </header>
    <div class="content"> 
Email : <input type="text" v-model="email" />
{{email}} <br><br>
Password : <input type="text" v-model="password" />
{{password}}
    </div>
  </body>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Login",
  components: {
    Navbar,
  },
  data(){
    return {
      email: "",
      password: ""
    }
  }
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

input {
  color:black;
  margin:  5px;
}

</style>