import { param } from "jquery";
import { HTTP } from "../../config/conifg";

const state = {
    global: [],
    countries: [],
    states: [],
    cities: []
};

const getters = {
    global(state) {
        return state.global;
    },
    countries(state) {
        return state.countries;
    },
    states(state) {
        return state.states;
    },
    cities(state) {
        return state.cities;
    },
    getStateByCountry: state => countryId => {
        return state.states.filter(st => st.country_id == countryId);
    },
    getCityByState: state => stateId => {
        return state.cities.filter(city => city.state_id == stateId);
    }
};

const mutations = {
    global(state, payload) {
        state.global = payload;
    },
    SET_COUNTRIES(state, payload) {
        state.countries = payload;
    },
    SET_STATES(state, payload) {
        state.states = payload;
    },
    SET_CITIES(state, payload) {
        state.cities = payload;
    }
};

const actions = {
    getCountries(context) {
        return new Promise((resolve, reject) => {
            axios
                .get("/api/countries")
                .then(res => {
                    context.commit("SET_COUNTRIES", res.data);
                    resolve(res);
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
    getStates(context, params) {
        return new Promise((resolve, reject) => {
            axios
                .get("/api/states" + (params.countryId ? ('/' + params.countryId) : ''))
                .then(res => {
                    context.commit("SET_STATES", res.data);
                    resolve(res);
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
    getCities(context, params) {
        return new Promise((resolve, reject) => {
            axios
                .get("/api/cities" + (params.stateId ? ('/' + params.stateId) : ''))
                .then(res => {
                    context.commit("SET_CITIES", res.data);
                    resolve(res);
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
    getCityByStateId(context, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post("/api/cities/state", payload)
                .then(res => {
                    console.log(res);
                    resolve(res);
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
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
