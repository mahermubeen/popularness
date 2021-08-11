<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Profile</div>

          <div class="card-body">
            <form class="col-md-8 mx-auto">
              <div class="form-group">
                <label>Nickname</label>
                <input
                  v-model="userInfo.nickname"
                  type="text"
                  class="form-control"
                  placeholder="Nickname"
                />
              </div>
              <div class="form-group">
                <label>Surname</label>
                <select v-model="userInfo.surname" class="form-control">
                  <option class="form-control" selected="true" value="">
                    Select
                  </option>
                  <option class="form-control" value="1">Mr.</option>
                  <option class="form-control" value="2">Mrs.</option>
                  <option class="form-control" value="3">Ms.</option>
                </select>
              </div>
              <div class="form-group">
                <label>First Name</label>
                <input
                  v-model="userInfo.firstName"
                  type="text"
                  class="form-control"
                  placeholder="First Name"
                />
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input
                  v-model="userInfo.lastName"
                  type="text"
                  class="form-control"
                  placeholder="Last Name"
                />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input
                  v-model="userInfo.email"
                  type="email"
                  class="form-control"
                  placeholder="Email"
                />
              </div>
              <div class="form-group">
                <label>Change Password</label>
                <input
                  v-model="userInfo.changedPassword"
                  type="password"
                  class="form-control"
                  placeholder="Change Password"
                />
              </div>
              <div class="form-group">
                <label>Date of Birth</label>
                <input
                  v-model="userInfo.dob"
                  type="date"
                  class="form-control"
                  placeholder="Date of Birth"
                />
              </div>
              <div class="form-group">
                <label>Country</label>
                <select v-model="userInfo.country" class="form-control" @change="countryChanged">
                  <option class="form-control" selected value="">
                    Select Your Country
                  </option>
                  <option v-for="(country, index) in countries" :key="index" :value="country.id">{{ country.name }}</option>
                </select>
              </div>
              <div class="form-group">
                <label>State</label>
                <select v-model="userInfo.state" class="form-control" @change="stateChanged">
                  <option class="form-control" selected value="">
                    Select Your State
                  </option>
                  <option v-for="(st, index) in stateData" :key="index" :value="st.id">{{ st.name }}</option>
                </select>
              </div>
              <div class="form-group">
                <label>City</label>
                <select v-model="userInfo.city" class="form-control">
                  <option class="form-control" selected value="">
                    Select Your City
                  </option>
                  <option v-for="(city, index) in cityData" :key="index" value="city.id">{{ city.name }}</option>
                </select>
              </div>
              <div class="form-group">
                <label>Biography</label>
                <textarea
                  v-model="userInfo.bio"
                  class="form-control"
                  placeholder="Biography"
                  rows="5"
                >
                </textarea>
              </div>
              <div class="form-group">
                <label>Privacy</label>
                <input type="checkbox" v-model="userInfo.privacy" />
              </div>
              <div class="form-group">
                <S3FileUpload filedName="proPic" directory="thumbnails" />
              </div>
              <button @click.prevent="saveUserInfo" class="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import S3FileUpload from "../components/S3FileUpload.vue";
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    S3FileUpload,
  },
  data() {
    return {
      image: "",
      // stateData: [],
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
      }
    };
  },
  mounted() {
    if (this.countries.length < 1) {
        this.$store.dispatch('getCountries');
    }
    
    if (this.states.length < 1) {
        this.$store.dispatch('getStates');
    }
    
    // if (this.cities.length < 1) {
    //     this.$store.dispatch('getCities');
    // }
  },
  computed: {
    stateData(){
      return this.$store.getters.getStateByCountry(this.userInfo.country)
    },
    ...mapState({
        user: state => state.auth.user,
        countries: state => state.global.countries,
        states: state => state.global.states,
        // cities: state => state.global.cities,
    }),
    ...mapGetters([]),
  },
  methods: {
    saveUserInfo() {
      // Send axios request to the login route
      this.$store
        .dispatch("saveUserInfo", this.userInfo)
        .then((response) => {
          this.userInfo.firstName = response.data.data.first_name
          this.userInfo.lastName = response.data.data.last_name
          this.userInfo.dob = response.data.data.dob
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showLog(data){
      console.log(data);
    },
    countryChanged() {
      this.userInfo.state = ''
      this.userInfo.city = ''
    },
    stateChanged() {
      this.userInfo.city = ''
      this.getCityByStateId()
    },
    getCityByStateId() {
      this.$store
        .dispatch("getCityByStateId", {stateId: this.userInfo.state})
        .then(response => {
            console.log(response.data);
            this.cityData = response.data
        })
        .catch(err => {
            console.log(err);
        });
    }
  },
};
</script>
