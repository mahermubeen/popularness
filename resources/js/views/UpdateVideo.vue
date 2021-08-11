<template>
  <div>
    <section class="body-container">
      <Sidebar></Sidebar>
      <main class="">
        <div class="profile-banner"></div>
        <UserHeader></UserHeader>
        <section class="content-container">
          <div class="backend-pages">
            <DashboardNav></DashboardNav>

            <div class="video-upload-wrapper">

              <div class="video-options-clm">
                <div class="video-options">
                  <h3>Video Option & Descriptions</h3>
                  <div class="p-4">
                    <div class="row video-options-row">
                      <div class="col-md-6">
                        <div class="info-form">
                          <input
                            type="text"
                            class="form-control"
                            id="title"
                            placeholder="Song Name"
                            v-model="videoInfo.title"
                          />
                          <input
                            type="text"
                            class="form-control"
                            id="artist"
                            placeholder="Featuring"
                            v-model="videoInfo.artist"
                          />
                          <div class="custom-dropdown">
                            <select
                              class="form-control"
                              id="UserPrimaryGenre"
                              v-model="videoInfo.genre"
                            >
                              <option value="">Genre</option>
                              <option v-for="(genre, index) in genres"
                              :key="index" :value="genre.id">{{ genre.genre }}</option>
                            </select>
                          </div>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Directed by:"
                            v-model="videoInfo.directedBy"
                          />
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Produced by:"
                            v-model="videoInfo.producedBy"
                          />
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Label"
                            v-model="videoInfo.label"
                          />
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Composer(s)"
                            v-model="videoInfo.composers"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row upload-video-btn">
              <div class="col-md-4">
                <button class="btn-full mt-5" @click.prevent="updateVideoInfo">
                  Upload Video
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
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
      video: "",
      videoInfo: {}
    };
  },
  created() {
    let hashId = this.$route.params.hashId;
    this.getVideoDetails(hashId);
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      genres: (state) => state.video.genres,
    }),
    ...mapGetters(["userData"])
  },
  methods: {
    updateVideoInfo() {
        this.$store
        .dispatch("updateVideoInfo", this.videoInfo)
        .then((res) => {
          if(res.data.status){
            this.$notify({
              title: "Success!",
              text: res.data.message,
              type: "success",
            });
          this.$router.push({ name: 'my-videos' })
          }
        })
        .catch((err) => {
          if (err.status === 401) {
            this.$router.replace({ name: "login" });
            this.$notify({
              title: "Error!",
              text: err.message,
              type: "error",
            });
          }
        });
    },
    getVideoDetails(hashId) {
      this.$store
        .dispatch("getVideoDetails", { hashId: hashId })
        .then((res) => {
          if (!res.status) {
            this.$notify({
              title: "Error!",
              text: "Video Information Not Found",
              type: "error",
            });
          }
          this.videoInfo = {
              id: res.data.id,
              hash_id: res.data.hash_id,
              title: res.data.title,
              artist: res.data.artistname,
              genre: res.data.genres,
              directedBy: res.data.director,
              producedBy: res.data.producer,
              label: res.data.recordlabel,
              composers: res.data.featuredartist,
            }
        })
        .catch((err) => {
          this.$notify({
              title: "Error!",
              text: err.message,
              type: "error",
            });
        });
    },
  },
};
</script>
