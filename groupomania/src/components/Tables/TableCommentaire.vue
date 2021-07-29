<template>
  <div>
    <div class="tableAdmin" v-if="commentaires.length > 0">
      <h2 class="text-center">Les commentaires :</h2>
      <table class="table table-hover table-bordered mt-3" id="tableComment">
        <thead>
          <tr>
            <th>ID</th>
            <th>Commentaire</th>
            <th>Date</th>
            <th>Pseudo</th>
            <th>ID Photo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(commentaire, index) in commentaires" :key="index">
            <td>{{ commentaire.id }}</td>
            <td>{{ commentaire.content }}</td>
            <td>{{ commentaire.date }}</td>
            <td>{{ commentaire.pseudo }}</td>
            <td>{{ commentaire.id_parent }}</td>
            <td class="trash" @click="Modal(commentaire)">
              <fa :icon="['fas', 'trash-alt']" />
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="commentaires.length > 1">
        Nombre de commentaires : {{ commentaires.length }}
      </p>
      <p v-else>Commentaire : {{ commentaires.length }}</p>
    </div>

    <div v-else class="tableAdmin">
      <h2 class="text-center">Aucun commentaire pour le moment.</h2>
    </div>

    <transition name="modal">
      <Modal v-if="showModalCommentaire" @close="showModalCommentaire = false">
        <template v-slot:header>
          <h3>SUPPRESSION DU COMMENTAIRE N°{{ commentaire.id }}</h3>
        </template>
        <template v-slot:body>
          Attention vous êtes sur le point de supprimer le commentaire "{{ commentaire.content }}" de {{ commentaire.pseudo }} du {{ commentaire.date }}. Etes-vous sur ?
        </template>
        <template v-slot:footer>
          <button class="modal-save-btn" @click="Delete(commentaire.id)">
            SUPPRIMER
          </button>
          <button class="modal-close-btn" @click="showModalCommentaire = false">
            ANNULER
          </button>
        </template>
      </Modal>
    </transition>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";

export default {
  name: "Admin",
  props: ["commentaires"],
  components: { Modal },
  data() {
    return {
      showModalCommentaire: false,
      commentaire: {},
    };
  },
  methods: {
    Modal(commentaire) {
      this.commentaire = commentaire;
      this.showModalCommentaire = true;
    },
    Delete(id) {
      this.$store.dispatch("DeleteCommentAdmin", { id: id });
      this.showModalCommentaire = false;
    },
  },
};
</script>

<style scoped lang="scss" >
$primary: #091f43;
$secondary: #d1515a;

.tableAdmin {
  width: 100%;
  padding: 40px;
}
.tableAdmin p {
  text-align: center;
  font-weight: 600;
  @media (min-width: 768px) {
    text-align: left;
    margin-top: 0;
  }
}

.trash {
  color: $secondary;
  cursor: pointer;
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
  color: $secondary;
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
</style>>

