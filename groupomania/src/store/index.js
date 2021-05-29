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
    }
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
     }
  },
  modules: {},
});
