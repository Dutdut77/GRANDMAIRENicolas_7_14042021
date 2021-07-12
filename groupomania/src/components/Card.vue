<template>
  <div class="card px-3">

    <div class="image">
      <img src="../assets/img_home.png" class="card-img" alt="Hamburger" />
      <div class="titre">
        <div class="pseudo">
          <h2>Messi</h2>
        </div>
        <div class="date">21-06-2021</div>
      </div>
    </div>

    <div class="dialogue">
      <div class="group">
        <div class="group--avatar">
          <img
            class="group--image"
            src="../assets/avatar.svg"
            alt="user photo"
          />
        </div>
        <div class="group--desc">
          <div class="group--pseudo">Neymar</div>
          <div class="group--date">26-06-2021</div>
          <div class="group--text">ca donne faim ton histoire...</div>
        </div>
      </div>
      <div class="group">
        <div class="group--avatar">
          <img
            class="group--image"
            src="../assets/avatar.svg"
            alt="user photo"
          />
        </div>
        <div class="group--desc">
          <div class="group--pseudo">Mbappé</div>
          <div class="group--date">28-06-2021</div>
          <div class="group--text">
            Avec ça dans le ventre, c'est sûr je vais courrir moins vite.
          </div>
        </div>
      </div>
      <div class="group">
        <div class="group--avatar">
          <img
            class="group--image"
            src="../assets/avatar.svg"
            alt="user photo"
          />
        </div>
        <div class="group--desc">
          <div class="group--pseudo">Ronaldo</div>
          <div class="group--date">29-06-2021</div>
          <div class="group--text">
            C'est vraiment pas bon pour la santé. Rien ne vaut une bonne salade
            de crudité.
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
export default {
  name: "Card",
};
</script>

<style scoped lang="scss">
@import "bootstrap/scss/bootstrap.scss";


.card {
  box-shadow: 0 5px 20px rgba(9, 31, 67, 0.5);
}
.image {
position: relative;
}
.card-img {
  position: relative;
  top: -25px;
  height: auto;
  border-radius: 0.25rem;
  box-shadow: 0 0px 10px rgba(9, 31, 67, 0.4);
  display: flex;
  align-items: flex-end;
}
.titre {
  position : absolute;
  bottom: 25px;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  height: 60px;
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-end;
  justify-content: center;
  border-radius: 0 0 5px 5px;
}
.pseudo {
  width: 40%;
  margin-right: auto;
  padding: 5px 10px;
  text-align: start;
}
.pseudo h2 {
  color: white;
}
.date {
  margin-left: auto;
  padding: 0 10px 10px 0;
  text-align: end;
  width: 40%;
  color: white;
  font-style: italic;
  font-size: 1rem;
}

.dialogue {
  height: 300px;
  overflow: hidden;
  overflow-y: auto;
}

.group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid grey;
  padding: 5px;
  &--avatar {
    width: 15%;
  }
  &--desc {
    width: 85%;
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  &--image {
    width: 100%;
    height: 100%;
  }
  &--pseudo {
    width: 50%;
    text-align: start;
    font-weight: bold;
    color: $primary;
  }
  &--date {
    width: 50%;
    text-align: end;
    color: $primary;
  }
  &--text {
    width: 100%;
    text-align: justify;
    color: $primary;
  }
}
</style>