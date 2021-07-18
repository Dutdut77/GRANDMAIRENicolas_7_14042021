<template>
<div>
    <div class="tableUser">
      <h2 class="text-center">Liste des membres :</h2>
      <table class="table table-hover table-bordered mt-3" id="tableUser">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Pseudo</th>
            <th>Email</th>
            <th>Niveau</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in profil" :key="index">
            <td>{{ user.nom }}</td>
            <td>{{ user.prenom }}</td>
            <td>{{ user.pseudo }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.titre }}</td>
            <td class="trash" @click="Modal(user)"><fa :icon="['fas', 'trash-alt']" /></td>
          </tr>
        </tbody>
      </table>
      <p>Nombre de membres inscrit : {{ profil.length }}</p>
    </div>

    <transition name="modal">
      <Modal v-if="showModalUser" @close="showModalUser = false">
        <template v-slot:header>
          <h3>SUPPRESSION DU COMPTE {{user.email}}</h3>
        </template>
        <template v-slot:body>      
        Attention vous êtes sur le point de supprimer le compte de {{user.nom}} {{user.prenom}} alias {{user.pseudo}}.
        Etes-vous sur ?   
        </template>
        <template v-slot:footer>    
          <button class="modal-save-btn" @click="Delete(user.id)">SUPPRIMER</button>
          <button class="modal-close-btn" @click="showModalUser = false">ANNULER</button>
        </template>      
      </Modal>
    </transition> 
    
</div>

</template>

<script>
import Modal from "@/components/Modal.vue";
export default {
  name: "Admin",
  props : ["profil"],
  data() {
    return {
      showModalUser : false,
      user : {},
    }
  },
  components : {Modal},

  methods: {

    Modal(user) {
      this.user = user;
      this.showModalUser = true;      
    },
    Delete(id) {      
      this.$store.dispatch("deleteOneUser", id);
      this.showModalUser = false;     

    }
  },
};
</script>

<style scoped lang="scss" >
@import "bootstrap/scss/bootstrap.scss";


.tableUser {
  width: 100%;
  padding: 40px;
}
.tableUser p {
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

