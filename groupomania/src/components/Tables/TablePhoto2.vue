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
      <Modal v-if="showModalPhoto" @close="showModalPhoto = false">
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
          <button class="modal-close-btn" @click="showModalPhoto = false">ANNULER</button>
        </template>      
      </Modal>
    </transition>

</div>
</template>

<script>
import Modal from "@/components/Modal.vue";

export default {
  name: "Admin",
  props : ["stories"],
  components : {Modal},
  data() {
    return {
      showModalPhoto : false,
      storie : {}
    }
  },
  methods: { 

    Modal(storie) {
      this.storie = storie;
      this.showModalPhoto = true;
     
    },
    Delete(id) {     
      this.$store.dispatch("delete", id );
      this.showModalPhoto = false;       
    }
  },
};
</script>

<style scoped lang="scss" >
@import "bootstrap/scss/bootstrap.scss";

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
  color : $secondary;
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

