<template>
  <section class="body-container">
    <Sidebar></Sidebar>
    <main class="">
      <section class="content-container">
        <div class="backend-pages">
          <section class="content-container video-main-container">
            <div class="video-play-container">
              <div class="video-thumbnail" v-if="videoDetails">
                <img :src="thumbnail" alt="" class="video-thumbnail" />
                <div class="video-info">
                  <h4>
                    {{ videoDetails.title }}
                    <a href="#" class="info-icon" data-toggle="dropdown">
                      <img src="../../assets/images/info-icon.png" alt=""  style="border-radius: 50%;"/>
                      <div class="dropdown-menu">
                        <li>Directed by: {{ videoDetails.director }}</li>
                        <li>Composers: {{ videoDetails.composers }}</li>
                        <li>Producer: {{ videoDetails.producer }}</li>
                        <li>{{ videoDetails.recordlabel }}</li>
                      </div>
                    </a>
                  </h4>
                  <p>
                    <router-link :to="`/profile/${videoDetails.user.handle}`"
                      ><a>{{ videoDetails.artistname }}</a></router-link
                    >
                  </p>
                  <p class="views">{{ videoDetails.views }} Views</p>
                </div>
              </div>

              <div class="container-fluid">
                <div class="row mt-1 recommended-videos" style="border-bottom: 5px solid #FFA472; padding-bottom: 10px;">
                  <div class="col-lg-8">
                    <div class="video-play-section justify-content-center">
                      <div class="video-container justify-content-center">
                        <div class="video-thumbnail" v-if="videoDetails">
                          <div
                            :class="`wistia-player-container wistia_embed wistia_async_${videoDetails.hash_id}`"
                            :style="`width:100%;aspect-ratio:${playerAR};max-height:400px;`"
                          >
                            &nbsp;
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="share-icons">
                        <button @click="showModal">
                            <span class="icon-holder">
                                <img src="../../assets/images/add-playlist-icon.png" alt="" />
                            </span> Add To Playlist
                        </button>
                        <button>
                            <span class="icon-holder">
                                <img src="../../assets/images/microphone.png" alt="" />
                            </span> Co-Sign
                        </button>
                        <button @click="copyUrl">
                            <span class="icon-holder">
                                <img src="../../assets/images/share.png" alt="" />
                            </span> Copy Link
                        </button>
                    </div>
                  </div>

                  <div class="col-lg-4">
                    <div class="video-play-section justify-content-center" style="height:400px">
                      <div class="video-info">
                        <h2>{{ supporterCount }} Supporter(s)</h2>
                        <h3>${{ videoEarnings }} USD</h3>
                        <h5 class="mt-auto">Select a Tip Amount</h5>
                        <div class="select-amount">
                            <label>
                                <input type="radio" name="package" checked v-model="tip" :value="fixedTips.min" @click="showCustomTipInput = false; customTip = ''"/>
                                <span class="checkmark"></span>
                                ${{ fixedTips.min }}
                            </label>
                            <label>
                                <input type="radio" name="package" v-model="tip" :value="fixedTips.average" @click="showCustomTipInput = false; customTip = ''"/>
                                <span class="checkmark"></span>
                                ${{ fixedTips.average }}
                            </label>
                            <label>
                                <input type="radio" name="package" v-model="tip" :value="fixedTips.max" @click="showCustomTipInput = false; customTip = ''"/>
                                <span class="checkmark"></span>
                                ${{ fixedTips.max }}
                            </label>
                            <label>
                                <input type="radio" v-model="tip" :value="fixedTips.custom" @click="showCustomTipInput = true"/>
                                <span class="checkmark"></span>
                                Custom
                            </label>
                        </div>
                        <div class="custom-value" v-if="showCustomTipInput">
                            <img src="../../assets/images/dollar-icon.png" alt="" />
                            <input type="number" class="fld" v-model="customTip" value=""/>
                        </div>
                        <button class="btn-full mt-auto" @click.prevent="processTip">PROUD 2 SUPPORT</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mt-1 recommended-videos">
                  <div class="col-lg-8">
                    <Disqus shortname='popularness' style="margin-top:50px" />
                  </div>

                  <div class="col-lg-4">
                    <div class="recommended-list" style="margin-top:35px">
                      <h3>MORE TO DISCOVER</h3>
                      <ul class="video-list">
                        <li v-for="(vid, index) in suggestedVideos" :key="index">
                          <div class="img-holder">
                            <img :src="JSON.parse(vid.wistia).thumbnail.url|| thumbnail" alt="" />
                          </div>
                          <div class="info">
                              <a :href="`/video-play/${vid.hash_id}`"><h4>{{ vid.title }}</h4></a>
                            <h5>{{ vid.artistname || 'Unknown' }}</h5>
                            <span class="view">
                              <span class="pr-1"><i class="fa fa-eye"></i></span>
                              <span>{{ vid.views ? vid.views : 0 }}</span>
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      
      <modal name="addToPlaylistModal" width="200px" height="auto">
        <section class="content-container" style="height:100%; background-color: #333">
              <form>
                <h4>Select Playlist</h4>
                <ul>
                  <li v-for="(upl, index) in userPlaylists" :key="index">
                    <input
                      type="checkbox"
                      class="form-control playlist-item"
                      v-model="playlistChecked"
                      :value="upl.id"
                    /><span class="playlist-item-span">{{ upl.name }}</span>
                  </li>
                </ul>
                <div class="edit-profile-wrapper">
                  <div class="form-group">
                    <h4>Or Create New</h4>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="New Playlist Name"
                      v-model="newUserPlaylist"
                    />
                  </div>
                </div>
                <div class="row edit-profile justify-content-center">
                    <div class="col-md-8 text-center">
                      <button @click.prevent="savePlaylistInfo" class="btn-full">
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </form>
        </section>
      </modal>
    </main>
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Sidebar from "./../layouts/components/Sidebar";
import UserHeader from "./../layouts/components/UserHeader";
import { Disqus } from "vue-disqus";

