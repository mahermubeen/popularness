<template>
  <section class="body-container">
    <Sidebar></Sidebar>
    <main class="">
      <div class="profile-banner"></div>

      <UserHeader></UserHeader>

      <section class="content-container">
        <div class="backend-pages">
          <DashboardNav></DashboardNav>

          <div class="edit-profile-wrapper">
            <div class="form-group w-50">
              <input
                type="text"
                class="form-control"
                placeholder="Nickname"
                v-model="userInfo.nickname"
              />
            </div>
            <div class="form-group w-50">
              <input
                type="text"
                class="form-control"
                placeholder="Profile Handle"
                v-model="userInfo.handle"
              />
            </div>
            <div class="row align-items-center date-clm">
              <div class="col">
                <div class="form-group">
                  <select
                    class="form-control custom-dropdown"
                    v-model="userInfo.surname"
                  >
                    <option selected="true" value="">Surname</option>
                    <option value="1">Mr.</option>
                    <option value="2">Mrs.</option>
                    <option value="3">Ms.</option>
                  </select>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="First Name"
                    v-model="userInfo.firstName"
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Last Name"
                    v-model="userInfo.lastName"
                  />
                </div>
              </div>
            </div>

            <div class="form-group w-50">
              <input
                type="email"
                class="form-control"
                placeholder="Email"
                v-model="userInfo.email"
                readonly
              />
            </div>
            <div class="form-group w-50">
              <input
                type="password"
                class="form-control"
                placeholder="Change Password"
                v-model="userInfo.changedPassword"
              />
            </div>

            <div class="state-row">
              <div class="form-group w-50">
                <select
                  v-model="userInfo.country"
                  @change="countryChanged"
                  class="form-control custom-dropdown"
                >
                  <option class="form-control" selected value="">
                    Select Your Country
                  </option>
                  <option
                    v-for="(country, index) in countries"
                    :key="index"
                    :value="country.id"
                  >
                    {{ country.name }}
                  </option>
                </select>
              </div>
              <div class="form-group w-50 mb-50">
                <select
                  v-model="userInfo.state"
                  class="form-control custom-dropdown"
                  @change="stateChanged"
                >
                  <option class="form-control" selected value="">
                    Select Your State
                  </option>
                  <option
                    v-for="(st, index) in stateData"
                    :key="index"
                    :value="st.id"
                  >
                    {{ st.name }}
                  </option>
                </select>
              </div>
              <div class="form-group w-50 mb-50">
                <select
                  v-model="userInfo.city"
                  class="form-control custom-dropdown"
                >
                  <option class="form-control" selected value="">
                    Select Your City
                  </option>
                  <option
                    v-for="(city, index) in cityData"
                    :key="index"
                    :value="city.id"
                  >
                    {{ city.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row align-items-center privacy-row">
              <div class="col-md-2 col-6">
                <p class="mb-0">Profile Photo</p>
              </div>
              <div class="col-md-4 col-6">
                <S3FileUpload
                  filedName="proPic"
                  directory="thumbnails"
                  @fileUploaded="fileUploadCallback"
                  class="form-control"
                />
              </div>
            </div>
            <div class="row align-items-center privacy-row">
              <div class="col-md-2 col-6">
                <p class="mb-0">Privacy</p>
              </div>
              <div class="col-md-10 col-6">
                <label class="switch">
                  <input
                    type="checkbox"
                    v-model="userInfo.privacy"
                    class="default"
                  />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
            <div class="row edit-profile justify-content-center">
              <div class="col-md-4 mt-5 text-center">
                <button @click.prevent="saveUserInfo" class="btn-full">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </section>
</template>


<script>
import { mapState, mapGetters } from "vuex";
import S3FileUpload from "../components/S3FileUpload.vue";
import Sidebar from "./../layouts/components/Sidebar";
import UserHeader from "./../layouts/components/UserHeader";
import DashboardNav from "./../layouts/components/DashboardNav";

export default {
  components: {
    S3FileUpload,
    Sidebar,
    UserHeader,
    DashboardNav,
  },
  data() {
    return {
      image: "",
      stateData: [],
      cityData: [],
      userInfo: {
        nickname: "",
        surname: "",
        firstName: "",
        lastName: "",
        email: "",
        handle: "",
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
  created() {
    this.$store.dispatch("getUser")
  },
  mounted() {
    if (this.countries.length < 1) {
      this.$store.dispatch("getCountries");
    }

    // if(this.$route.params.handle) {
    //   this.$store.dispatch("getUser")
    // }
    this.userInfo = {
      nickname: this.user.nickname,
      surname: this.user.surname,
      firstName: this.user.first_name,
      lastName: this.user.last_name,
      email: this.user.email,
      handle: this.user.handle,
      changedPassword: "",
      dob: this.user.dob,
      bio: this.user.bio,
      image: this.user.image,
      country: this.user.country,
      state: this.user.state,
      city: this.user.city,
      privacy: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      countries: (state) => state.global.countries,
    }),
    ...mapGetters([]),
  },
  methods: {
    saveUserInfo() {
      this.$store
        .dispatch("saveUserInfo", this.userInfo)
        .then((response) => {
          if(response.data.status) {
            this.$notify({
              title: "Success!",
              text: response.data.message,
              type: "success",
            });
          }
          this.userInfo.firstName = response.data.data.first_name;
          this.userInfo.lastName = response.data.data.last_name;
          this.userInfo.dob = response.data.data.dob;
          this.userInfo.handle = response.data.data.handle;
          this.$store.dispatch("getUser")
        })
        .catch((err) => {
          this.$notify({
            title: "Error!",
            text: err.message,
            type: "error",
          });
        });
    },
    async countryChanged() {
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
          this.cityData = response.data;
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    },
    fileUploadCallback(data) {
      if (data.url) this.userInfo.image = data.url;
    }
  },
};
</script>
