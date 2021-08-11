<template>
  <section class="body-container">
    <Sidebar></Sidebar>
    <main class="">
      <div class="profile-banner"></div>

      <UserHeader></UserHeader>

      <section class="content-container">
        <div class="backend-pages">
          <DashboardNav></DashboardNav>

          <section class="connections-container">
            <div class="wrapper">
              <div class="links">
                <span>Facebook</span>
                <a @click="loginWithFacebook"
                  ><img src="assets/images/social-icons-1.jpg" alt=""
                /></a>
              </div>
              <div class="links">
                <span>Google</span>
                <a v-if="socialConnection.google">Connected</a>
                <a @click.prevent="loginWithGoogle"
                  v-if="!socialConnection.google"
                  ><img src="assets/images/social-icons-3.jpg" alt=""
                /></a>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  </section>
</template>

<script>
import { mapState } from "vuex";
import Sidebar from "./../layouts/components/Sidebar";
import UserHeader from "./../layouts/components/UserHeader";
import DashboardNav from "./../layouts/components/DashboardNav";

export default {
  components: {
    Sidebar,
    UserHeader,
    DashboardNav,
  },
  data() {
    return {
      socialConnection: {
        google: false,
        facebook: false
      }
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  mounted() {
    this.checkSocialConnections()
  },
  methods: {
    loginWithGoogle () {
      this.$gAuth
      .signIn()
      .then(GoogleUser => {
        this.$store
          .dispatch(
            "addSocialConnection",
            { provider: 'google', callbackData: GoogleUser, basicProfile: GoogleUser.getBasicProfile() }
          )
          .then((response) => {
            if (response.data) {
              this.$store.dispatch("getUser")
              .catch(err => console.log(err.message))
              
              this.socialConnection.google = true
              this.$notify({
                title: "Success!",
                text: 'Your Account is Linked Successfully!',
                type: "success"
              });
            }
          })
          .catch((err) => {
            this.$notify({
                title: "Error!",
                text: 'Your Account could not be Linked!',
                type: "error"
              });
          });
        })
      .catch(error => {
        console.log('error', error)
      })
    },
    loginWithFacebook() {
      window.FB.login(response => {
        console.log('fb response', response)
      })
    },
    checkSocialConnections() {
      if(this.user) {
        if(JSON.parse(this.user.user.social).google){
          this.socialConnection.google = true
        }

        if(JSON.parse(this.user.user.social).facebook){
          this.socialConnection.facebook = true
        }
      }
    }
  },
};
</script>
