const axios = require("axios");
const instance = axios.create({
  baseURL: "http://192.168.1.56:3000/api/"
});

const state = () => ({
    stories: {},
    commentaires: {},
});


const mutations = {
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

};





const actions = {
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