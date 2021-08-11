<template>
  <div class="profile-info">
    <div class="avtar-clm">
      <div class="user-avtar">
        <img :src="userData.image ? userData.image : 'assets/images/avtar-img.jpg'" alt="" />
      </div>
    </div>
    <div class="clm">
      <h4>{{ userFullName ? userFullName : ''}}</h4>
      <p v-show="userData.city || userData.state || userData.country">
        <i class="fas fa-map-marker-alt"></i>
        {{ (userData.city && userData.city.name) ? (userData.city.name + ',') : 'Miami,'}}
        {{ (userData.state && userData.state.name) ?userData.state.name : 'FL' }}
        {{ (userData.country && userData.country.name) ? userData.country.name : 'USA' }}
      </p>
    </div>
    <div class="clm">
      <ul class="social-links">
        <li>
          <a href="#"><i class="fab fa-facebook-f"></i></a>
        </li>
        <li>
          <a href="#"><i class="fab fa-instagram"></i></a>
        </li>
        <li>
          <a href="#"><i class="fab fa-twitter"></i></a>
        </li>
        <li>
          <a href="#"><i class="fab fa-linkedin-in"></i></a>
        </li>
      </ul>
    </div>
    <div class="clm" v-if="user.user && user.user.user_type == 2">
      <a style="cursor: pointer;" class="submit-btn" @click.prevent="shareProfile(user.user.handle)">Share Profile</a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CryptoJS from 'crypto-js'
export default {
  data() {
    return {
      userData: {},
    };
  },
  
  mounted() {
    this.getUser();
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
    userFullName() {
      return this.userData.first_name + ' ' + this.userData.last_name
    }
  },
  methods: {
      getUser() {
      this.$store
        .dispatch("getUser")
        .then((response) => {
          this.userData = response.data;
        })
        .catch((err) => {
          if (err.response.status === 401) {
              this.$router.replace({name: 'login'})
          }
          alert(err.message);
        });
    },
    aesEncrypt(txt) {
      return CryptoJS.AES.encrypt(txt, 'popularness_dev').toString()
    },
    shareProfile (handle) {
      let tempInput = document.createElement("input");
      tempInput.value = process.env.MIX_APP_URL + 'artist-profile/' + handle;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      this.$notify({
          title: "Success!",
          text: "Profile share link is copied! You can paste the link and share now!",
          type: "success",
        });
    }
  }
};
</script>