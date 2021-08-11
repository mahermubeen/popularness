require('./bootstrap');
require('./../assets/js/bootstrap.min.js');
require('./../assets/js/pignose.calendar.min.js');
require('./../assets/owl-slider/owl.carousel.js');
require('./../assets/js/jquery.dm-uploader.min.js');
require('./../assets/js/demo-ui.js');
require('./../assets/js/popper.min.js');
require('./../assets/js/demo-config.js');
require('./../assets/js/utils.js');
require('./../assets/js/custom.js');

window.Vue = require('vue');
import router from './router.js'
import App from './App.vue'
import store from "./store/store";

// Vue Router
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// Vue Cookies
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// Vue Notification
import Notifications from 'vue-notification'
Vue.use(Notifications)

// Modal
import VModal from 'vue-js-modal'
Vue.use(VModal)

// Vue Calendar
import VCalendar from 'v-calendar';
Vue.use(VCalendar);

// Google Auth
import GoogleAuth from './config/google_oAuth'
const gauthOption = {
  clientId: process.env.MIX_GOOGLE_CLIENT_ID,
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.use(GoogleAuth, gauthOption)

  
export const app = new Vue({
    el: '#app',
    render: h =>  h(App),
    router,
    store,
    // created () {
    //     const userInfo = localStorage.getItem('user')
    //     if (userInfo) {
    //       const userData = JSON.parse(userInfo)
    //       this.$store.commit('setUserData', userData)
    //     }
    //     axios.interceptors.response.use(
    //       response => response,
    //       error => {
    //         if (error.response.status === 401) {
    //         //   this.$store.dispatch('logout')
    //         }
    //         return Promise.reject(error)
    //       }
    //     )}
});
