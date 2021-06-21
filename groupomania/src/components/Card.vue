<template>
  <div class="card">
    <div class="image">
      <div class="titre">
        <div class="pseudo">
          <h2>{{ storie.userId }}</h2>
        </div>

        <div class="btn" :id="'icon'+storie.id" @click="ShowDiag(storie.id)">
          <p>V</p>
        </div>
        <div class="date">{{ storie.date }}</div>
      </div>
    </div>

    <div class="dialogue" :id="'diag'+storie.id">
      <div class="group" v-for="commentaire in commentaires" :key="commentaire.id">
        <div class="group--avatar">
          <img
            class="group--image"
            src="../assets/avatar.svg"
            alt="user photo"
          />
        </div>
        <div class="group--desc">
          <div class="group--pseudo">{{ commentaire.userId }}</div>
          <div class="group--date">{{ commentaire.date }}</div>
          <div class="group--text">{{ commentaire.content }}</div>
        </div>
      </div>
    </div>

   
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Card",
  props: {
    storie: {
      default: "Valeur par défaut",
    },
  },
  computed: {
    ...mapState(["commentaires"]),
  },
  methods: {
    ShowDiag(id) {
      let diag = 'diag'+id; 
      let icon = 'icon'+id;     
      this.$store.dispatch("getAllCommentaires", id);
      document.getElementById(icon).classList.toggle("rotate");      
      document.getElementById(diag).classList.toggle("show");          
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
  box-shadow: 0 5px 20px rgba(9, 31, 67, 0.2);
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    width: 30%;
  }
}

.image {
  position: relative;
  top: -20px;
  width: 100%;
  height: 320px;
  border-radius: 5px;
  background-image: url("../assets/img_home.png");
  background-size: cover;
  background-position: center center;
  box-shadow: 0 0px 10px rgba(9, 31, 67, 0.4);
  display: flex;
  align-items: flex-end;
}
.titre {
  width: 100%;
  background: linear-gradient(0deg, $secondary 30%, transparent 100%);
  height: 80px;
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-end;
  justify-content: center;
  border-radius: 5px;
}
.pseudo {
  width: 40%;
  margin-right: auto;
  padding: 0 10px;
  text-align: start;
}
.pseudo h2 {
  color: $primary;
}
.date {
  margin-left: auto;
  padding: 0 10px 5px 0;
  text-align: end;
  width: 40%;
  color: $primary;
  font-style: italic;
  font-size: 0.9rem;
}
.btn {
  cursor: pointer;
  position: relative;
  top: 10px;
  background: $primary;
  padding: 5px 10px;
  border-radius: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  transition: 0.3s ease-in-out;
}
.dialogue {
  height: 0;
  visibility: hidden;
  transition: 0.3s ease-in-out;
  overflow: hidden;
}

.new {
  height: 300px;
  visibility: visible;
  transition: 0.3s ease-in-out;
}

.show {
  height: 300px;
  visibility: visible;
  transition: 0.3s ease-in-out;
  overflow-y: auto;
}

.btn p {
  font-size: 1.3rem;
  color: white;
}

.rotate {
  transform: rotate(180deg);
}

.group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid grey;
  padding: 5px;
  &--avatar {
    width: 15%;
  }
  &--desc {
    width: 85%;
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  &--image {
    width: 100%;
    height: 100%;
  }
  &--pseudo {
    width: 50%;
    text-align: start;
    font-weight: bold;
    color: $primary;
  }
  &--date {
    width: 50%;
    text-align: end;
    color: $primary;
  }
  &--text {
    width: 100%;
    text-align: justify;
    color: $primary;
  }
}
</style>