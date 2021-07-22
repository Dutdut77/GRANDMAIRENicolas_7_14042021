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
    nbPhoto : "",
    nbComment : "",
    test : "test"

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
      state.user = {
        userId: -1,
        token: "",
      }
    },

  },
  actions: {
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
        commit("errMessage",err.response.data);       
        throw (err);
      };
    },
    signup: async ({ commit, dispatch}, userinfos) => { 
      const data = new FormData();
      for (const [key, value] of Object.entries(userinfos)) {
          data.append(key, value);
      }
      // data.append("file", file);
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
        commit("setStatus", "error_login");
        console.log(error);
        throw (error);
      };
    },
    AddPhoto: async ({ dispatch }, Image) => { 
      const data = new FormData();
      for (const [key, value] of Object.entries(Image)) {
          data.append(key, value);
      }
      try {
        const response = await instance.post("/image", data);
        return dispatch("getAllStories"); 
      }
      catch (error) {        
        console.error(error);
        throw (error);
      };
     
    },
    updatePhoto: async ({ dispatch, commit, state}, userPhoto) => { 
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
    updateUser: async ({dispatch, commit, state}, userinfos) => {      
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
    deleteUser: async ({commit,  state}) => {      
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
    deleteOneUser: async ({dispatch}, userId) => {      
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
    getAllStories: async ({ commit }) => {   
      try {
        const response = await instance.get("/image");
        commit("stories", response.data.Storie);        
        return response.data.Storie;
      }
      catch (error) {
        console.error(error);
        throw (error);
      };
    },
    getOneStorie: async ({ commit }, id) => {      
      const route = '/image/'.concat('', id.id);     
      try {
        const response = await instance.get(route);
        commit("stories", response.data.Storie);   
        
        return response.data.Storie;
      }
      catch (error) {
        console.error(error);
        throw (error);
      };
    },
    countUserPhoto: async ({ commit, state }) => {
      const route = '/image/user/'.concat('', state.user.userId);
      try {
        const response = await instance.get(route);
        commit("nbPhoto", response.data.NbPhoto);          
        return response.data.NbPhoto;

      }
      catch (error) {
        console.error(error);
        throw (error);
      };
    },
    countUserComment: async ({ commit, state }) => {
      const route = '/image/user/comment/'.concat('', state.user.userId);
        try {
        const response = await instance.get(route);
        commit("nbComment", response.data.NbComment); 
         
        return response.data.NbComment;

      }
      catch (error) {
        console.error(error);
        throw (error);
      };
    },
    getAllCommentaires: async ({ commit }, id) => {
      const route = '/image/comment/'.concat('', id);      
      try {
        const response = await instance.get(route);
        commit("commentaires", response.data.Commentaires);
        return response.data.Commentaires;
      }
      catch (error) {
        console.error(error);
        throw (error);
      };
    },
    getAllCommentairesAdmin: async ({ commit }) => {
      const route = '/image/comment/';      
      try {
        const response = await instance.get(route);        
        commit("commentaires", response.data.Commentaires);
        return response.data.Commentaires;
      }
      catch (error) {
        console.error(error);
        throw (error);
      };
    },
    delete: async ({ dispatch, commit }, id) => {
      const route = '/image/'.concat('', id);      
      try {
        const response = await instance.delete(route);
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
    DeleteComment: async ({ dispatch }, comment) => {   
        const route = '/image/comment/'.concat('', comment.id);
      try {
        await instance.delete(route);
        return dispatch("getAllCommentaires", comment.id_parent);
      }
      catch (error) {
        console.error(error);
        throw (error);
      };
    },
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
    addComment: async ({ dispatch }, comment) => { 
      try {       
        const response = await instance.post("/image/comment/", comment);            
        return dispatch("getAllCommentaires", response.data.id_parent);
      }
      catch (error) {
        console.error(error);
        throw (error);
      };

    },
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
