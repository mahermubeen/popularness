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
            <div class="video-upload-wrapper" v-if="overLimit">
              <div class="video-options-clm">
                <div class="video-options" style="padding: 20px 80px;">
                  <h3>{{ overLimitMessage }}</h3>
                </div>
              </div>
            </div>
            <div class="video-upload-wrapper" v-if="!overLimit">
              <div class="upload-clm">
                <!-- Our markup, the important part here! -->
                <div id="drag-and-drop-zone" class="dm-uploader p-3">
                  <div
                    id="wistia_uploader"
                    style="
                      height: 360px;
                      width: 640px;
                      margin: 0 auto !important;
                    "
                  ></div>
                </div>
                <!-- /uploader -->
              </div>

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
                              <option
                                v-for="(genre, index) in genres"
                                :key="index"
                                :value="genre.id"
                                >{{ genre.genre }}</option
                              >
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
                      <div class="col-md-6">
                        <h4>Video thumbnail</h4>
                        <div class="video-thumbnails" v-if="thumbnails.length">
                          <div
                            :class="
                              `thumbnail ${
                                index == activeThumb ? 'active' : ''
                              }`
                            "
                            v-for="(thumb, index) in thumbnails"
                            :key="index"
                            @click="changeThumbnail(index)"
                          >
                            <img :src="thumb" alt="Thumbnail" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row upload-video-btn" v-if="!overLimit">
              <div class="col-md-4">
                <button class="btn-full mt-5" @click.prevent="saveVideoInfo">
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
    DashboardNav
  },
  data() {
    return {
      video: "",
      projectId: "",
      activeThumb: 0,
      videoInfo: {
        url: "",
        title: "",
        artist: "",
        genre: "",
        directedBy: "",
        producedBy: "",
        label: "",
        composers: "",
        wistia: {
          id: null,
          thumbnail: {
            url: ""
          }
        },
        type: "",
        size: "",
        description: ""
      },
      thumbnails: [],
      userData: {},
      overLimit: false,
      overLimitMessage: ""
    };
  },
  mounted() {
    this.checkVideoLimits();

    if (this.genres.length < 1) {
      this.$store.dispatch("getGenres");
    }
    this.userData = this.user.user;

    let wistiaAccessToken = process.env.MIX_WISTIA_API_KEY;
    let projectId = this.userData.project_id;
    let self = this;

    window._wapiq = window._wapiq || [];
    _wapiq.push(function(W) {
      window.wistiaUploader = new W.Uploader({
        accessToken: wistiaAccessToken,
        dropIn: "wistia_uploader",
        projectId: projectId,

        //onBeforeUnload: false
        beforeUpload: function(file) {
          let mediaSize = file.size;
          return new Promise(function(resolve, reject) {
            let checkingStatus = true;
            resolve();
          });
        }
      });

      wistiaUploader.bind("uploadcancelled", function(file) {
        console.log("We are no longer uploading " + file.name);
        self.$notify({
          title: "Error!",
          text: "We are no longer uploading " + file.name,
          type: "error"
        });
      });

      wistiaUploader.bind("uploadsuccess", function(file, media) {
        self.videoInfo.title = file.name;
        self.videoInfo.type = file.file.data.type;
        self.videoInfo.size = file.file.data.size;
        self.videoInfo.video = media.url;
        self.videoInfo.url = media.url;
        self.videoInfo.wistia.id = media.id;
        // self.videoInfo.wistia.thumbnail.url = media.thumbnail.url;

        self.setThumbnails(media.originalUrl, media.attributes.duration, 5);

        self.saveVideoInfo(true);

        // self.$notify({
        //     title: "Success!",
        //     text: "Video Uploaded successfully!",
        //     type: "success",
        //   });
      });

      wistiaUploader.bind("uploadfailed", function(file, errorResponse) {
        self.$notify({
          title: "Error!",
          text: "Upload failed with response: " + errorResponse.error,
          type: "error"
        });
        console.log("upload failed:", errorResponse.error);
      });
      wistiaUploader.bind("uploadembeddable", function(
        file,
        media,
        embedCode,
        oembedResponse
      ) {
        wistiaUploader.removePreview();
      });
    });
  },
  computed: {
    ...mapState({
      user: state => state.user,
      genres: state => state.video.genres
    })
  },
  methods: {
    checkVideoLimits() {
      this.$store
        .dispatch("checkVideoLimits")
        .then(res => {
          if (res.status && res.status != "success") {
            this.overLimit = true;
            this.overLimitMessage = res.message;
            return 0
          }
        })
        .catch(err => {
          if (err.status === 401) {
            // console.log(err.message);
            this.$router.replace({ name: "login" });
          }
          // alert(err.message);
        });
    },
    saveVideoInfo(videoUploaded = false) {
      if (!this.videoInfo.wistia.id) {
        console.log("no");
        this.$notify({
          title: "Error!",
          text: "Please finish the video upload first!",
          type: "error"
        });
        return;
      } else {
        this.$store
          .dispatch("saveVideoInfo", this.videoInfo)
          .then(response => {
            if (!response.status || response.status == "error") {
              this.$notify({
                title: "Error!",
                text: response.message,
                type: "error"
              });
            } else {
              this.$notify({
                title: "Success!",
                text: response.message,
                type: "success"
              });
            }
            this.resetForm(false);
          })
          .catch(err => {
            if (err.status === 401) {
              this.$router.replace({ name: "login" });
            }
          });
      }
    },
    showLog(data) {
      console.log(data);
    },
    resetForm(uploadCallbackData = null) {
      this.videoInfo = {
        url: "",
        title: uploadCallbackData.title || "",
        artist: "",
        genre: "",
        directedBy: "",
        producedBy: "",
        label: "",
        composers: "",
        wistia: {
          id: uploadCallbackData.wistia.id || "",
          thumbnail: {
            url: uploadCallbackData.wistia.thumbnail.url
          }
        },
        type: "",
        size: "",
        description: ""
      };
    },

    setThumbnails(mediaUrl, duration, count = 4) {
      duration = Math.floor(duration);
      mediaUrl = mediaUrl.replace(".bin", ".jpg");
      this.thumbnails = [];
      for (let m = 10; m <= duration; m += 10) {
        if (count > 0) {
          this.thumbnails.push(mediaUrl + "?video_still_time=" + m);
          count -= 1;
        }
      }
      if (this.thumbnails.length > 0) {
        this.videoInfo.wistia.thumbnail.url = this.thumbnails[0];
      }
    },
    changeThumbnail(index) {
      this.activeThumb = index;
      this.videoInfo.wistia.thumbnail.url = this.thumbnails[index];
      console.log(this.videoInfo.wistia.thumbnail.url);
    }
  }
};
</script>
