<template>
  <section class="login-container">
    <div class="login-wrapper">
      <div class="clm1">
        <h4>Become a Popularness Member</h4>
        <p>
          Join the POPULARNES community to create your own playlists, rate and
          comment on stories, subscribe to your favourite categories and more
        </p>
        <router-link to="/fan-signup"><a class="btn-default fan mt-4">Fan</a></router-link>
        <router-link to="/pricing"><a class="btn-default artist mt-4">Artist</a></router-link>
      </div>
      <div class="clm2">
        <h4>Login To your account</h4>
        <div class="social-icons">
          <!-- <a @click="loginWithFacebook"><i class="fab fa-facebook-f"></i></a> -->
          <a @click="loginWithGoogle"><i class="fab fa-google-plus-g"></i></a>
          <!-- <a @click="handleSocialLogin('facebook')"><i class="fab fa-facebook-f"></i></a> -->
          <!-- <a @click="handleSocialLogin('google')"><i class="fab fa-google-plus-g"></i></a> -->
        </div>
        <p class="or">or</p>
        <form class="login-form" @submit.prevent="handleLogin">
          <div class="form-group">
            <!-- <input type="email" placeholder="Email Address" class="fld" />
            <input type="password" placeholder="Password" class="fld" /> -->
            <h2 class="text-center mb-2">Popularness</h2>
            <input type="email" class="fld" name="email" v-model="formData.email" placeholder="Email Address">
            <input type="password" class="fld" name="password" v-model="formData.password" placeholder="Password ">
          </div>
          <div class="forgot-password">
            <div class="remember">
              <label class="switch">
                <input type="checkbox" class="default" />
                <span class="slider round"></span>
              </label>
              <span>Remember Me</span>
            </div>
            <router-link to="reset-password">
              <a>Forgot Your Password ?</a>
            </router-link>
          </div>
          <button type="submit" class="btn-default mt-4">Login</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
// import { initFbsdk } from './../config/facebook_oAuth'
export default {
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
    };
  },
  mounted() {
    // initFbsdk()
  },
  methods: {
    loginWithGoogle () {
      this.$gAuth
      .signIn()
      .then(GoogleUser => {
        this.$store
          .dispatch(
            "handleSocialLogin",
            { provider: 'google', callbackData: GoogleUser, basicProfile: GoogleUser.getBasicProfile() }
          )
          .then((response) => {
            this.$router.push({ name: "dashboard" });
          })
          .catch((err) => {
            console.log(err);
          });
        })
      .catch(error => {
        console.log('error', error)
      })
    },
    handleLogin() {
      // Send axios request to the login route
      this.$store
        .dispatch("handleLogin", this.formData)
        .then((res) => {
          if(res.status && res.data.status) {
            this.$router.push({ name: "dashboard" });
          } else {
            this.$notify({
                title: "Error!",
                text: res.data.message,
                type: "error"
            });
          }
        })
        .catch((err) => {
          this.$notify({
              title: "Error!",
              text: err.message,
              type: "error"
          });
        });
    },
    getUsers() {
      axios.get("/api/users").then((res) => {
      }).catch((err) => {
        console.log(err.message);
        // if (err.response.status === 401) {
        //     this.$router.replace({name: 'login'})
        // }
      });
    },
    handleLogout() {
      this.$store
        .dispatch("handleLogout", this.formData)
        .then((response) => {
          this.$notify({
            title: 'Success!',
            text: 'You are successfully Logged Out!!',
            type: 'success',
          });
          this.$router.push({ name: "welcome" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loginWithFacebook() {
      console.log(window);
      window.FB.login(response => {
        console.log('fb response', response)
      }, this.params)
    }
  },
};
</script>
<style scoped>
.btn-default.fan{
  background: #3f3f3f;
  color: #FFA472;
}
.btn-default.fan:hover{
  background: ##FFA472;
}
</style>
