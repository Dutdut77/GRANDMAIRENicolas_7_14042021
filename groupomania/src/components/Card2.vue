<template>
  <div class="card" @click="OneStorie(storie.id)">
    <img
      src="https://images.unsplash.com/photo-1488628075628-e876f502d67a?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg="
      alt=""
    />
    <p class="title">{{ storie.pseudo }}</p>
    <p class="date">{{ storie.date }}</p>
    <div class="overlay"></div>
    <div class="button"><img src="../assets/plus.png" class="plus" /></div>
  </div>
</template>

<script>
export default {
  name: "Card2",
  props: {
    storie: {
      default: "Valeur par défaut",
    },
  },
  methods: {
    OneStorie(id) {
      this.$router.push({ name: "OneStorie", params: { id: id } });
    },
  },
};
</script>

<style scoped lang="scss">
$primary: #091f43;
$secondary: #d1515a;

.card {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
  border-radius: 4px;
  box-shadow: 0 5px 20px rgba(9, 31, 67, 0.5);
  overflow: hidden;
  cursor: pointer;
  @media (min-width: 768px) {
    width: 20%;
  }
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background: rgba(0, 0, 0, .3);
  transition: height 0.3s ease;
}

.card:hover .overlay {
 display: block;
 height: 100%;
 
}

img {
  position: relative;
  width: 100%;
  left: 0;
  border-radius: 4px;
}

.title {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 5px;
  font-weight: 400;
  font-size: 1.5rem;
  text-align: left;
  padding-left: 10px;
  color: white;
  z-index: 1;
  opacity: 1;
  transition: opacity 0.4s ease;
}

.card:hover .title {
  opacity: 0;
}
.date {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 10px;
  font-weight: 400;
  font-size: 1rem;
  font-style: italic;
  text-align: right;
  padding-right: 10px;
  color: white;
  opacity: 1;
  transition: opacity 0.5s ease;
}

.card:hover .date {
  opacity: 0;
}

.button {  
  position: absolute;
   margin : auto auto;
  opacity: 0;
  transition: opacity 0.35s ease;
}

.plus {


  width: 36px;
  height: 36px;
}
.card:hover .button {
  opacity: 1;
}
</style>