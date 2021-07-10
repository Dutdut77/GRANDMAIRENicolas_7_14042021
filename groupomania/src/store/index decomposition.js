import { createStore } from "vuex";
import users from './modules/users'
import stories from './modules/stories'


const axios = require("axios");
const instance = axios.create({
  baseURL: "http://192.168.1.56:3000/api/"
});





export default createStore({
  state: {
    status: "",
  },
  mutations: {    
    setStatus(state, status) {
      state.status = status;
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

    delete: async ({ commit }, id) => {
      const route = '/image/'.concat('', id);
      try {
        const response = await instance.delete(route);
        commit("stories", {});
        commit("commentaires", {});        
        return response.data.Storie;
      }
      catch (error) {
        console.error(error);
        throw (error);
      };
    },
   
    verifToken : async () => {
      try {
        const response = await instance.get("/auth/token");
        return response.data;
      }
      catch (error) {
        console.error(error);
        throw (error);
      };
    }
  },
  modules: { users, stories},
});
