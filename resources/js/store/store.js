import Vue from "vue";
import Vuex from "vuex";

import global from "./modules/global";
import auth from "./modules/auth";
import user from "./modules/user";
import video from "./modules/video";
import playlist from "./modules/playlist";
// import setting from "./modules/setting";
// import bank_account from "./modules/bank_account";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        user,
        global,
        video,
        playlist,
        // setting,
        // bank_account
    }
});
