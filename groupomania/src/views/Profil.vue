<template>
  <section>
  
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
        <span>Niveau :{{ profil.titre }}</span>
      </div>

      <div class="card-stat"> 
        <div class="radar-group">
          <div class="radar">
              <apexchart type="radialBar" height="150" :options="chartOptions" :series="series" ></apexchart>
          </div>
          <div class="radar-titre">
            <h2>Nb Photos</h2>
          </div>
        </div>
     

        <div class="radar-group">
          <div class="radar">
              <apexchart type="radialBar" height="150" :options="chartOptions2" :series="series" ></apexchart>
          </div>
          <div class="radar-titre">
            <h2>Nb Commentaires</h2>
          </div>
        </div>
      </div>

      <div class="card-footer">
              <button class="btn-add" id="show-modal" @click="showModal = true">
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
     
 
{{nbPhoto}} <br>
{{chartOptions}} <br>
{{chartOptions2}}

  </section>
</template>

<script>
import { mapState } from "vuex";


export default {
  name: "Profil",  
  data() {
    return {   

          toto : {},
          series: [75],          
          radar: {
            chart: {
              height: 250,            
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

          },
          radar2: {
            chart: {
              height: 250,
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

          },
          
    }
  },
 
  mounted() {
    this.$store.dispatch("getProfil"); 
     this.$store.dispatch("countUserPhoto"); 
  },

  computed: 
    mapState ({
    profil : "profil",
    nbPhoto : "nbPhoto",
    nbComment : "nbComment",

    chartOptions (state) {
      return Object.assign(this.radar, { labels : [state.nbPhoto]})      
    },
    chartOptions2 (state) {
      return Object.assign(this.radar2, { labels : [state.nbPhoto + 5]})      
    },
 
    }),

 
 
  
  
   




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
  width: 100%;
  min-height: 100vh;
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
  border-radius : 4px;
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
.btn-supp {
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

.btn-add:hover {
  background: $primary;
  color: white;
}

.btn-supp:hover {
  background: $secondary;
  border-color: $secondary;
}
</style>