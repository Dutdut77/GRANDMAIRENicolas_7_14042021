<template>
  <section>
  <div class="card">

  
    <div class="card-profil">

      <div class="card-top">
        <img src="https://images.unsplash.com/photo-1488628075628-e876f502d67a?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg=" alt="" />
        <div class="custom-shape-divider-bottom-1625087656">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" >
            <path  d="M1200 0L0 0 598.97 114.72 1200 0z"  class="shape-fill" ></path>
          </svg>
        </div>
      </div>

      <div class="card-content">
        <h1>{{ profil.nom }} {{ profil.prenom }}</h1>
        <span><fa :icon="['fas', 'user']" /> {{ profil.pseudo }}</span>
        <span><fa :icon="['fas', 'envelope']" /> {{ profil.email }}</span>
        <span>Niveau : {{ profil.titre }}</span>
      </div>

      <div class="card-stat"> 
        <div class="radar-group">
          <div class="radar">
              <VueApexCharts id="chart" type="radialBar" height="150" :options="chartOptions" :series="series" ></VueApexCharts>
          </div>
          <div class="radar-titre">
            <h2>Nb Photos</h2>
          </div>
        </div>
     

        <div class="radar-group">
          <div class="radar">
              <VueApexCharts type="radialBar" height="150" :options="chartOptions2" :series="series" ></VueApexCharts>
          </div>
          <div class="radar-titre">
            <h2>Nb Commentaires</h2>
          </div>
        </div>
      </div>

      <div class="card-footer">
              <button class="btn-add" @click="showProfil = true">
        <span>Modifier Profil </span>
      </button>
      <button class="btn-add" @click="Delete()">
        <span>Modifier Photo</span>
      </button>
            <button class="btn-supp" @click="Delete()">
        <span>Supprimer Profil</span>
      </button>
      </div>

    </div>
 </div>    

<transition name="profil">
  <div class="profil" v-if="showProfil">
      <div class="form">
                <div class="titre"><h1>MODIFIER MON PROFIL</h1></div>
                <div class="form__group">
                  <Input v-model="contentNom" :inputInfo="inputNom" />
                </div>
                <div class="form__group">
                  <Input v-model="contentPrenom" :inputInfo="inputPrenom" />
                </div>
                <div class="form__group">
                  <Input v-model="contentPseudo" :inputInfo="inputPseudo" />
                </div>
          
        <button class="btn-supp" @click="UpdateProfil()">
          <span>VALIDER</span>
        </button>   
          <button class="btn-retour" @click="showProfil = false">
          <span>RETOUR</span>
        </button> 
        </div>
  </div>
</transition>     
  </section>
  
</template>

