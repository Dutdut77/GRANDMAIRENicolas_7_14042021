<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>PHOTO</h1>
        </div>
      </div>
      <div class="row my-2">
        <div class="col-12 d-flex flex-wrap justify-content-center">
          <p class="name">{{ stories.nom }} {{ stories.prenom }}</p>
          &nbsp; allias &nbsp;
          <p class="pseudo">{{ stories.pseudo }}</p>
          &nbsp; a posté le &nbsp;
          <p class="date">{{ stories.date }}</p>
          &nbsp; :
        </div>
      </div>

      <div class="row align-items-center">
        <div class="col-xs-12 col-lg-8 my-2">
          <img class="img-fluid" v-if="stories.content" :src="imageUrl()" alt="" />
        </div>
        <div class="col-xs-12 col-lg-4 my-2">
          <div class="card">
            <h2>Commentaires :</h2>
            <div
              class="group"
              v-for="commentaire in commentaires"
              :key="commentaire.id"
            >
              <div class="group--avatar">
                <img
                  class="group--image"
                  :src="url2 + commentaire.avatar"
                  alt="user photo"
                />
              </div>
              <div class="group--desc">
                <div class="group--pseudo">{{ commentaire.pseudo }}</div>
                <div class="group--date">
                  <div class="date">
                    {{ commentaire.date }}
                  </div>
                  <a
                    href="#"
                    class="group--trash"
                    v-if="user.userId === commentaire.userId"
                    @click="DeleteComment(commentaire.id)"
                  >
                    <fa :icon="['fas', 'trash-alt']" />
                  </a>
                </div>
                <div class="group--text">{{ commentaire.content }}</div>
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>

      <div class="row justify-content-center my-4">
        <div class="col-xs-12 col-lg-3 d-grid gap-2 my-2">
          <button
            type="button"
            class="btn btn-primary text-white"
            id="show-modal"
            @click="(showModal = true), (showModalSupp = false)"
          >
            <span>AJOUTER COMMENTAIRE</span>
          </button>
        </div>
        <div
          v-if="user.userId === stories.userId"
          class="col-xs-12 col-lg-3 d-grid gap-2 my-2"
        >
          <button
            type="button"
            class="btn btn-secondary text-white"
            @click="(showModalSupp = true), (showModal = false)"
          >
            <span>SUPPRIMER PHOTO</span>
          </button>
        </div>
        <div class="col-xs-12 col-lg-3 d-grid gap-2 my-2">
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="Storie()"
          >
            <span>RETOUR</span>
          </button>
        </div>
      </div>
      Test : {{ id }}
    </div>

    <transition name="modal">
      <Modal v-if="showModal" @close="showModal = false">
        <template v-slot:header>
          <h3>AJOUTER UN COMMENTAIRE</h3>
        </template>
        <template v-slot:body>
          <Input v-model="content" :inputInfo="inputInfo" />
        </template>
        <template v-slot:footer>
          <button class="btn btn-primary" @click="SaveComment()">
            AJOUTER
          </button>
          <button
            class="btn btn-outline-primary"
            @click="(showModal = false), (content = null)"
          >
            FERMER
          </button>
        </template>
      </Modal>
    </transition>

    <transition name="modal">
      <Modal v-if="showModalSupp" @close="showModalSupp = false">
        <template v-slot:header>
          <h3 class="text-secondary">SUPPRESSION DE VOTRE PHOTO</h3>
        </template>
        <template v-slot:body>
          Attention vous êtes sur le point de supprimer votre photo. Etes-vous
          sur ?
        </template>
        <template v-slot:footer>
          <button class="btn btn-secondary text-white" @click="Delete()">
            SUPPRIMER
          </button>
          <button
            class="btn btn-outline-primary"
            @click="showModalSupp = false"
          >
            FERMER
          </button>
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
      url2: "http://localhost:3000/images/users/",
 
      showModal: false,
      showModalSupp: false,
      content: null,
      inputInfo: {
        title: "Commentaire :",
      },
    };
  },
  created() {
    this.$store.dispatch("getOneStorie", { id: this.id });
    this.$store.dispatch("getAllCommentaires", this.id);
  },
  components: { Modal, Input },
  computed: {
    ...mapState(["stories", "commentaires", "user"]),
  },
  methods: {

    imageUrl() {
    return "http://localhost:3000/images/stories/" + this.stories.content
    },

    Storie() {
      this.$router.push({ path: "/storie" });
    },
    Delete() {
      this.$store.dispatch("delete", this.id);
      this.showModalSupp = false;
      this.$router.push("/storie");
    },
    SaveComment() {
      this.showModal = false;
      this.$store.dispatch("addComment", {
        content: this.content,
        id_parent: this.id,
        userId: this.user.userId,
      });
      this.content = "";
    },
    DeleteComment(id) {
      this.$store.dispatch("DeleteComment", { id_parent: this.id, id: id });
    },
  },
};
</script>

<style scoped lang="scss">
@import "bootstrap/scss/bootstrap.scss";

a {
  color: $primary;
}
a:hover {
  color: $secondary;
}

section {
  padding-top: 160px;
}

.name,
.pseudo {
  font-weight: 600;
  color: $secondary;
}
.date {
  font-weight: bold;
}
img {
  box-shadow: 0 5px 20px rgba(9, 31, 67, 0.5);
  border-radius: 4px;
}
.card {
  padding: 10px;
  width: 100%;
  height: 500px;
  box-shadow: 0 5px 20px rgba(9, 31, 67, 0.5);
  border-radius: 4px;
  overflow-y: auto;
}

.group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid grey;
  padding-bottom: 5px;
  margin: 10px 0;
  &--avatar {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &--avatar img {
    margin: 0;
  }
  &--desc {
    width: 80%;
    padding-left: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  &--image {
    height: auto;
    width: 100%;
    border-radius: 10px;
  }
  &--pseudo {
    width: 50%;
    text-align: start;
    font-weight: bold;
    color: $primary;
  }
  &--date {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 50%;
    text-align: end;
    color: $primary;
    font-size: 0.9rem;
  }
  &--text {
    width: 100%;
    text-align: justify;
    color: $primary;
  }
  &--trash {
    margin-top: -5px;
    margin-left: 5px;
    color: $primary;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.5 ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>