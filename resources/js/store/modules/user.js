import { HTTP } from "../../config/conifg";

const state = {};

const getters = {};

const mutations = {
    setUserData(state, userData) {
        state.user = userData;
        localStorage.setItem("user", JSON.stringify(userData));
        axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`;
    }
};

const actions = {
    saveUserInfo({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            axios
                .post("api/user/update", userInfo)
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        this.$router.replace({name: 'login'})
                    }
                    reject(err)
                });
        });
    },
    completeUserInfo({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            axios
                .post("/api/complete-profile", userInfo)
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        this.$router.replace({name: 'login'})
                    }
                    reject(err)
                });
        });
    },
    updateBio({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            axios
                .post("api/user/updateBio", userInfo)
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        this.$router.replace({name: 'login'})
                    }
                    reject(err)
                });
        });
    },
    addSocialConnection({ commit }, social) {
        return new Promise((resolve, reject) => {
            axios
                .post(`/api/social-integration/${social.provider}`, social)
                .then(response => {
                    console.log(response);
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
        });
    },
    getArtistInfo(context, params) {
        return new Promise((resolve, reject) => {
            axios
                .get(`/api/artist-info/${params.userId}`)
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
};

export default {
    state,
    mutations,
    actions,
    getters
};
