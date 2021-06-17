<template>

    <div class="card">
      <div class="card-inner">
        <div class="card-front">
          <div class="card-content">
            <h2>Jean DUPONT</h2>
            <p>21/06/2021</p>            
          </div>
        </div>
        <div class="card-back">
          <div class="card-top">
            <div class="card-image"></div>
          </div>
          <p>Follow me on</p>
          <div class="card-icons">
            <a href="https://www.wawasensei.dev" target="_blank">
              <i class="fas fa-link"></i>
            </a>
            <a href="https://www.youtube.com/channel/UCBH-5ctALmmOrm4kczL3urQ" target="_blank">
              <i class="fab fa-youtube"></i>
            </a>
            <a href="https://instagram.com/wass08" target="_blank">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
export default {
  name: "Card",

  methods: {
    Btnflip() {
      document.getElementById("flip").classList.toggle("flipped");         
    },
    Cardflip() { 
      document.getElementById("clickcard").classList.toggle("flipped");
    }

  }
}
</script>

<style scoped lang="scss">
$primary: #091f43;
$secondary: #d1515a;
$white: #fff;
$gray: #091f43;

.card {
  margin : 0;
  width: 30%;
  height: 380px;
  -webkit-perspective: 1000px;
    -moz-perspective: 1000px;
    -o-perspective: 1000px;
  perspective: 1000px;

}

.card-inner {
  position:relative;
  width: 100%;
  height:100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card:hover .card-inner {
     -webkit-transform: rotateY( 180deg);
    -moz-transform: rotateY( 180deg);
    -o-transform: rotateY( 180deg);
    transform: rotateY( 180deg);
}



.card-front, .card-back {
  position:absolute;
  height:100%;
  width: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  padding:16px;
  border-radius:10px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.card-front {
  background-image:url('../assets/img_home.png');
  background-size:cover;
  background-position:center center;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
}

.card-front:before {
  content: '';
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

.card-front .card-content p, h2 {
  text-align: right;
  color:$primary;
}

.card-back {
  transform: rotateY(180deg);
  background:white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card-back .card-image {
  width:120px;
  height:120px;
  margin:0 auto;
  border:solid 1px #cecece;
  border-radius:100%;
  background-image:url('../assets/img_home.png');
  background-size:cover;
  background-position:center center;
}

.card-back p {
  margin-top:12px;
}

.card-back .card-icons {
  display:flex;
  justify-content: center;
  align-items: center;
}

.card-back .card-icons a {
  font-size:18px;
  color:white;
  background:black;
  width:42px;
  height:42px;
  border-radius:100%;
  margin:8px;
  display:flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition:opacity .2s;
}

.card-back .card-icons a:hover {
  cursor:pointer;
  opacity:0.7;
}

.card-front {
  transition: opacity .6s;
}

.card:hover .card-front {
  opacity:0;
}

.titre{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding : 40px 0;
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