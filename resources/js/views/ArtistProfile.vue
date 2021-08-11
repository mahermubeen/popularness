<template>
  <section class="body-container">
    <Sidebar></Sidebar>
    <main class="">
      <div class="profile-banner"></div>

      <!-- <UserHeader></UserHeader> -->
      <div class="profile-info">
        <div class="avtar-clm">
          <div class="user-avtar">
            <img :src="userData.image ? userData.image : '/assets/images/avtar-img.jpg'" alt="" />
          </div>
        </div>
        <!-- <div class="clm"> -->
        <div class="clm">
          <h4>{{ userFullName ? userFullName : ''}}</h4>
          <p v-show="userData.city || userData.state || userData.country">
            <i class="fas fa-map-marker-alt"></i>
            {{ (userData.city && userData.city.name) ? (userData.city.name + ',') : 'Miami,'}}
            {{ (userData.state && userData.state.name) ?userData.state.name : 'FL' }}
            {{ (userData.country && userData.country.name) ? userData.country.name : 'USA' }}
          </p>
        </div>
        <!-- <div class="clm"> -->
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
        <div class="clm">
          <a style="cursor: pointer;" class="submit-btn" @click.prevent="shareProfile(userData.handle)">Share Profile</a>
        </div>
      </div>

      <section class="content-container">
        <div class="backend-pages">

          <div class="dashboard-wrapper">
            <div class="bio">
              <h3 class="d-flex mb-4 align-items-center">
                Biography
              </h3>
              <p>{{ userData.bio }}</p>
            </div>
            <div class="row mt-4 total-tip">
              <div class="col-lg-10">
                <div class="bg-color">
                  <h3
                    class="d-flex mb-4 align-items-center justify-content-between"
                  >
                    Videos
                  </h3>

                  <div
                    class="my-videos"
                    v-for="(video, index) in myVideos"
                    :key="index"
                  >
                    <img
                      :src="
                        video.image
                          ? video.image
                          : 'assets/images/video-img.jpg'
                      "
                      alt=""
                      class="video-img"
                    />
                    <!-- <img src="assets/images/video-img.jpg" alt="" class="video-img" /> -->
                    <div class="info">
                      <h4>{{ video.title }}</h4>
                      <div class="icons-wrapper">
                        <div>
                          <img src="assets/images/category-icon.png" alt="" />
                          <span>Category: {{ video.genres_name }}</span>
                        </div>
                        <div>
                          <img src="assets/images/views-icon.png" alt="" />
                          <span>{{ video.views }}</span>
                        </div>
                        <div>
                          <img src="assets/images/publish-icon.png" alt="" />
                          <span>Published On: {{ video.published_at }}</span>
                        </div>
                        <div>
                          <i class="fa fa-money-bill"></i>
                          <span
                            >Tips Earned: ${{
                              video.earning_transaction_total && video.earning_transaction_total.length > 1
                                ? video.earning_transaction_total.total
                                : 0
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="ml-auto">
                      <router-link :to="`/video-play/${video.hash_id}`"
                        ><a class="btn-default green-btn"
                          >Details</a
                        ></router-link
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </section>
</template>

<script>
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
      userData: {},
      myVideos: [],
      bioEditMode: false,
    };
  },
  computed: {
    userFullName() {
      return this.userData.first_name + ' ' + this.userData.last_name
    }
  },
  mounted() {
    let artistHandle = this.$route.params.handle || null
    if(!artistHandle) {
      this.$router.push('/');
      return
    }
    this.getArtistInfo();
  },
  methods: {
    getArtistInfo() {
      this.$nextTick(() => {
        this.$store
        .dispatch("getArtistInfo", { userId: this.$route.params.handle })
        .then((response) => {
          if(response.status) {
            this.userData = response.data;
            this.myVideos = response.data.videos
          } else {
            this.$router.replace({ name: "welcome" });
          }
        })
        .catch((err) => {
          if (err.status === 401) {
            this.$router.replace({ name: "login" });
          }
          // alert(err.message);
        });
      })
    },
    clearUser() {
      this.userData = null;
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
  },
};
</script>
