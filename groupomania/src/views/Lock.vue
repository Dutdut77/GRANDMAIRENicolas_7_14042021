<template>
<section>
        <img class="logo" src="../assets/logo-blue.png" alt="Groupomania Mon réseau social d'entreprise"/>
        <h1>Page réservée aux administrateurs !</h1>
 <div class="error">
        <img src="../assets/lock.svg" class="notFound" />
         <p><router-link to="/">RETOUR SUR LA PAGE D'ACCUEIL </router-link></p>
</div>
</section>


       
</template>

<script>
export default {
  name: "Lock",
};
</script>

<style scoped lang="scss">
@import "bootstrap/scss/bootstrap.scss";

  
section {    
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  z-index: 100;
  background-color : white;
}
.logo{
    position: absolute;
    top : 30px;
    left : 30px;
    height: 40px;
}
h1 {
    width: 100%;
    color: $primary;
}
.notFound {
    width: 50%;
    margin : 50px;
}
a {
    text-decoration: none;
    color : $secondary;
    font-weight: 400;
    font-size: 1.2rem;
}
</style>