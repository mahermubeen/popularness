<template>
  <section class="login-container fan-page complete-fan-profile">
    <div class="signup-wrapper">
        <h4 class="mb-4 text-center">Complete Your Artist Profile</h4>
        <div class="fan-form">
            <div class="row">
                <div class="col-12">
                    <div class="form-group">
                        <input type="text" class="fld" placeholder="Email Address" v-model="userInfo.email"/>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <input type="text" class="fld" placeholder="Artist/Band Name" v-model="userInfo.name" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                    <div class="form-group">
                        <select class="fld" v-model="userInfo.surname">
                          <option selected="true" value="">Surname</option>
                          <option value="1">Mr.</option>
                          <option value="2">Mrs.</option>
                          <option value="3">Ms.</option>
                        </select>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <input class="fld" placeholder="First Name" v-model="userInfo.firstName" />
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <input class="fld" placeholder="Last Name" v-model="userInfo.lastName" />
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <div class="form-group">
                        <select class="fld" v-model="userInfo.genre">
                            <option value="">Genre</option>
                            <option :value="genre.id" v-for="(genre, index) in genres" :key="index">{{ genre.genre }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <div class="form-group">
                        <input id="password" type="password" class="fld" name="password" required="" autocomplete="new-password" placeholder="Password" aria-autocomplete="list"
                        v-model="password">
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <input id="password-confirm" type="password" class="fld" name="password_confirmation" required="" autocomplete="new-password" placeholder="Confirm Password" v-model="confirmPassword" @keyup.enter="saveUserInfo">
                    </div>
                </div>
            </div>

            <div class="text-center">
                <button class="btn-default yellow-btn" @click.prevent="saveUserInfo">Submit</button>
            </div>

        </div>

    </div>
</section>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      image: "",
      password: "",
      confirmPassword: "",
    //   stateData: [],
      cityData: [],
      userInfo: {
        id: null,
        email: "",
        packageId: null,
        name: "",
        nickname: "",
        surname: "",
        firstName: "",
        lastName: "",
        genre: "",
        email: "",
        changedPassword: "",
        dob: "",
        bio: "",
        country: "",
        state: "",
        city: "",
        privacy: false,
      },
    };
  },
  mounted() {
    this.userInfo.packageId = this.$route.params.packageId
    this.$store.dispatch("getGenres");
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
    ...mapGetters(["genres"])
  },
  methods: {
    saveUserInfo() {
      if(this.password && this.password != this.confirmPassword) {
          alert('Password does not match. Please try again!');
          return;
      }
      this.userInfo.password = this.password;

      this.$store
        .dispatch("register", {
          email: this.userInfo.email,
          type: 2,
          packageId: this.userInfo.packageId
        }) // type: 2 == Artist
        .then(res => {
          if (res.status && res.data.status) {
            this.userInfo.id = res.data.data.id
            this.userInfo.is_active = 1
            this.completeProfile()
          } else {
            this.$notify({
              title: "Oops!",
              text: res.data.message + ` - Please try again!`,
              type: "warning"
            });
            this.$router.push({ name: "login" });
          }
        })
        .catch(err => {
          this.$notify({
            title: "Error!",
            text: err.message,
            type: "error"
          });
        });
    },
    completeProfile() {
      this.$store
        .dispatch("completeUserInfo", this.userInfo)
        .then((response) => {
          if (response.status) {
            this.$notify({
              title: "Success!",
              text: response.data.message,
              type: "success"
            });
            this.$router.push({ name: "confirmation-email" });
          } else {
            this.$notify({
              title: "Oops!",
              text: response.data.message + ` - Please try again!`,
              type: "warning"
            });
            this.$router.push({ name: "login" });
          }
        })
        .catch((err) => {
          this.$notify({
            title: "Error!",
            text: err.message,
            type: "error"
          });
        });
    }
  },
};
</script>
