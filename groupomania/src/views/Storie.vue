<template>
  <section>

<div class="album-title">
 <h2>Album photo GROUPOMANIA</h2>
    <button type="button" class="btn btn-secondary text-white" @click="showModal = true">
      AJOUTER PHOTO
    </button>
</div>
   

    <Card v-for="storie in stories" :key="storie.id" :storie="storie" />



 <transition name="modal">
    <Modal v-if="showModal" @close="showModal = false">
      <template v-slot:header>
        <h3>AJOUTER UNE PHOTO</h3>
      </template>
      <template v-slot:body>
        <form method="post" enctype="multipart/form-data">      
                  <div class="form__group">
            <div class="file-input">
              <input
                type="file"
                name="file-input"
                id="file-input"
                class="file-input__input"
                @change="PreviewFile"
              />
              <label class="file-input__label" for="file-input">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="upload"
                  class="svg-inline--fa fa-upload fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                  ></path>
                </svg>
                <span v-if="contentImageUrl === null"
                  >Choissisez votre Photo</span
                >
                <span v-else>{{ contentImageUrl.name }}</span>
              </label>
            </div>
          </div> 
         </form> 
      </template>
      <template v-slot:footer>    
        <button class="btn btn-secondary text-white" @click="AddPicture()">AJOUTER</button>
        <button class="btn btn-primary text-white" @click="CancelUpdate()">FERMER</button>
      </template>
      
    </Modal>
    </transition>  

  </section>
</template>

<script>
import { mapState } from "vuex";
import Modal from "@/components/Modal.vue";
import Card from "@/components/Card2.vue";


export default {
  name: "Storie",
  data() {
    return {
      showModal : false,
      contentImageUrl: null,
    }
  },
  mounted() {
    this.$store.dispatch("getAllStories");
  },
  components: { Card, Modal},
  computed: {
    ...mapState(["stories", "user"]),
  },
  methods: {
    OneStorie(id) {
      this.$router.push({ name: "OneStorie", params: { id: id } });
    },
    CancelUpdate() {     
      this.showModal = false;
      this.contentImageUrl = null;
    },
    PreviewFile() {
      this.contentImageUrl = event.target.files[0];
    },
    AddPicture() {     
    this.$store.dispatch("AddPhoto", {
       content: this.contentImageUrl,
       userId : this.user.userId 
    });
    this.contentImageUrl = null;
    this.showModal = false;
    }



  },
};
</script>

<style scoped lang="scss">
@import "bootstrap/scss/bootstrap.scss";

section {
  padding-top: 160px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.album-title {
  width : 100%;
  display: flex;
 flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;  
}
.file-input__input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.file-input__label {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  border : 1px solid $primary;
  font-size: 14px;
  font-weight: 600;
  color: $primary;
  font-size: 14px;
  padding: 10px 12px;  
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
}

.file-input__label svg {
  height: 16px;
  margin-right: 4px;
}


.modal-enter-active, .modal-leave-active {
  transition: all 0.5 ease;

}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}


</style>
