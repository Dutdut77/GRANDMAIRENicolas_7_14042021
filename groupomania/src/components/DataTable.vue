<template>
   <section>

  <h1 class="text-center">DataTable with VueJs</h1>
    
   <table class="table table-hover table-bordered mt-5" id="myTable">
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
    </tbody>
  </table>

   </section>

   
</template>
 
<script>

// import { mapState } from "vuex";
// import $ from "jquery";

export default {
  
 name: "DataTable",
// mounted() {
//     this.$store.dispatch("getAllProfil");
//     this.$store.dispatch("getAllStories");
//     this.tableUsers();

//   },
//     methods : {
//     tableUsers () {
//         $('#myTable').DataTable( {
//             paging : false,
//             searching : false,
//             data: this.profil,
//             columns: [
//                 { data: 'nom' },
//                 { data: 'prenom' },
//                 { data: 'pseudo' },
//                 { data: 'email' },
//                 { data: 'titre' },
//             ]
//         } );
//     }

//     },

//     computed: {
//     ...mapState(["profil", "stories"]),
//   },
}
</script>