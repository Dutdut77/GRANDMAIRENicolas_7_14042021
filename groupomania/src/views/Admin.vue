<template>
  <section>
    
<TableUser />
<br>
<TablePhoto />

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

