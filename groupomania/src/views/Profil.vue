<template>
  <section>
    <div class="card-profil">
      <div class="card-top">
        <img :src="url + profil.avatar" alt="" />
        <div class="custom-shape-divider-bottom-1625087656">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M1200 0L0 0 598.97 114.72 1200 0z"
              class="shape-fill"
            ></path>
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
            <VueApexCharts
              id="chart"
              type="radialBar"
              height="150"
              :options="chartOptions"
              :series="series"
            ></VueApexCharts>
          </div>
          <div class="radar-titre">
            <p v-if="nbPhoto > 1">Nb Photos</p>
            <p v-else>Nb Photo</p>
          </div>
        </div>

        <div class="radar-group">
          <div class="radar">
            <VueApexCharts
              type="radialBar"
              height="150"
              :options="chartOptions2"
              :series="series"
            ></VueApexCharts>
          </div>
          <div class="radar-titre">
            <p v-if="nbComment > 1">Nb Commentaires</p>
            <p v-else>Nb Commentaire</p>
          </div>
        </div>
      </div>

      <div class="card-footer">
        <button
          class="btn-add"
          @click="(showProfil = true), (showPhoto = false)"
        >
          <span>Modifier Profil </span>
        </button>
        <button
          class="btn-add"
          @click="(showPhoto = true), (showProfil = false)"
        >
          <span>Modifier Photo</span>
        </button>
        <button class="btn-supp" @click="showModal = true">
          <span>Supprimer Profil</span>
        </button>
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
          <button class="btn-retour" @click="CancelUpdate()">
            <span>RETOUR</span>
          </button>
        </div>
      </div>
    </transition>

    <transition name="profil">
      <div class="profil" v-if="showPhoto">
        <div class="form">
          <div class="titre"><h1>CHANGER MA PHOTO</h1></div>
          <div class="form__group">
            <div class="file-input">
              <input
                type="file"
                name="file-input"
                id="file-input"
                class="file-input__input"
                @change="PreviewFile"
              />
              <label class="file-input__label" for="file-input">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="upload"
                  class="svg-inline--fa fa-upload fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                  ></path>
                </svg>
                <span v-if="contentImageUrl === null"
                  >Choissisez votre Photo</span
                >
                <span v-else>{{ contentImageUrl.name }}</span>
              </label>
            </div>
          </div>

          <button class="btn-supp" @click="UpdatePhoto()">
            <span>VALIDER</span>
          </button>
          <button class="btn-retour" @click="CancelUpdate()">
            <span>RETOUR</span>
          </button>
        </div>
      </div>
    </transition>

    <transition name="modal">
      <Modal v-if="showModal" @close="showModal = false">
        <template v-slot:header>
          <h3>SUPPRESSION DE VOTRE COMPTE</h3>
        </template>
        <template v-slot:body>
          Attention vous êtes sur le point de supprimer votre compte. Etes-vous
          sur ?
        </template>
        <template v-slot:footer>
          <button class="modal-save-btn" @click="Delete()">SUPPRIMER</button>
          <button class="modal-close-btn" @click="showModal = false">
            ANNULER
          </button>
        </template>
      </Modal>
    </transition>
  </section>
</template>

