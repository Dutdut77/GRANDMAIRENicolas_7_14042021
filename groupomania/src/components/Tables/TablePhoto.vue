<template>
  <section>

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

