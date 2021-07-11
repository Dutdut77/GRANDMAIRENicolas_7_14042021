<template>
  <section>
    <div class="tableAdmin">
      <h2 class="text-center">Liste des membres :</h2>
      <table class="table table-hover table-bordered mt-3" id="tableUser">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Pseudo</th>
            <th>Email</th>
            <th>Niveau</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in profil" :key="index">
            <td>{{ user.nom }}</td>
            <td>{{ user.prenom }}</td>
            <td>{{ user.pseudo }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.titre }}</td>
          </tr>
        </tbody>
      </table>
      <p>Nombre de membres inscrit : {{ profil.length }}</p>
    </div>

    <div class="tableAdmin">
      <h2 class="text-center">Liste des photos :</h2>
      <table class="table table-hover table-bordered mt-3" id="tableComment">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Pseudo</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(storie, index) in stories" :key="index">
            <td>{{ storie.content }}</td>
            <td>{{ storie.pseudo }}</td>
            <td>{{ storie.date }}</td>
          </tr>
        </tbody>
      </table>
      <p>Nombre de photos : {{ stories.length }}</p>
    </div>


  </section>
</template>

<script>
import { mapState } from "vuex";
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net";

import $ from "jquery";

export default {
  name: "Admin",
  mounted() {
    this.$store.dispatch("getAllProfil");
    this.$store.dispatch("getAllStories");
  },
  updated() {
    this.getTableUser();
    //this.getTableComment();
  },
  computed: {
    ...mapState(["profil", "stories"]),
  },
  methods: {
    getTableUser() {
      $("#tableUser").DataTable({
        language: {
          emptyTable: "No data available in table",
          search: "Recherche",
          paginate: {
            first: "Premier",
            last: "Dernier",
            next: "Suivant",
            previous: "Précédent",
          },
          lengthMenu: "Voir _MENU_ membres",
        },
        info: false,
        paging: true,
      });
    },
    // getTableComment() {
    //   $("#tableComment").DataTable({
    //     language: {
    //       emptyTable: "No data available in table",
    //       search: "Recherche",
    //       paginate: {
    //         first: "Premier",
    //         last: "Dernier",
    //         next: "Suivant",
    //         previous: "Précédent",
    //       },
    //       lengthMenu: "Voir _MENU_ photos",
    //     },
    //     info: false,
    //     paging: true,
    //   });
    // },
  },
};
</script>

<style scoped lang="scss" >
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
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
</style>>

