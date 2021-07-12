<template>
 
<div>
    <div class="tableAdmin">
      <h2 class="text-center">Liste des photos :</h2>
      <table class="table table-hover table-bordered mt-3" id="tableComment">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Pseudo</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(storie, index) in stories" :key="index">
            <td>{{ storie.content }}</td>
            <td>{{ storie.pseudo }}</td>
            <td>{{ storie.date }}</td>
            <td class="trash" @click="Modal(storie)"><fa :icon="['fas', 'trash-alt']" /></td>
          </tr>
        </tbody>
      </table>
      <p>Nombre de photos : {{ stories.length }}</p>
    </div>

    <transition name="modal">
      <Modal v-if="showModal" @close="showModal = false">
        <template v-slot:header>
          <h3>SUPPRESSION D'UNE PHOTO</h3>
        </template>
        <template v-slot:body> 
          Photo : {{storie.content}}     
        Attention vous êtes sur le point de supprimer la photo de {{storie.pseudo}} du {{storie.date}}.
        Etes-vous sur ?   
        </template>
        <template v-slot:footer>    
          <button class="modal-save-btn" @click="Delete(storie.id)">SUPPRIMER</button>
          <button class="modal-close-btn" @click="showModal = false">ANNULER</button>
        </template>      
      </Modal>
    </transition>

</div>
</template>

<script>
import { mapState } from "vuex";
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net";
import Modal from "@/components/Modal.vue";
import $ from "jquery";

export default {
  name: "Admin",
  components : {Modal},
  data() {
    return {
      showModal : false,
      storie : {}
    }
  },
  mounted() {   
    this.$store.dispatch("getAllStories");
  },
  updated() {   
    this.getTableComment();
  },
  computed: {
    ...mapState(["profil", "stories"]),
  },
  methods: {
    getTableComment() {
      $("#tableComment").DataTable({
        language: {
          emptyTable: "No data available in table",
          search: "Recherche",
          paginate: {
            first: "Premier",
            last: "Dernier",
            next: "Suivant",
            previous: "Précédent",
          },
          lengthMenu: "Voir _MENU_ photos",
        },
        info: false,
        paging: true,
      });
    },
    Modal(storie) {
      this.storie = storie;
      this.showModal = true;
     
    },
    Delete(id) {
      //this.$store.dispatch("deleteUser");
      
      console.log("UserID : " + id);
    }
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
    margin-top: -35px;
  }
}

.trash {
  color : $secondary;

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
 color: $secondary;
  width: auto;
  height: 40px;
  margin: 5px;
  padding: 0 10px;
  border: 2px solid $secondary;
  font-size: 1rem;
  font-weight: 600;
  background : transparent;
  cursor: pointer;
  transition: all 0.5s ease;
  display: block;
  overflow: hidden;
  border-radius : 4px;
}

.modal-save-btn:hover {
  background-color : $secondary;
  color: white;
}
</style>>

