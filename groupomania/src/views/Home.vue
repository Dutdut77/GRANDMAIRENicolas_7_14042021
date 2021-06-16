<template>
<section>
      <div class="custom-shape-divider-top-1623269035">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          opacity=".25"
          class="shape-fill"
        ></path>
        <path
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
          opacity=".5"
          class="shape-fill"
        ></path>
        <path
          d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
          class="shape-fill"
        ></path>
      </svg>
    </div>
  <div class="content">
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
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  computed: {
    afficheMessage() {
      return this.$store.state.messageFromVuex;
    },
  },
  methods : {
    storie() {    
      console.log("tets"); 
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
  min-height: calc(100vh - 60px);
}
.custom-shape-divider-top-1623269035 {
  padding-top: 60px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  z-index: -1;
}

.custom-shape-divider-top-1623269035 svg {
  position: relative;
  display: block;
  width: calc(168% + 1.3px);
  height: 100px;
  transform: rotateY(180deg);
}

.custom-shape-divider-top-1623269035 .shape-fill {
  fill: $secondary;
}
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.card {
 padding: 0 50px;
  margin: 0 auto;
  width: 50%;
  height: 460px;
  perspective: 1000px;
  text-align: center;
   
}

.card-inner {
  position:relative;
  width: 100%;
  height:100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card:hover .card-inner {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  position:absolute;
  height:100%;
  width: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  padding:16px;
  border-radius:8px;
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
  background: linear-gradient(0deg, $secondary, transparent);
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
  width: 50%;
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
