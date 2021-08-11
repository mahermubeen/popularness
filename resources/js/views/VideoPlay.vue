<template>
  <section class="product-wrapper">
    <Sidebar></Sidebar>
    <div class="container2">
      <div v-if="videoDetails" class="row1 Video-edit-options">
        <div class="left-box">
          <div class="video-wrapper4">
            <div
              class="wistia_responsive_padding"
              style="padding:56.25% 0 0 0;position:relative;"
            >
              <div
                class="wistia_responsive_wrapper"
                style="height:100%;left:0;position:absolute;top:0;width:100%;"
              >
                <div
                  :class="
                    `wistia-player-container wistia_embed wistia_async_${videoDetails.hash_id} seo=false videoFoam=true`
                  "
                  style="height:100%;width:100%"
                >
                  &nbsp;
                </div>
              </div>
            </div>
          </div>
          <div class="option-btns">
            <div class="btns-wrapper">
              <button class="plus-btn" @click="showModal">
                <img src="../../assets/images/add-playlist-icon.png" />
                <span>ADD TO PLAYLIST</span>
              </button>
              <button class="mic-btn" @click="addCoSign">
                <span class="pr-3">
                  ({{ videoDetails.favourite_video_count }})
                </span>
                <img src="../../assets/images/microphone1.png" />
                <span>CO-SIGN</span>
                <span v-if="isFavouriteVideo" class="pl-3">&check;</span>
              </button>
            </div>
          </div>
        </div>
        <div class="right-box">
          <div class="icons">
            <img src="../../assets/images/movie.png" />
            <img src="../../assets/images/cd.png" />
          </div>

          <div class="video-info">
            <span class="date">{{ videoPublishDate }}</span>
            <h1>{{ videoDetails.title }}</h1>
            <p class="p1">{{ videoDetails.artistname }}</p>
            <p class="p2">{{ videoDetails.views }} Views</p>
            <p class="p3"><span class="num">{{ supporterCount }}</span> SUPPORTERS</p>
          </div>

          <div class="price-wrapper">
            <p>${{ videoEarnings }}</p>
            <span>USD</span>
          </div>

          <div class="tip-wrapper">
            <div class="left">
              <div class="tips">
                <p class="select-amnt">Select Tip Amount</p>
                <div class="opts">
                  <button @click="showCustomTipInput = false; customTip = ''; tip = fixedTips.min">${{ fixedTips.min }}</button>
                  <button @click="showCustomTipInput = false; customTip = ''; tip = fixedTips.average">${{ fixedTips.average }}</button>
                  <button @click="showCustomTipInput = false; customTip = ''; tip = fixedTips.max">${{ fixedTips.max }}</button>
                </div>
              </div>
              <div class="tips-enter">
                <span class="span1">Tip what you want</span>
                <input type="number" class="amount" placeholder="$*.00" v-model="customTip">
              </div>

              <div class="support-btns">
                <button @click.prevent="processTip">PROUD 2 SUPPORT</button>
                <img src="../../assets/images/Icon material-share.png" @click="copyUrl"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row2 video-carousal" v-if="suggestedVideos && suggestedVideos.length > 0">
        <div class="discvr">
          <p>
            <span>MORE TO</span><br />
            DISCOVER
          </p>
        </div>
        <div class="carousal-videos">
          <img class="left-arrow" src="../../assets/images/arrow-left.png" />
          <img class="right-arrow" src="../../assets/images/arrow-right.png" />

          <div class="video-box" v-for="(vid, index) in suggestedVideos" :key="index">
            <figure>
              <img style="max-height: 145px;" :src="JSON.parse(vid.wistia).thumbnail.url || thumbnail" />
            </figure>
            <router-link :to="`/video-play/${vid.hash_id}`">
              <p>{{ vid.title }}</p>
            </router-link>
          </div>
        </div>
      </div>

      <div class="row3 comments">
        <h3>Comments</h3>
        <Disqus shortname='popularness' style="margin-top:50px" />
      </div>
    </div>
    
    <modal name="addToPlaylistModal" width="200px" height="auto">
        <section class="content-container" style="height:100%; background-color: #333">
              <form>
                <h4>Select Playlist</h4>
                <ul>
                  <li v-for="(upl, index) in userPlaylists" :key="index">
                    <input
                      type="checkbox"
                      class="form-control"
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
  </section>
</template>

<script>
import Sidebar from "./../layouts/components/Sidebar1";
import { Disqus } from "vue-disqus";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    Sidebar,
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
      userFavourites: [],
      videoEarnings: "",
      supporterCount: 0,
      fixedTips: {
        min: 0.25,
        average: 0.5,
        max: 1.0
      },
      isFavouriteVideo:false
    };
  },
  created() {
    let hashId = this.$route.params.hashId;
    this.getVideoDetails(hashId);
    if (this.isLogged) {
      this.getMyPlaylists();
      this.getPlaylistAssociations(this.$route.params.hashId);
      this.$store.dispatch("getUser");
    }
  },
  mounted() {
    let self = this;
    window._wq = window._wq || [];

    // target our video by the first 3 characters of the hashed ID
    _wq.push({
      id: self.$route.params.hashId,
      onReady: function(video) {
        // var myElem = document.createElement("img");
        // myElem.setAttribute('src', process.env.MIX_APP_URL + "assets/images/logo-orange.png")
        // myElem.setAttribute('width', '150')
        // myElem.setAttribute('style', 'margin:10px 5px;')
        // video.grid.right_inside.appendChild(myElem);
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
    ...mapGetters(["isLogged"]),
    videoPublishDate() {
      let publishDate =
        this.videoDetails && this.videoDetails.publish_date
          ? this.videoDetails.publish_date
          : this.videoDetails.created_at;
      return moment(publishDate).format("MMMM D, Y");
    },
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

          if(this.isLogged && this.user.user.favourite_video_ids.includes(this.videoDetails.id)) this.isFavouriteVideo = true
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
    },
    addCoSign() {
      if (this.isLogged) {
        this.supporterCount += 1;
        this.$store
          .dispatch("addToFavourite", { videoId: this.videoDetails.id })
          .then(res => {
            if(res.status) {
              this.$store.dispatch('getUser')
              this.getVideoDetails(this.$route.params.hashId)
              this.isFavouriteVideo = !this.isFavouriteVideo
              this.$notify({
                title: "Success!",
                text: res.message,
                type: "success"
              });
            } else {
              this.$notify({
                title: "Error!",
                text: res.me,
                type: "error"
              });
            }
          });
      } else {
        this.$notify({
          title: "Error!",
          text: "Please log in first!",
          type: "error"
        });
        this.$router.push({ name: "login" });
      }
    }
  }
};
</script>
