import { HTTP } from "../../config/conifg";

const state = {
    setting: []
};

const getters = {
    setting(state) {
        return state.setting;
    }
};

const mutations = {
    setting(state, payload) {
        state.setting = payload;
    }
};

const actions = {
    createSettingInfo({ commit }, payload) {
        return new Promise((resolve, reject) => {
            payload
                .post(HTTP.baseURL + "api/setting")
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        this.$router.replace({name: 'login'})
                    }
                    reject(err)
                });
        });
    },

    updateSettingInfo({ commit }, payload) {
        return new Promise((resolve, reject) => {
            payload
                .put(HTTP.baseURL + "api/setting/" + payload.id)
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        this.$router.replace({name: 'login'})
                    }
                    reject(err)
                });
        });
    },

    getAllSetting(context) {
        axios
            .get(HTTP.baseURL + "api/setting")
            .then(response => {
                context.commit("setting", response.data.Setting);
            })
            .catch(err => {
                if (err.response.status === 401) {
                    this.$router.replace({name: 'login'})
                }
                reject(err)
            });
    },

    deleteSettingInfo({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .delete(HTTP.baseURL + "api/setting/" + payload.id)
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        this.$router.replace({name: 'login'})
                    }
                    reject(err)
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