<script>
import { mapState } from "vuex";
import Input from "@/components/Input.vue";
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "Profil",  
  components: { Input, VueApexCharts, },
  data() {
    return {   
      test : this.$store.state.nbComment,
          showProfil : false,
          series: [75], 

      inputNom: {
        name : "nom",
        title: "Votre nom :",
        type: "text",
        class: ""
      },
      inputPrenom: {
        name : "prenom",
        title: "Votre Prenom :",
        type: "text",
        class: ""
      },
      inputPseudo: {
        name : "pseudo",
        title: "Votre Pseudo :",
        type: "text",
        class: ""
      },
       
    }
  }, 
  
 mounted() {
    this.$store.dispatch("getProfil"); 
    this.$store.dispatch("countUserPhoto"); 
    this.$store.dispatch("countUserComment");    
    
  },
  methods : {
    UpdateProfil () {    
          this.$store.dispatch("updateUser", {     
          nom: this.contentNom,
          prenom: this.contentPrenom,
          pseudo: this.contentPseudo,        
          })                
        .then(
          this.$store.dispatch("getProfil"),
          this.showProfil = false,
        )
    },
         
    
  },
 computed: {
    ...mapState(["profil", "nbPhoto", "nbComment"]),
  chartOptions() {
    return {
     chart: {
              height: 150,            
              type: 'radialBar',
              toolbar: {
                show: false
              }
            },
            plotOptions: {
              radialBar: {
                startAngle: -135,
                endAngle: 225,
                 hollow: {
                  margin: 0,
                  size: '70%',
                  background: '#fff',
                  image: undefined,
                  imageOffsetX: 0,
                  imageOffsetY: 0,
                  position: 'front',
                  dropShadow: {
                    enabled: true,
                    top: 3,
                    left: 0,
                    blur: 4,
                    opacity: 0.24
                  }
                },
                track: {
                  background: '#fff',
                  strokeWidth: '67%',
                  margin: 0, // margin is in pixels
                  dropShadow: {
                    enabled: true,
                    top: -3,
                    left: 0,
                    blur: 4,
                    opacity: 0.35
                  }
                },
            
                dataLabels: {
                  show: true,
                  name: {
                    offsetY: 5,
                    show: true,
                    color: '#111',
                    fontSize: '24px'
                  },
                  value: {
                    formatter: function(val) {
                      return parseInt(val);
                    },
                    color: '#111',
                    fontSize: '36px',
                    show: false,
                  }
                }
              }
            },
            fill: {
              colors : ['#d1515a'],                
              
            },
            stroke: {
              lineCap: 'round'
            },
            labels : [this.nbPhoto], 
    }
  },
    chartOptions2() {
    return {
     chart: {
              height: 150,            
              type: 'radialBar',
              toolbar: {
                show: false
              }
            },
            plotOptions: {
              radialBar: {
                startAngle: -135,
                endAngle: 225,
                 hollow: {
                  margin: 0,
                  size: '70%',
                  background: '#fff',
                  image: undefined,
                  imageOffsetX: 0,
                  imageOffsetY: 0,
                  position: 'front',
                  dropShadow: {
                    enabled: true,
                    top: 3,
                    left: 0,
                    blur: 4,
                    opacity: 0.24
                  }
                },
                track: {
                  background: '#fff',
                  strokeWidth: '67%',
                  margin: 0, // margin is in pixels
                  dropShadow: {
                    enabled: true,
                    top: -3,
                    left: 0,
                    blur: 4,
                    opacity: 0.35
                  }
                },
            
                dataLabels: {
                  show: true,
                  name: {
                    offsetY: 5,
                    show: true,
                    color: '#111',
                    fontSize: '24px'
                  },
                  value: {
                    formatter: function(val) {
                      return parseInt(val);
                    },
                    color: '#111',
                    fontSize: '36px',
                    show: false,
                  }
                }
              }
            },
            fill: {
              colors : ['#d1515a'],                
              
            },
            stroke: {
              lineCap: 'round'
            },
            labels : [this.nbComment], 
    }
  }
  },
    
    
};
</script>

<style scoped lang="scss">
$primary: #091f43;
$secondary: #d1515a;

section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-wrap : wrap;
  width: 100%;
  min-height: 100vh;
}
.card {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  order : 1;
  margin : 0;  
}
.card-profil {
 width: 400px;
  height: auto;
  box-shadow: 0 5px 20px rgba(9, 31, 67, 0.5);
  border-radius: 4px;
  margin: 20px 20px 40px 20px;
}
.card-top {
  position: relative;
}
img {
  width: 100%;
  border-radius : 4px 4px 0 0 ;
}
.custom-shape-divider-bottom-1625087656 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
}

.custom-shape-divider-bottom-1625087656 svg {
  position: relative;
  display: block;
  width: 100%;
  height: 50px;
}

.custom-shape-divider-bottom-1625087656 .shape-fill {
  fill: #ffffff;
}
.card-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
h1 {
  font-weight: 600;
  font-size: 1.2rem;
  padding: 0;
}
span {
  width: 100%;
  padding-top: 5px;
 }


.card-stat  {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;

}

.radar-group {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width : 50%
}
.radar {
  width: 100%;
}
.radar-titre {
width : 100%;
text-align: center;
color : #888;
font-size : 0.6rem;
margin-top : -10px;
}

.card-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  border-top : 1px solid #888;
  margin : 10px 0 ;
  padding-top : 10px;
}

.btn-add,
.btn-supp, .btn-retour {
  color: $primary;
  width: 100%;
  height: 40px;
  margin: 10px 40px;
  padding: 0 5px;
  border: 2px solid $primary;
  font-size: 0.9rem;
  font-weight: 600;
  background: transparent;
  cursor: pointer;
  transition: all 0.5s ease;
  display: block;
  overflow: hidden;
  border-radius : 4px;
    @media (min-width: 768px) {
    width: 40%;
    margin: 10px;
    }
}

.btn-add:hover, .btn-retour:hover {
  background: $primary;
  color: white;
}

.btn-supp:hover {
  background: $secondary;
  border-color: $secondary;
}



.titre {
  margin : 20px;
}

.profil {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  order : 0;
  margin-top : 30px;
     @media (min-width: 768px) {
    width: 40%;
    order : 2;
  }
}
.form {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 80%;
}
.form__group {
  margin: 15px;
  width: 80%;
  @media (min-width: 768px) {
    width: 80%;
  }
}

.profil-enter-active, .profil-leave-active {
  transition: all 0.3s ease;

}

.profil-enter-from, .profil-leave-to {
  opacity: 0;
}


</style>