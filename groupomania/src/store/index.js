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
    login: ({ commit }, userinfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
          instance.post("/login", userinfos)
          .then(function (response) {
            commit("setStatus", "");
            commit("logUser", response.data);
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "error_login");
            reject(error);
          });
      });

    }
  },
  modules: {},
});
