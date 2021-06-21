import { createStore } from "vuex";
const axios = require("axios");
const instance = axios.create({
  baseURL: "http://localhost:3000/api/"
});

let user = localStorage.getItem('user');
if (!user) {
  user = {
    userId: -1,
    token: "",
  };
} else {
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
    user: user,
    stories: {},    
    profil: {},
    commentaires: {},

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
    stories(state, stories) {
      state.stories = stories;
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
      catch (error) {
        commit("setStatus", "error_login");
        console.error(error);
        throw (error);
      };
    },
    signup: async ({ commit }, userinfos) => { 
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
        //this.dispatch("login", { email: this.email, password: this.password });
        return response.data;
      }
      catch (error) {
        commit("setStatus", "error_login");
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
    getProfil: async ({ commit }) => {
      try {
        const response = await instance.get("/auth/94");
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
    }
  },
  modules: {},
});