export default {
  components: {
    Sidebar,
    UserHeader,
    Disqus
  },
  data() {
    return {
      playerAR: 1.78,
      showCustomTipInput: false,
      customTip: "",
      tip: "",
      image: "",
      videoDetails: null,
      thumbnail: "",
      suggestedVideos: [],
      playlistInfo: [],
      newUserPlaylist: null,
      playlistChecked: [],
      userPlaylists: [],
      videoEarnings: "",
      supporterCount: 0,
      fixedTips: {
        min: 0.25,
        average: 0.5,
        max: 1.0
      }
    };
  },
  created() {
    let hashId = this.$route.params.hashId;
    this.getVideoDetails(hashId);
    if (this.isLogged) {
      this.getMyPlaylists();
      this.getPlaylistAssociations(this.$route.params.hashId);
    }
  },
  mounted() {
    let self = this;
    window._wq = window._wq || [];

    // target our video by the first 3 characters of the hashed ID
    _wq.push({
      id: self.$route.params.hashId,
      onReady: function(video) {
        // at 10 seconds, do something amazing
        self.playerAR = video.aspect();
        video.bind("secondchange", function(s) {
          if (s === 5) {
            // Insert code to do something amazing here
            console.log("We just reached " + s + " seconds!");
            self.updateVideoStats();
          }
        });
      }
    });
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    ...mapGetters(["isLogged"])
  },
  methods: {
    showModal() {
      if (this.isLogged) {
        this.$modal.show("addToPlaylistModal");
      } else {
        this.$notify({
          title: "Error!",
          text: "Please log in first!",
          type: "error"
        });
        this.$router.push({ name: "login" });
      }
    },
    copyUrl() {
      let tempInput = document.createElement("input");
      tempInput.value =
        process.env.MIX_APP_URL + "video-play/" + this.$route.params.hashId;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      this.$notify({
        title: "Success!",
        text: "Share link is copied! You can paste the link and share now!",
        type: "success"
      });
    },
    playlistSelected() {
      console.log(this.playlistChecked);
    },
    getVideoDetails(hashId) {
      this.$store
        .dispatch("getVideoDetails", { hashId: hashId })
        .then(response => {
          if (!response.status) {
            this.$notify({
              title: "Error!",
              text: "Video Information Not Found",
              type: "error"
            });
          }
          this.videoDetails = response.data;
          this.fixedTips = {
            min: response.policies.min_amount || 0.25,
            average: response.policies.mid_amount || 0.5,
            max: response.policies.max_amount || 1.0
          };
          this.suggestedVideos = response.suggested;
          this.thumbnail =
            JSON.parse(response.data.wistia).thumbnail.url ||
            response.data.wistia.thumbnail.url;
          this.videoEarnings =
            response.data.earning_transaction_total.length > 0
              ? response.data.earning_transaction_total[0].total
              : 0;
          this.supporterCount =
            response.data.earning_transaction_total.length > 0
              ? response.data.earning_transaction_total[0].supporter_count
              : 0;
        })
        .catch(err => {
          this.$notify({
            title: "Error!",
            text: err.message,
            type: "error"
          });
        });
    },
    getMyPlaylists(hashId) {
      this.$store
        .dispatch("getMyPlaylists", { hashId: hashId })
        .then(response => {
          if (!response.status) {
            this.$notify({
              title: "Error!",
              text: "Video Information Not Found",
              type: "error"
            });
          }
          this.userPlaylists = response.data;
        })
        .catch(err => {
          this.$notify({
            title: "Error!",
            text: err.message,
            type: "error"
          });
        });
    },
    savePlaylistInfo() {
      this.$store
        .dispatch("savePlaylist", {
          playlistIds: this.playlistChecked,
          newPlaylist: this.newUserPlaylist,
          videoId: this.videoDetails.id
        })
        .then(response => {
          if (response.data.status) {
            this.$notify({
              title: "Success!",
              text: response.data.message,
              type: "success"
            });
            this.$store.dispatch("getMyPlaylists");
            this.$modal.hide("addToPlaylistModal");
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
    getPlaylistAssociations() {
      this.$store
        .dispatch("getPlaylistAssociations", {
          hashId: this.$route.params.hashId
        })
        .then(response => {
          this.playlistChecked = Object.keys(response.data.data);
        })
        .catch(err => {
          this.$notify({
            title: "Error!",
            text: err.message,
            type: "error"
          });
        });
    },
    updateVideoStats() {
      this.$store
        .dispatch("updateVideoStats", {
          id: this.videoDetails.id,
          hashId: this.$route.params.hashId
        })
        .then(response => {
          if (response.status) {
            console.log("Video Stats Updated!");
          } else {
            console.log("Video Stats not Updated!");
          }
        })
        .catch(err => {
          console.error(err.message);
        });
    },
    processTip() {
      let amount = this.customTip || this.tip;

      if (!amount) {
        this.$notify({
          title: "Error!",
          text: "Please enter a valid amount!",
          type: "error"
        });
        return;
      }

      this.$store
        .dispatch("processVideoTip", {
          videoId: this.videoDetails.id,
          amount: amount
        })
        .then(response => {
          if (response.data.status) {
            this.$notify({
              title: "Success!",
              text: response.message,
              type: "success"
            });
            this.tip = "";
            this.customTip = "";
          } else {
            this.$notify({
              title: "Error!",
              text: response.data.message,
              type: "error"
            });
          }
        })
        .catch(err => {
          console.error(err.message);
        });
    }
  }
};
</script>
<style scoped>
.playlist-item {
  display: inline-block;
  width: auto;
  height: auto;
}
.playlist-item-span {
  /* font-family: "futura-light"; */
  color: #fff;
  display: inline-block;
  align-items: center;
  justify-content: space-between;
  background: none;
  padding-left: 10px;
  font-weight: 600;
  font-size: 14px;
  position: relative;
}
.playlist-item-span:hover {
  color: #ffa472;
}
.video-play-container .video-play-section .video-info {
  flex: auto;
}
@supports not (aspect-ratio: 1.78) {
  .wistia-player-container::before {
    float: left;
    padding-top: 100%;
    content: "";
  }

  .wistia-player-container::after {
    display: block;
    content: "";
    clear: both;
  }
}
</style>