<script>
import { mapState } from "vuex";
import Input from "@/components/Input.vue";
import Modal from "@/components/Modal.vue";
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "Profil",
  components: { Input, VueApexCharts, Modal },
  data() {
    return {
      url: "http://localhost:3000/images/users/",
      showModal: false,

      valueNom: null,
      valuePrenom: null,
      valuePseudo: null,

      contentImageUrl: null,
      showProfil: false,
      showPhoto: false,
      series: [75],

      inputNom: {
        name: "nom",
        title: "Votre nom :",
        type: "text",
        class: "",
      },
      inputPrenom: {
        name: "prenom",
        title: "Votre Prenom :",
        type: "text",
        class: "",
      },
      inputPseudo: {
        name: "pseudo",
        title: "Votre Pseudo :",
        type: "text",
        class: "",
      },
    };
  },
  mounted() {
    this.$store.dispatch("getProfil");
    this.$store.dispatch("countUserPhoto");
    this.$store.dispatch("countUserComment");
  },
  methods: {
    UpdateProfil() {
      if (!this.valueNom) {
        this.valueNom = this.$store.state.profil.nom;
      }
      if (!this.valuePrenom) {
        this.valuePrenom = this.$store.state.profil.prenom;
      }
      if (!this.valuePseudo) {
        this.valuePseudo = this.$store.state.profil.pseudo;
      }
      this.$store.dispatch("updateUser", {
        nom: this.valueNom,
        prenom: this.valuePrenom,
        pseudo: this.valuePseudo,
      });
      this.showProfil = false;
    },

    CancelUpdate() {
      this.valueNom = this.$store.state.profil.nom;
      this.valuePrenom = this.$store.state.profil.prenom;
      this.valuePseudo = this.$store.state.profil.pseudo;
      this.showProfil = false;
      this.showPhoto = false;
      this.contentImageUrl = null;
    },
    PreviewFile() {
      this.contentImageUrl = event.target.files[0];
    },
    UpdatePhoto() {
      this.$store
        .dispatch("updatePhoto", { image_url: this.contentImageUrl })
        .then(this.$store.dispatch("getProfil"), (this.showPhoto = false));
    },
    Delete() {
      this.$store.dispatch("deleteUser");
      this.$router.push({ name: "Home" });
    },
  },
  computed: {
    ...mapState(["profil", "nbPhoto", "nbComment"]),

    chartOptions() {
      return {
        chart: {
          height: 150,
          type: "radialBar",
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: "70%",
              background: "#fff",
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: "front",
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24,
              },
            },
            track: {
              background: "#fff",
              strokeWidth: "67%",
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35,
              },
            },

            dataLabels: {
              show: true,
              name: {
                offsetY: 5,
                show: true,
                color: "#111",
                fontSize: "24px",
              },
              value: {
                formatter: function (val) {
                  return parseInt(val);
                },
                color: "#111",
                fontSize: "36px",
                show: false,
              },
            },
          },
        },
        fill: {
          colors: ["#d1515a"],
        },
        stroke: {
          lineCap: "round",
        },
        labels: [this.nbPhoto],
      };
    },
    chartOptions2() {
      return {
        chart: {
          height: 150,
          type: "radialBar",
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: "70%",
              background: "#fff",
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: "front",
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24,
              },
            },
            track: {
              background: "#fff",
              strokeWidth: "67%",
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35,
              },
            },

            dataLabels: {
              show: true,
              name: {
                offsetY: 5,
                show: true,
                color: "#111",
                fontSize: "24px",
              },
              value: {
                formatter: function (val) {
                  return parseInt(val);
                },
                color: "#111",
                fontSize: "36px",
                show: false,
              },
            },
          },
        },
        fill: {
          colors: ["#d1515a"],
        },
        stroke: {
          lineCap: "round",
        },
        labels: [this.nbComment],
      };
    },

    contentNom: {
      get() {
        return this.$store.state.profil.nom;
      },
      set(value) {
        this.valueNom = value;
      },
    },
    contentPrenom: {
      get() {
        return this.$store.state.profil.prenom;
      },
      set(value) {
        this.valuePrenom = value;
      },
    },
    contentPseudo: {
      get() {
        return this.$store.state.profil.pseudo;
      },
      set(value) {
        this.valuePseudo = value;
      },
    },
  },
};
</script>

<style scoped lang="scss">
@import "bootstrap/scss/bootstrap.scss";

section {
  padding-top: 160px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  min-height: 100vh;
}
.card {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  order: 1;
  margin: 0;
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
  border-radius: 4px 4px 0 0;
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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: -20px;
  z-index: 10;
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

.card-stat {
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
  width: 50%;
}
.radar {
  width: 100%;
}
.radar-titre {
  width: 100%;
  text-align: center;
  color: #888;
  font-size: 0.9rem;
  margin-top: -10px;
}

.card-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  border-top: 1px solid #888;
  padding-top: 10px;
}

.btn-add,
.btn-supp,
.btn-retour {
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
  border-radius: 4px;
  @media (min-width: 768px) {
    width: 40%;
    margin: 10px;
  }
}

.btn-add:hover,
.btn-retour:hover {
  background: $primary;
  color: white;
}

.btn-supp:hover {
  background: $secondary;
  border-color: $secondary;
}

.titre {
  margin: 20px;
}

.profil {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  order: 0;
  margin-top: 30px;
  @media (min-width: 768px) {
    width: 40%;
    order: 2;
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

.profil-enter-active,
.profil-leave-active {
  transition: all 0.3s ease;
}

.profil-enter-from,
.profil-leave-to {
  transform: translateX(400px);
  opacity: 0;
}
.file-input__input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.file-input__label {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  font-size: 14px;
  padding: 10px 12px;
  background-color: $secondary;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
}

.file-input__label svg {
  height: 16px;
  margin-right: 4px;
}

.modal-header h3 {
  margin-top: 0;
  color: $secondary;
}

.modal-close-btn {
  color: $primary;
  width: auto;
  height: 40px;
  margin: 5px;
  padding: 0 10px;
  border: 2px solid $primary;
  font-size: 1rem;
  font-weight: 600;
  background: transparent;
  cursor: pointer;
  transition: all 0.5s ease;
  display: block;
  overflow: hidden;
  border-radius: 4px;
}

.modal-close-btn:hover {
  background: $primary;
  color: white;
}
.modal-save-btn {
  color: $primary;
  width: auto;
  height: 40px;
  margin: 5px;
  padding: 0 10px;
  border: 2px solid $secondary;
  font-size: 1rem;
  font-weight: 600;
  background: transparent;
  cursor: pointer;
  transition: all 0.5s ease;
  display: block;
  overflow: hidden;
  border-radius: 4px;
}

.modal-save-btn:hover {
  background-color: $secondary;
  color: white;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3 ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
