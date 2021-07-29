<template>
  <div class="storie m-2">
    <img
      v-if="storie.content"
      :src="imageUrl()"
      class="img-fluid"
      alt="Photo Groupomania"
    />
    <div class="title">{{ storie.pseudo }}</div>
    <div class="date">{{ storie.date }}</div>
    <div class="overlay"></div>
    <div class="plus" @click="OneStorie(storie.id, storie.userId)">
      <fa :icon="['fas', 'search']" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Card2",
  data() {
    return {
      url: "http://localhost:3000/images/stories/",
    };
  },
  props: {
    storie: {
      default: "Valeur par défaut",
    },
  },
  methods: {
    OneStorie(id, userIdContent) {
      this.$router.push({ name: "OneStorie", params: { id, userIdContent } });
    },
    imageUrl() {
      return "http://localhost:3000/images/stories/" + this.storie.content;
    },
  },
};
</script>

<style scoped lang="scss">
$primary: #091f43;
$secondary: #d1515a;

.img-fluid {
  max-width: 400px;
}

.storie {
  position: relative;
  overflow: hidden;
  height: 100%;
  border-radius: 4px;
  box-shadow: 0 5px 5px rgba(9, 31, 67, 0.5);
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.3);
  transition: height 0.3s ease;
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

.plus {
  cursor: pointer;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 50%;
  bottom: 30px;
  left: calc(50% - 20px);
  width: 36px;
  height: 36px;
  color: $secondary;
}
</style>
