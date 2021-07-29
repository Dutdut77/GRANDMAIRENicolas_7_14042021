/* eslint-disable prettier/prettier */
import { createStore } from "vuex";
const axios = require("axios");
const instance = axios.create({
  baseURL: "http://192.168.1.56:3000/api/"
});

let user = localStorage.getItem('user');
if (!user) {
  user = {
    userId: -1,
    token: "",
  };
}
else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
  } catch {
    user = {
      userId: -1,
      token: "",
    };
  }

}

export default createStore({
  state: {
    status: "",
    errMessage: "",
    user: user,
    stories: {},
    profil: {},
    commentaires: {},
    nbPhoto: "",
    nbComment: "",
    test: "test"

  },
  getters: {},
  mutations: {

    setStatus(state, status) {
      state.status = status;
    },
    errMessage(state, error) {
      state.errMessage = error;
    },
    logUser(state, user) {
      instance.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
      localStorage.setItem("user", JSON.stringify(user));
      // localStorage.setItem("user", JSON.stringify({userId : user.userId, token : user.token}));
      state.user = user;
    },
    stories(state, stories) {
      state.stories = stories;
    },
    nbPhoto(state, nbPhoto) {
      state.nbPhoto = nbPhoto;
    },
    nbComment(state, nbComment) {
      state.nbComment = nbComment;
    },
    commentaires(state, commentaires) {
      if (commentaires.length > 0) {
        state.commentaires = commentaires;
      }
      else {
        state.commentaires = {};
      }
    },
    profil(state, profil) {
      state.profil = profil;
    },
    deleteStore(state) {
      state.stories = {};
      state.profil = {};
      state.nbComment = 0;
      state.nbPhoto = 0;
      state.status = "";
      state.errMessage = "";
      state.user = {
        userId: -1,
        token: "",
      }
    },

  },
  actions: {
    
    /**
     * Requete API pour se connecter.
     *
     * @param   {Object}  userinfos             Information du user
     * @param   {String}  userinfos.email       Email de l'utilisateur
     * @param   {String}  userinfos.password    Password du user
     *
     * @return  {JSON}                          Information complète de l'utilisateur
     */
    login: async ({ commit }, userinfos) => {
      try {
        commit("setStatus", "loading");
        const response = await instance.post("/auth/login", userinfos);
        commit("setStatus", "");
        commit("logUser", response.data);
        return response.data;
      }
      catch (err) {
        commit("setStatus", "error_login");
        commit("errMessage", err.response.data);
        throw (err);
      };
    },




    /**
     * Requete API pour s'enregistrer
     *
     * @param   {Object}  userinfos             Information du user
     * @param   {String}  userinfos.email       Email de l'utilisateur
     * @param   {String}  userinfos.password    Password du user
     * @param   {String}  userinfos.nom         Nom de l'utilisateur
     * @param   {String}  userinfos.prenom      Prénom du user
     * @param   {String}  userinfos.pseudo      Pseudo de l'utilisateur
     * @param   {Number}  userinfos.role        1 (simple utilisateur)
     * @param   {String}  userinfos.image_url   image de l'utilisateur
     *
     */
    signup: async ({ commit, dispatch }, userinfos) => {
      const data = new FormData();
      for (const [key, value] of Object.entries(userinfos)) {
        data.append(key, value);
      }
      const headers = {
        header: {
          "Content-Type": "multipart/form-data"
        }
      }
      try {
        commit("setStatus", "loading");
        const response = await instance.post("/auth/signup", data, headers);
        commit("setStatus", "");
        commit("profil", response.data);
        return dispatch("login", { email: userinfos.email, password: userinfos.password });
      }
      catch (error) {
        commit("setStatus", "error_signup");
        commit("errMessage", error.response.data);
        throw (error);
      };
    },



    /**
     * Requete API pour ajouter une photo.
     *
     * @param   {Object}  Image            Object Image
     * @param   {String}  Image.content    Nom de l'image
     * @param   {String}  Image.userId     Id du user
     *
     */
    AddPhoto: async ({ commit, dispatch }, Image) => {
      const data = new FormData();
      for (const [key, value] of Object.entries(Image)) {
        data.append(key, value);
      }
      try {
        commit("setStatus", "loading");
        const response = await instance.post("/image",data);
        commit("setStatus", "");
        return dispatch("getAllStories");
      }
      catch (error) {
        commit("setStatus", "error_addPhoto");
        commit("errMessage", error.response.data);
        throw (error);
      };

    },


    /**
     * Requete API pour modifier la photo de profil
     *
     * @param   {Object}  userPhoto.image_url  Nom de l'image
     *
     */
    updatePhoto: async ({ dispatch, commit, state }, userPhoto) => {
      const data = new FormData();
      for (const [key, value] of Object.entries(userPhoto)) {
        data.append(key, value);
      }
      const route = '/auth/avatar/'.concat('', state.user.userId);
      try {
        commit("setStatus", "loading");
        const response = await instance.put(route, data);
        commit("setStatus", "");
        return dispatch("getProfil");
      }
      catch (error) {
        console.error(error);
        throw (error);
      };

    },


    /**
     * Requete API pour modifier les données utilisateur
     *
     * @param   {Object}  userinfos          Info du user.
     * @param   {String}  userInfos.nom      Nom du user
     * @param   {String}  userInfos.prenom   Prénom du user
     * @param   {String}  userInfos.pseudo   PSeudo du user
     *
     */
    updateUser: async ({ dispatch, commit, state }, userinfos) => {
      const route = '/auth/'.concat('', state.user.userId);
      try {
        commit("setStatus", "loading");
        const response = await instance.put(route, userinfos);
        commit("setStatus", "");
        return dispatch("getProfil");
      }
      catch (error) {
        console.error(error);
        throw (error);
      };
    },

    /**
     * Requete API pour supprimer son compte.
     *
     */
    deleteUser: async ({ commit, state }) => {
      const route = '/auth/'.concat('', state.user.userId);
      try {
        commit("setStatus", "loading");
        const response = await instance.delete(route);
        commit("setStatus", "");
        localStorage.removeItem('user');
        commit("deleteStore");

      }
      catch (error) {
        console.error(error);
        throw (error);
      };
    },

    /**
     * Requete API pour supprimer un User
     *
     * @param   {Number}  userId    Id de l'utilisateur à supprimer
     *
     */
    deleteOneUser: async ({ dispatch }, userId) => {
      const route = '/auth/'.concat('', userId);
      try {
        const response = await instance.delete(route);
        dispatch("getAllProfil");
        dispatch("getAllStories");
        dispatch("getAllCommentairesAdmin");
      }
      catch (error) {
        console.error(error);
        throw (error);
      };
    },

    /**
     * Requete API pour afficher toutes les stories
     *
     */
    getAllStories: async ({ commit, state }) => {
      
      try {
        const response = await instance.post("/image/allStories", { userId : state.user.userId });
        commit("stories", response.data.Storie);
        return response.data.Storie;
      }
      catch (error) {
        console.error(error);
        throw (error);
      };
    },

    /**
     * Requete API pour affiche une Storie
     *
     * @param   {Object}  id       Object ID
     * @param   {Number}  id.id    Id de la storie à afficher
     *
     * @return  {JSON}             Info de la storie souhaitée.
     */
    getOneStorie: async ({ commit, state }, id) => {
      const route = '/image/oneStorie/'.concat('', id.id);
      try {
        const response = await instance.post(route, { userId : state.user.userId });
        commit("stories", response.data.Storie);

        return response.data.Storie;
      }
      catch (error) {
        console.error(error);
        throw (error);
      };
    },

    /**
     * Requete API pour compter le nombre de photo publié par le user connecté.
     *
     */
    countUserPhoto: async ({ commit, state }) => {
      const route = '/image/user/'.concat('', state.user.userId);
      try {
        const response = await instance.post(route, { userId : state.user.userId });
        commit("nbPhoto", response.data.NbPhoto);
        return response.data.NbPhoto;

      }
      catch (error) {
        console.error(error);
        throw (error);
      };
    },

    /**
     * Requete API pour compter le nombre de commentaire publié par le user connecté.
     *
     */
    countUserComment: async ({ commit, state }) => {
      const route = '/image/user/comment/'.concat('', state.user.userId);
      try {
        const response = await instance.post(route, { userId : state.user.userId });
        commit("nbComment", response.data.NbComment);

        return response.data.NbComment;

      }
      catch (error) {
        console.error(error);
        throw (error);
      };
    },

    /**
     * Requete API pour afficher tous les commentaires d'une storie donnée.
     *
     * @param   {Number}  id      Id de la storie
     *
     * @return  {JSON}            Tous les commentairtes de la storie.
     */
    getAllCommentaires: async ({ commit, state }, id) => {
      const route = '/image/viewComment/'.concat('', id);
      try {
        const response = await instance.post(route, { userId : state.user.userId });
        commit("commentaires", response.data.Commentaires);
        return response.data.Commentaires;
      }
      catch (error) {
        console.error(error);
        throw (error);
      };
    },

    /**
     * Requete API pour afficher tous les commentaires de toutes les stories.
     *
     *
     * @return  {JSON}          Tous les commentaires de toutes les stories.
     */
    getAllCommentairesAdmin: async ({ commit, state }) => {
      const route = '/image/allComment/';
      try {
        const response = await instance.post(route, { userId : state.user.userId });
        commit("commentaires", response.data.Commentaires);
        return response.data.Commentaires;
      }
      catch (error) {
        console.error(error);
        throw (error);
      };
    },

    /**
     * Requete API pour supprimer une storie.
     *

     * @param   {Number}  id        Id de la storie a supprimer
     *
     */
    delete: async ({ dispatch, commit, state }, id) => {
      const route = '/image/delete/'.concat('', id);
      try {
        const response = await instance.post(route,{ userId : state.user.userId });
        commit("stories", {});
        commit("commentaires", {});
        dispatch("getAllStories");
        dispatch("getAllCommentairesAdmin");
      }
      catch (error) {
        console.error(error);
        throw (error);
      };
    },

    /**
     * Requete API pour supprimer un commentaire.
     *
     * @param   {Object}  comment              Object
     * @param   {Number}  comment.id           Id du commentaire
     * @param   {Number}  comment.id_parent    Id de la photo ou se trouve le commentaire.
     *
     */
    DeleteComment: async ({ dispatch, state }, comment) => {
      const route = '/image/delete/comment/'.concat('', comment.id);
      try {
        await instance.post(route, { userId : state.user.userId });
        return dispatch("getAllCommentaires", comment.id_parent);
      }
      catch (error) {
        console.error(error);
        throw (error);
      };
    },

    /**
     * Requete API pour supprimer un commentaire depuis la page Admin
     *
     * @param   {object}  comment       Object
     * @param   {Number}  comment.id    Id du commentaire à supprimer.
     *
     */
    DeleteCommentAdmin: async ({ dispatch }, comment) => {
      const route = '/image/comment/'.concat('', comment.id);
      try {
        await instance.delete(route);
        dispatch("getAllCommentairesAdmin");
      }
      catch (error) {
        console.error(error);
        throw (error);
      };
    },

    /**
     * Requete API pour ajouter un commentaire.
     *
     * @param   {Object}  comment                   Toutes les infos du commentaire
     * @param   {String}  comment.content           Contenu du commentaire
     * @param   {Number}  comment.id_parent         Id de la photo commentée
     * @param   {Number}  comment.userId            Id du user qui ajoute le commentaire
     * @param   {Number}  comment.userIdContent     Id du user qui a ajouté la photo à commenter.
     *
     */
    addComment: async ({ commit, dispatch }, comment) => {
      try {
        commit("setStatus", "loading");
        const response = await instance.post("/image/comment/", comment);
        commit("setStatus", "");
        return dispatch("getAllCommentaires", response.data.id_parent);
      }
      catch (error) {
        commit("setStatus", "error_addComment");
        commit("errMessage", error.response.data);
        throw (error);
      };

    },

    /**
     * Requete API pour récupérer toutes les infos du user connecté.
     *
     * @return  {JSON}          Toutes les informations du user connecté
     * 
     */
    getProfil: async ({ commit, state }) => {
      const route = '/auth/'.concat('', state.user.userId);
      try {
        const response = await instance.get(route);
        commit("profil", response.data.user);
        return response.data.user;
      }
      catch (error) {
        console.error(error);
        throw (error);
      };
    },


    /**
     * Requete API pour récupérer la liste de tous les membres
     *
     *
     * @return  {JSON}          Toutes les informations de tous les membres
     */
    getAllProfil: async ({ commit }) => {
      try {
        const response = await instance.get("/auth");
        commit("profil", response.data.user);
        return response.data.user;
      }
      catch (error) {
        console.error(error);
        throw (error);
      };
    },

  },
  modules: {},
});
