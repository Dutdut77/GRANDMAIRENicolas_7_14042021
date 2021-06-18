<template>
  <div class="card">
      <div class="imgBx">
         
      </div>
      <div class="desc">
         <h2>Card One</h2>
         <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus corrupti expedita quasi aliquam quis, dolorum animi repellendus sint porro sed nulla, libero dolorem consectetur, modi repellat unde assumenda ut praesentium?</p>

      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
$primary: #091f43;
$secondary: #d1515a;
.card   {
    position: relative;
    max-width: 40%;
    height: 260px;    
    background: white;
    margin : 30px 10px;
    padding: 0px 30px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    transition: 0.3s ease-in-out;
}

.card:hover   {
height: 400px;
}

.imgBx {
     background-image: url("../assets/img_home.png");
  background-size: cover;
  background-position: center center;
    position: relative;
    border-radius: 4px;
    width: 100%;
    height: 260px;  
    top: -30px;    
    z-index: 1;
   
    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
}

.card .desc {
    position: relative;
    margin-top: -130px;
    padding: 10px 15px;
    text-align: center;
    color: $primary;
    visibility: hidden;
    opacity: 0;
    transition: 0.3s ease-in-out;
}

.card:hover .desc {
visibility: visible;
opacity: 1;
margin-top: -10px;
transition-delay: 0.3s
}
</style>