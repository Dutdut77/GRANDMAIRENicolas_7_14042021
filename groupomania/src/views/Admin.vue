<template>
  <div class="container">
      <h1>Administation</h1>
<div class="user" >
   
   <p v-for="(user, index) in allProfil" :key="index"> avatar : {{user.avatar}} | Email : {{user.email}} | Pseudo : {{user.pseudo}}</p>
</div>

<div class="stories" >
   <p v-for="storie in allStories" :key="storie.id"> Photo : {{storie.content}} | Date : {{storie.date}} |Pseudo : {{storie.userId}} </p> 
</div>

  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    
  name: "Admin",
  mounted() {
    this.$store.dispatch("getAllProfil");
    this.$store.dispatch("getAllStories");
  },
    computed: {
    ...mapState(["allProfil", "allStories"]),
  },
};
</script>

<style lang="scss" scoped>
.container {
    display : flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
}
h1 {
    width: 100%;
}
.user {
    margin : 10px;
    width: 40%;
    
}
.user p {
    display : flex;
    flex-direction: column;
    margin : 10px;
}
.stories {
    display : flex;
    flex-direction: column;
        margin : 10px;
    width: 40%;
 
}
</style>>

