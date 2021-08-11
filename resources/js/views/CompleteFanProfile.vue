<template>
  <section class="login-container fan-page complete-fan-profile">
    <div class="signup-wrapper">
        <h4 class="mb-4 text-center">Complete Your FAN Profile</h4>
        <div class="fan-form">
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
                        <select v-model="userInfo.country"  @change="countryChanged" class="fld">
                          <option class="form-control" selected value="">
                            Select Your Country
                          </option>
                          <option v-for="(country, index) in countries" :key="index" :value="country.id">{{ country.name }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <input type="text" class="fld" placeholder="Address" />
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <select v-model="userInfo.state" class="fld" @change="stateChanged">
                          <option class="form-control" selected value="">
                            Select Your State
                          </option>
                          <option v-for="(st, index) in stateData" :key="index" :value="st.id">{{ st.name }}</option>
                        </select>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <select v-model="userInfo.city" class="fld">
                          <option class="form-control" selected value="">
                            Select Your City
                          </option>
                          <option v-for="(city, index) in cityData" :key="index" :value="city.id">{{ city.name }}</option>
                        </select>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <input type="text" class="fld" placeholder="ZIP" />
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
                        <input id="password-confirm" type="password" class="fld" name="password_confirmation" required="" autocomplete="new-password" placeholder="Confirm Password" v-model="confirmPassword">
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
import S3FileUpload from "../components/S3FileUpload.vue";

export default {
  components: {
    S3FileUpload
  },
  data() {
    return {
      image: "",
      password: "",
      confirmPassword: "",
      stateData: [],
      cityData: [],
      userInfo: {
        nickname: "",
        surname: "",
        firstName: "",
        lastName: "",
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
    this.userInfo.id = this.$route.params.userId

    if (this.countries.length < 1) {
      this.$store.dispatch("getCountries");
    }

    this.userInfo = {
        nickname: this.user.nickname,
        surname: this.user.surname,
        firstName: this.user.first_name,
        lastName: this.user.last_name,
        email: this.user.email,
        changedPassword: "",
        dob: this.user.dob,
        bio: this.user.bio,
        image: this.user.image,
        country: this.user.country,
        state: this.user.state,
        city: this.user.city,
        privacy: false,
      }
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      countries: (state) => state.global.countries,
    })
  },
  methods: {
    saveUserInfo() {
      if(this.password && this.password != this.confirmPassword) {
          alert('Password does not match. Please try again!');
          return;
      }
      this.userInfo.password = this.password;

      this.$store
        .dispatch("completeUserInfo", this.userInfo)
        .then((response) => {
          console.log(response.data);
          if(response.data.status == false) {
              alert(response.data.message)
              return;
          }
          this.$router.push({ name: "login" });
        })
        .catch((err) => {
          console.log(err);
          alert(err)
        });
    },
    async countryChanged() {
      console.log(this.userInfo.country);
      this.userInfo.state = "";
      this.userInfo.city = "";
      await this.$store.dispatch("getStates", { countryId: this.userInfo.country })
      .then(res => {
        this.stateData = res.data
      })
      .catch(err => {
        console.log(err);
      });
    },
    async stateChanged() {
      this.userInfo.city = "";
      await this.$store.dispatch("getCities", { stateId: this.userInfo.state })
      .then(res => {
        this.cityData = res.data
      })
      .catch(err => {
        console.log(err);
      });
    },
    getCityByStateId() {
      this.$store
        .dispatch("getCityByStateId", { stateId: this.userInfo.state })
        .then((response) => {
          console.log(response.data);
          this.cityData = response.data;
        })
        .catch((err) => {
          console.log(err);
          alert(err)
        });
    },
    fileUploadCallback(data){
      if(data.url) this.userInfo.image = data.url
      console.log(data);
    }
  },
};
</script>
