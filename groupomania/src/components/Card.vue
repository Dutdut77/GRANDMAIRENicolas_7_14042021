<template>
<div class="container">

<Cardflip1 />
<Cardflip2 />
<Cardflip3 />

</div>
</template>

<script>
import Cardflip1 from "@/components/Card_flip_1.vue";
import Cardflip2 from "@/components/Card_flip_2.vue";
import Cardflip3 from "@/components/Card_flip_3.vue";

export default {
  name: "Card",
  components: {Cardflip1, Cardflip2, Cardflip3,},
}
</script>

<style scoped lang="scss">

.container{
  width:1000px;
  margin:0 auto;
  display:flex;
  justify-content: space-around;
  align-items: center;
}


</style>