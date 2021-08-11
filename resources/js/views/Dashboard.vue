<template>
  <section class="body-container">
    <Sidebar></Sidebar>
    <main class="">
      <div class="profile-banner"></div>

      <UserHeader></UserHeader>

      <section class="content-container">
        <div class="backend-pages">
          <DashboardNav></DashboardNav>

          <div class="dashboard-wrapper">
            <div class="bio">
              <h3 class="d-flex mb-4 align-items-center">
                Biography
                <span class="pointer">
                  <button
                    style="background: black; border: none"
                    v-if="bioEditMode"
                    @click.prevent="toggleBioEditMode"
                  >
                    <img
                      src="assets/images/edit-icon.png"
                      style="border-radius: 50%"
                    />
                  </button>
                  <button
                    style="background: black; border: none"
                    v-else
                    @click.prevent="toggleBioEditMode"
                  >
                    <img
                      src="assets/images/edit-icon.png"
                      style="border-radius: 50%"
                    />
                  </button>
                </span>
              </h3>
              <p v-if="bioEditMode">
                <textarea v-model="userData.bio" cols="150" rows="5">
                </textarea>
              </p>
              <p v-else>{{ userData.bio }}</p>
            </div>
            <div class="row mt-4 total-tip">
              <div class="col-lg-10">
                <div class="bg-color">
                  <h3
                    class="
                      d-flex
                      mb-4
                      align-items-center
                      justify-content-between
                    "
                  >
                    My Videos
                    <i class="fas fa-ellipsis-h"></i>
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
                              video.earning_transaction_total.length > 1
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
import { mapState, mapGetters } from "vuex";
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
      bioEditMode: false,
    };
  },
  mounted() {
    this.getUser();
    this.$store.dispatch("getMyVideos");
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      myVideos: (state) => state.video.myVideos,
    }),
    // ...mapGetters(['userHasFavouriteGenres']),
  },
  methods: {
    getUser() {
      this.$store
        .dispatch("getUser")
        .then((response) => {
          this.userData = response.data;

          // TODO::Need to optimize below code-block
          if (
            !response.data.favourite_genres ||
            JSON.parse(response.data.favourite_genres).length < 1
          ) {
            this.$router.replace({ name: "fan-genres" });
            this.$notify({
              title: "Warning!",
              text: "Please select your favourite genres!",
              type: "warning",
            });
          }
        })
        .catch((err) => {
          if (err.status === 401) {
            // console.log(err.message);
            this.$router.replace({ name: "login" });
          }
          // alert(err.message);
        });
    },
    clearUser() {
      this.userData = null;
    },
    toggleBioEditMode() {
      if (this.bioEditMode) {
        this.$store
          .dispatch("updateBio", { bio: this.userData.bio })
          .then((response) => {
            this.$notify({
              title: "Success!",
              text: "Biography Updated Successfully!",
              type: "success",
            });
          })
          .catch((err) => {
            if (err.response.status === 401) {
              this.$router.replace({ name: "login" });
            }
          });
      }
      this.bioEditMode = !this.bioEditMode;
    },
  },
};
</script>
