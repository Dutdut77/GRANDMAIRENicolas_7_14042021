<template>
  <section>
    <h1>PHOTO</h1>
    <div class="auteur">
      <p class="name">{{ stories.nom }} {{ stories.prenom }}</p>
      allias
      <p class="pseudo">{{ stories.pseudo }}</p>
      a posté le
      <p class="date">{{ stories.date }}</p>
      :
    </div>

    <div class="content">
      <img src="https://images.unsplash.com/photo-1488628075628-e876f502d67a?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg=" alt=""/>
      <div class="card">
        <h2>Vos Commentaires :</h2>
        <div class="group" v-for="commentaire in commentaires" :key="commentaire.id">
          <div class="group--avatar">
            <img class="group--image" src="../assets/avatar.svg" alt="user photo"/>
          </div>
          <div class="group--desc">
            <div class="group--pseudo">{{ commentaire.pseudo }}</div>
            <div class="group--date">{{ commentaire.date }}</div>
            <div class="group--text">{{ commentaire.content }}</div>
            <a href="#" class="group--trash" v-if="user.userId === commentaire.userId" @click="DeleteComment(commentaire.id, )">
              <fa :icon="['fas', 'trash-alt']" />
            </a>
          </div>
        </div>
        <br />
      </div>
    </div>



    <div class="action">
      <button class="btn-add" id="show-modal" @click="showModal = true">
        <span>AJOUTER COMMENTAIRE</span>
      </button>
      <button class="btn-supp" @click="Delete()">
        <span>SUPPRIMER PHOTO</span>
      </button>
      <button class="btn-retour" @click="Storie()">
        <span>RETOUR</span>
      </button>
    </div>


 <transition name="modal">
    <Modal v-if="showModal" @close="showModal = false">
      <template v-slot:header>
        <h3>AJOUTER UN COMMENTAIRE</h3>
      </template>
      <template v-slot:body>      
        
      <Input v-model="content" :inputInfo="inputInfo"/>    
      </template>
      <template v-slot:footer>    
        <button class="modal-save-btn" @click="SaveComment()">AJOUTER</button>
        <button class="modal-close-btn" @click="showModal = false, content = null">FERMER</button>
      </template>
      
    </Modal>
    </transition>  

  </section>
</template>

<script>
import { mapState } from "vuex";
import Modal from "@/components/Modal.vue";
import Input from "@/components/Input.vue";

export default {
  name: "OneStorie",
  props: ["id"],
  data() {
    return {
      showModal: false,   
      content: null, 
      inputInfo : {
        title : "Commentaire :"    
      }
    }
  },
  mounted() {
    this.$store.dispatch("getOneStorie", { id: this.id });
    this.$store.dispatch("getAllCommentaires", this.id );
  },
  components: { Modal, Input },
  computed: {
    ...mapState(["stories", "commentaires", "user"]),
  },
  methods: {
    Storie() {
      this.$router.push({ path: "/storie" });
    },
    Delete() {
      this.$store.dispatch("delete", { id: this.id });
    },
    SaveComment() {
      this.showModal = false;
      this.$store.dispatch("addComment", { 
        content: this.content,
        id_parent : this.id,
        userId : this.user.userId
        });
        this.content = ""; 
    },
    DeleteComment(id) {
       this.$store.dispatch("DeleteComment", { id_parent : this.id, id : id });
    }
  },
};
</script>

<style scoped lang="scss">
$primary: #091f43;
$secondary: #d1515a;

a {
  color: $primary;
}
a:hover {
  color: $secondary;
}

section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.auteur {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.auteur p {
  padding: 0 4px;
  font-size: 1.2rem;
}
.name {
  font-weight: 600;
  color: $primary;
}
.pseudo {
  font-weight: 600;
  color: $secondary;
}
.date {
  font-weight: 600;
  font-style: italic;
}
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
}
img {
  width: 100%;
  margin: 40px;
  box-shadow: 0 5px 20px rgba(9, 31, 67, 0.5);

  @media (min-width: 768px) {
    width: 40%;
    border-radius: 4px;
  }
}
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-shadow: 0 5px 20px rgba(9, 31, 67, 0.5);
  border-radius: 4px;
  margin: 20px;
  @media (min-width: 768px) {
    width: 40%;
    margin: 40px;
  }
}
.card h2 {
  padding: 15px;
  text-decoration-line: underline;
  color: $primary;
}
.group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid grey;
  padding-bottom: 10px;
  margin: 10px 20px;
  &--avatar {
    width: 15%;
  }
  &--avatar img {
    margin: 0;
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
  &--trash {
    margin-left: auto;
    color: $primary;
  }
}
.action {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.btn-add,
.btn-supp,
.btn-retour {
  color: $primary;
  width: auto;
  height: 40px;
  margin: 10px;
  padding: 0 15px;
  border: 2px solid $primary;
  font-size: 1.3rem;
  background: transparent;
  cursor: pointer;
  transition: all 0.5s ease;
  display: block;
  overflow: hidden;
  border-radius : 4px;
}

.btn-add:hover {
  background: $primary;
  color: white;
}

.btn-supp:hover {
  background: $secondary;
  border-color: $secondary;
}
.btn-retour:hover {
  background: gray;
  border-color: gray;
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
  border-radius : 4px;
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
  border: 2px solid green;
  font-size: 1rem;
  font-weight: 600;
  background: transparent;
  cursor: pointer;
  transition: all 0.5s ease;
  display: block;
  overflow: hidden;
  border-radius : 4px;
}

.modal-save-btn:hover {
  background: green;
  color: white;
}



.modal-enter-active, .modal-leave-active {
  transition: all 0.5s ease;

}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}


</style>