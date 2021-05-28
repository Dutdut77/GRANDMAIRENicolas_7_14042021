import { createStore } from "vuex";
const axios = require("axios");
const instance = axios.create({
  baseURL: "http://localhost:3000/api/auth/"
});

export default createStore({
  state: {
    messageFromVuex: "Message provenant de VueX",
    status: "",
    user: {
      userId: -1,
      token :"",
    }
  },
  getters: {},
  mutations: {
    setStatus(state, status) {
      state.status = status;
    },
    logUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    login: async ( { commit }, userinfos) => {
      try {
        commit("setStatus", "loading");
        const response = await instance.post("/login", userinfos);
        commit("setStatus", "");
        commit("logUser", response.data);
        return response.data;
      }
      catch (error) {
        commit("setStatus", "error_login");
        console.error(error);
        throw(error);
      };
    }
  },
  modules: {},
});
