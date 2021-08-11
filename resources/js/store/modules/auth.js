import { HTTP } from "../../config/conifg";

const state = {
    user: localStorage.getItem("user")
};

const getters = {
    isLogged: state => !!state.user,
    userHasFavouriteGenres: state => {
        state.user &&
            (JSON.parse(state.user).favourite_genres ||
                state.user.favourite_genres) &&
            (JSON.parse(state.user).favourite_genres.length ||
                state.user.favourite_genres.length) > 0;
        // userHasFavouriteGenres: state => state.user && state.user.favourite_genres && state.user.favourite_genres.length > 0
    },
    userData: state => {
        return state.user;
    }
};

const mutations = {
    setUserData(state, userData) {
        state.user = userData;
        localStorage.setItem("user", JSON.stringify(userData));
        axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`;
    },

    clearUserData() {
        state.user = null;
        localStorage.removeItem("user");
        window.$cookies.remove("laravel_session");
        window.$cookies.remove("XSRF-TOKEN");
        axios.defaults.headers.common.Authorization = null;
    }
};

const actions = {
    handleLogin({ commit }, credentials) {
        return new Promise((resolve, reject) => {
            axios
                .get(HTTP.apiURL + "sanctum/csrf-cookie")
                .then(response => {
                    axios
                        .post("/api/login", credentials)
                        .then(res => {
                            if(res.status && res.data.status) {
                                commit("setUserData", res.data.data);
                            }
                            resolve(res)
                        })
                        .catch(err => {
                            reject(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    handleSocialLogin({ commit }, social) {
        return new Promise((resolve, reject) => {
            axios
                .get(HTTP.apiURL + "sanctum/csrf-cookie")
                .then(response => {
                    axios
                        .post(`/api/callback/${social.provider}`, social)
                        .then(response => {
                            commit("setUserData", response.data);
                            resolve(response);
                        })
                        .catch(err => {
                            this.$notify({
                                title: "Error!",
                                text: err.message,
                                type: "error"
                            });
                            reject(err);
                        });
                })
                .catch(err => {});
        });
    },
    handleLogout({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .get("/logout")
                .then(response => {
                    commit("clearUserData", response.data);
                    resolve(response.data);
                })
                .catch(err => {
                    this.$notify({
                        title: "Error!",
                        text: err.message,
                        type: "error"
                    });
                    reject(err);
                });
        });
    },
    logout({ commit }) {
        commit("clearUserData");
    },
    getUser(context) {
        return new Promise((resolve, reject) => {
            axios
                .get("/api/user")
                .then(response => {
                    context.commit("setUserData", response.data);
                    resolve(response);
                })
                .catch(err => {
                    if (err.status === 401) {
                        this.$router.replace({ name: "login" });
                    }
                    reject(err);
                });
        });
    },
    getUserWithEmail(context, payload) {
        return new Promise((resolve, reject) => {
            axios
                .get(`/api/user/${payload.email}`)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },

    register({ commit }, data) {
        return new Promise((resolve, reject) => {
            axios
                .post("/api/register", {
                    email: data.email,
                    userType: data.type == 2 ? 2 : 1,
                    packageId: data.packageId || 1
                })
                .then(response => {
                    // commit("setUserData", response.data)
                    resolve(response);
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        });
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
