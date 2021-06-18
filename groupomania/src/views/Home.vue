<template>
<section>



       <div class="content">


   
      <Card />

      <div class="titre">
     <h1>Bienvenue sur le réseau social interne GROUPOMANIA</h1>
     <p>Postez ici vos photos afin de favoriser les échanges entre collègues</p>
     <button class="btn" @click="storie()">         
          <span>COMMENCER</span></button>
    </div> 

      </div>
    







</section>

</template>

<script>
import Card from "@/components/Card_1.vue";
// @ is an alias to /src

export default {
  name: "Home",
  components: {Card},
  computed: {
    afficheMessage() {
      return this.$store.state.messageFromVuex;
    },
  },
  methods : {
    storie() {           
      this.$router.push("/storie");
    }
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
  justify-content: center;
  align-items: center;  
  min-height: calc(100vh - 160px);
}

.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;

  width: 100%;
  height: 100%;
}


.titre{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding : 40px 0;
  order: -1;
      @media (min-width: 768px) {
    width: 50%;
order :2;
   }
}
.titre h1, p {
  color: $primary;
}

.titre h1 {
  font-size: 2.1rem;
  padding: 40px;
}
.titre p {
  font-size: 1.4rem;
  
}



.btn {
  color: $primary;
  min-width: 30%;
  height: 50px;
  margin: 40px 20% 0 20%;
  padding: 0 15px;
  border: 2px solid $primary;
  font-size: 1.3rem;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
transition: all 0.3s ease;
  overflow: hidden;

}

.btn:hover {
  border: 2px solid $secondary;
  background: $secondary;
}









</style>
