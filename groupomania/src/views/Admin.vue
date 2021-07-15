<template>
  <section>
    <div class="container">

    <div class="adminTable">
      <TableUser />
    </div>

<div class="adminTable">
  <TablePhoto />
</div>

    </div>



  </section>
</template>

<script>
import TableUser from "@/components/Tables/TableUser.vue";
import TablePhoto from "@/components/Tables/TablePhoto.vue";

export default {
  name: "Admin",
 components: { TableUser, TablePhoto },

};
</script>

<style scoped lang="scss" >
section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  padding-top : 160px;
}
.adminTable {
  width: 100%;
}
</style>>

