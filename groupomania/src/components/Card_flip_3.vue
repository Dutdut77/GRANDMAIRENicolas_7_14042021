
<template>
  <div class="card" id="mobileCard" @click="Mobileflip()">
    <div class="card-inner" id="mobileCard-inner">
      <div class="card-front">
        <div class="card-content">
          <h2>Jean DUPONT</h2>
          <p>21/06/2021</p>
        </div>
        

      </div>
      <div class="card-back">
<h2>3 derniers commentaires :</h2>

<div class="block">
  <div class="card-image"></div>
  <div class="comment">
    <h3>Pseudo :</h3>
    <div class="desc"> Voici le premier commentaire</div>   
    <div class="date">Le 06/05/2021</div>
  </div>
</div>

<div class="block">
  <div class="card-image"></div>
  <div class="comment">
    <h3>Pseudo :</h3>
    <div class="desc"> Voici le premier commentaire</div>   
    <div class="date">Le 06/05/2021</div>
  </div>
</div>

<div class="block">
  <div class="card-image"></div>
  <div class="comment">
    <h3>Pseudo :</h3>
    <div class="desc"> Voici le premier commentaire</div>   
    <div class="date">Le 06/05/2021</div>
  </div>
</div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",

  methods: {
    Mobileflip() {
      //document.getElementById("mobileCard").classList.toggle("flip");
      document.getElementById("mobileCard-inner").classList.toggle("flip");
    },
  },
};
</script>

<style scoped lang="scss">
$primary: #091f43;
$secondary: #d1515a;
$white: #fff;
$gray: #091f43;

.card {
  padding : 20px;
  margin: 0;
  width: 100%;
  height: 400px;
  -webkit-perspective: 1000px;
  -moz-perspective: 1000px;
  -o-perspective: 1000px;
  perspective: 1000px;
  @media (min-width: 768px) {
    width: 50%;
    padding : 0 5%;
  }
}

@media (hover: none) {
  .flip {
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
    -o-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }
}

.card:hover .card-inner {
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
  transform: rotateY(180deg);
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  -webkit-transform: rotateY(0deg);
  -moz-transform: rotateY(0deg);
  -o-transform: rotateY(0deg);
  transform: rotateY(0deg);
}

.card-front,
.card-back {
  position: absolute;
  height: 100%;
  width: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.card-front {
  background-image: url("../assets/img_home.png");
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
}

.card-front:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  background: linear-gradient(0deg, $secondary, transparent 40%);
}

.card-front .card-content {
  width: 100%;
  z-index: 1;
  color: $primary;
}

.card-front .card-content p,
h2 {
  text-align: right;
  color: $primary;
}

.card-back {
  transform: rotateY(180deg);
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding : 30px;
  width: 100%;
  height: 100%;
}

.block {
  margin: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border : 2px solid $primary;
  border-radius: 8px;
  width: 100%;
  height : 100%;
  
}
.card-image {
  width: 80px;
  height: 80px;  
  border-right: solid 2px $primary;
  border-radius:  8px;
  background-image: url("../assets/avatar.svg");
  background-size: cover;
  background-position: center center;
}

.comment {
  display: flex;
  flex-wrap : wrap; 
  align-content: space-between;
  width: 100%; 
  height: 100%;
  padding: 10px;
}
.comment h3 {
  width: 100%;  
  text-decoration: underline;
  text-align: start;

}
.comment desc {
  width: 100%; 
  margin : 5px 0;
  text-align: start;

}

.date{
  width: 100%;
  font-style: italic;
text-align: end;
}



.card-front {
  transition: opacity 0.6s;
}

.card:hover .card-front {
  opacity: 0;
}
</style>