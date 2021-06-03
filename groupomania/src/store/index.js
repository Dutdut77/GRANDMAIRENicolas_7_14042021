import { createStore } from "vuex";
const axios = require("axios");
const instance = axios.create({
  baseURL: "http://localhost:3000/api/"
});

let user = localStorage.getItem('user');
if (!user) {
  user = {
    userId: -1,
    token : "",
  };
} else {
  try{
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
  }catch  {
    user = {
      userId: -1,
      token : "",
    };
  }
  
}



export default createStore({
  state: {
    messageFromVuex: "Message provenant de VueX",
    status: "",
    user: {
      userId: -1,
      token :"",
    },
    allStories : {
      nom : "",
      content : "",
      date : "",
    },
    oneStorie : {
      nom : "",
      content : "",
      date : "",
    },   
     profil : {
      nom : "",
      prenom : "",
      email : "",
      pseudo : "",
      avatar : "",
      titre : ""
    },
    allProfil : {
      nom : "",
      prenom : "",
      email : "",
      pseudo : "",
      avatar : "",
      titre : ""
    },

  },
  getters: {},
  mutations: {
    setStatus(state, status) {
      state.status = status;
    },
    logUser(state, user) {
      instance.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;     
    },
    allStories(state, allStories) {
      state.allStories = allStories;        
    },
    oneStorie(state, oneStorie) {
      state.oneStorie = oneStorie;         
    },
    profil(state, profil) {
      state.profil = profil;           
    },
    allProfil(state, allProfil) {
      state.allProfil = allProfil;           
    }
  },
  actions: {
    login: async ( { commit }, userinfos) => {
      try {
        commit("setStatus", "loading");
        const response = await instance.post("/auth/login", userinfos);
        commit("setStatus", "");
        commit("logUser", response.data);        
        return response.data;
      }
      catch (error) {
        commit("setStatus", "error_login");
        console.error(error);
        throw(error);
      };
    },
    signup: async ( { commit }, userinfos) => {
      console.log(userinfos);
      try {
        commit("setStatus", "loading");
        const response = await instance.post("/auth/signup", userinfos);
        commit("setStatus", "");
        commit("profil", response.data);        
        return response.data;
      }
      catch (error) {
        commit("setStatus", "error_login");
        console.error(error);
        throw(error);
      };
    },
     getAllStories : async ({commit}) => {
       try {
         const response = await instance.get("/image");
         commit("allStories", response.data.Storie);
         return response.data.Storie;
       }
       catch (error) {        
        console.error(error);
        throw(error);
      };
     },
     getOneStorie : async ({commit}, id) => {
      const route = '/image/'.concat('', id.id);
      try {
        const response = await instance.get(route);
        commit("oneStorie", response.data.Storie);
        return response.data.Storie;
      }
      catch (error) {        
       console.error(error);
       throw(error);
     };
    },
    getProfil : async ({commit}) => {
        try {
        const response = await instance.get("/auth/94");
        commit("profil", response.data.user);
        return response.data.user;
      }
      catch (error) {        
       console.error(error);
       throw(error);
     };
    },
    getAllProfil : async ({commit}) => {
      try {
      const response = await instance.get("/auth");
      commit("allProfil", response.data.user);
      return response.data.user;
    }
    catch (error) {        
     console.error(error);
     throw(error);
   };
  }
  },
  modules: {},
});
