<template>
  <section>
    <div class="container">
      <div class="adminTable">
        <TableUser :profil="profil" />
      </div>

      <div class="adminTable">
        <TablePhoto :stories="stories" />
      </div>

      <div class="adminTable">
        <TableCommentaire :commentaires="commentaires" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import TableUser from "@/components/Tables/TableUser.vue";
import TablePhoto from "@/components/Tables/TablePhoto.vue";
import TableCommentaire from "@/components/Tables/TableCommentaire.vue";

export default {
  name: "Admin",
  components: { TableUser, TablePhoto, TableCommentaire },

  mounted() {
    this.$store.dispatch("getAllProfil");
    this.$store.dispatch("getAllStories");
    this.$store.dispatch("getAllCommentairesAdmin");
  },
  computed: {
    ...mapState(["stories", "profil", "commentaires"]),
  },
};
</script>

<style scoped lang="scss" >
section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  padding-top: 160px;
}
.adminTable {
  width: 100%;
}
.container {
  min-height: 100%;
  position: relative;
}
</style>>

