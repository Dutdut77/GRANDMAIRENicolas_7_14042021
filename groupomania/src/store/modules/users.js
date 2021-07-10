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

const state = () => ({
    user: user,
    profil: {},
    nbPhoto: "",
    nbComment: "",
});


const mutations = {
    logUser(state, user) {
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
        localStorage.setItem("user", JSON.stringify(user));
        state.user = user;
    },
    nbPhoto(state, nbPhoto) {
        state.nbPhoto = nbPhoto;
    },
    nbComment(state, nbComment) {
        state.nbComment = nbComment;
    },
    profil(state, profil) {
        state.profil = profil;
    },

};


const actions = {
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
    signup: async ({ commit, dispatch }, userinfos) => {
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
            console.error(error);
            throw (error);
        };
    },
    updatePhoto: async ({ commit }, userPhoto) => {
        const data = new FormData();
        for (const [key, value] of Object.entries(userPhoto)) {
            data.append(key, value);
        }
        const route = '/auth/avatar/'.concat('', user.userId);
        try {
            commit("setStatus", "loading");
            const response = await instance.put(route, data);
            commit("setStatus", "");
            commit("profil", response.data);
        }
        catch (error) {
            console.error(error);
            throw (error);
        };

    },
    updateUser: async ({ commit }, userinfos) => {
        const route = '/auth/'.concat('', user.userId);
        try {
            commit("setStatus", "loading");
            const response = await instance.put(route, userinfos);
            commit("setStatus", "");
            commit("profil", response.data);
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

};


const getters = {
};

export default {
    namespaced: true, //Dans le cas où l'on aurait le même nom de getters dans deux modules différents.
    state,
    getters,
    actions,
    mutations
}