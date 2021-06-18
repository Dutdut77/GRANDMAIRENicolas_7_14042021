<template>
  <div class="card">
    <div class="image">
      <div class="titre">
        <div class="pseudo"><h2>Dutdut</h2></div>
        
        <div class="btn" id="icon"  @click="ShowDiag()">
          <p>V</p>
        </div> 
        <div class="date">15/06/2021</div>
      </div>
    </div>
    <div class="diag" id="diag">blabla</div>
  </div>
</template>

<script>
export default {
  name: "Card",

  methods: {
    ShowDiag() {
      document.getElementById("diag").classList.toggle("show");
      document.getElementById("icon").classList.toggle("rotate");
    },
  },
};
</script>

<style scoped lang="scss">
$primary: #091f43;
$secondary: #d1515a;

.card {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background: white;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    width: 40%;
  }
}

.image {
  position: relative;
  top: -20px;
  width: 100%;
  height: 320px;
  background-image: url("../assets/img_home.png");
  background-size: cover;
  background-position: center center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  display : flex;
align-items: flex-end;
}
.titre {
width : 100%;
background: linear-gradient(0deg, $secondary, transparent 100%);
display: flex;
flex-wrap: nowrap;
align-items: center;
justify-content: center;
}
.pseudo {
    width: 40%;
}
.pseudo h2 {      
    color : $primary;
}
.date {
    width: 40%;
    color : $primary;
    font-style: italic;
    font-size: 0.8rem;
}
.btn {
 
     cursor: pointer;
      position: relative;
     top : 15px;  
     background: $primary;
     padding: 5px 10px;
     border-radius : 30px;
     box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);

}
.diag {
  height: 0;
  visibility: hidden;
}

.show {
  height: 300px;
  visibility: visible;
  transition: 0.3s ease-in-out;
}

.btn p {     
    font-size: 1.5rem;
    font-weight: bold;
    color: white
}

.rotate {
   transform: rotate(180deg); 
}
</style>