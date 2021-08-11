<template>
  <section class="product-wrapper">
    <Sidebar></Sidebar>
    <div class="container2">
      <div class="row1 Video-edit-options">
        <div class="left-box">
          <div class="video-wrapper4">
            <video
              class="video4"
              src="//clips.vorwaerts-gmbh.de/VfE_html5.mp4"
              poster="../../assets/images/Group 270.png"
            ></video>
          </div>
          <div class="option-btns">
            <div class="btns-wrapper">
              <button class="plus-btn">
                <img src="../../assets/images/add-playlist-icon.png" />
                <span>ADD TO PLAYLIST</span>
              </button>
              <button class="mic-btn">
                <img src="../../assets/images/microphone1.png" />
                <span>CO-SIGN</span>
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
            <span class="date">MAY 21 2021</span>
            <h1>SECURE THE BAG</h1>
            <p class="p1">JayLoveP ft 100 Grand Gus</p>
            <p class="p2">10 Views</p>
            <p class="p3"><span class="num">13</span> SUPPORTERS</p>
          </div>

          <div class="price-wrapper">
            <p>$6,555.00</p>
            <span>USD</span>
          </div>

          <div class="tip-wrapper">
            <div class="left">
              <div class="tips">
                <p class="select-amnt">Select Tip Amount</p>
                <div class="opts">
                  <button>$0.25</button>
                  <button>$0.50</button>
                  <button>$1.00</button>
                </div>
              </div>
              <div class="tips-enter">
                <span class="span1">Tip what you want</span>
                <button class="amount">$.00</button>
              </div>

              <div class="support-btns">
                <button>PROUND 2 SUPPORT</button>
                <img src="../../assets/images/Icon material-share.png" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row2 video-carousal">
        <div class="discvr">
          <p>
            <span>MORE TO</span><br />
            DISCOVER
          </p>
        </div>
        <div class="carousal-videos">
          <img class="left-arrow" src="../../assets/images/arrow-left.png" />
          <img class="right-arrow" src="../../assets/images/arrow-right.png" />

          <div class="video-box">
            <figure>
              <img src="../../assets/images/pic1.png" />
            </figure>
            <p>Straight Outta Ulaanbaatar</p>
          </div>
          <div class="video-box box1">
            <figure>
              <img src="../../assets/images/pic2.png" />
            </figure>
            <p>Thomas Azier: Hold On Tight</p>
          </div>
          <div class="video-box box1">
            <figure>
              <img src="../../assets/images/pic3.png" />
            </figure>
            <p>The Sensual World</p>
          </div>
          <div class="video-box box1">
            <figure>
              <img src="../../assets/images/pic4.png" />
            </figure>
            <p>Portraits of Sound</p>
          </div>
        </div>
      </div>

      <div class="row3 comments">
        <h3>Comments</h3>

        <div class="add-cmnt">
          <span class="prof-img"></span>
          <input
            type="text"
            class="add-cmnt-inpt"
            placeholder="Add a public comment...."
          />
        </div>

        <div class="coments-sec">
          <div class="comment-box">
            <div class="comment-detail">
              <figure class="img-wrapper">
                <span class="prof-img1"></span>
              </figure>
              <div class="comment-text1">
                <div class="user-name">
                  <span class="span1">Stephen Adams</span>
                  <span class="span2">2 hours ago</span>
                </div>
                <p class="main-comnt">
                  Yes avaliable, please read the description. avliable hooked
                  book 25 pcs. Delivery is only valid on working days on
                  Monday-Friday.
                </p>
                <span class="view-reply"
                  ><img
                    src="../../assets/images/Icon material-keyboard-arrow-down.png"
                  />
                  View 14 replies</span
                >
                <div class="reply-comments">
                  <figure>
                    <span class="prof-img"></span>
                  </figure>
                  <div class="comment-text">
                    <div class="user-name">
                      <span class="span1">Charles Alenna</span>
                      <span class="span2">1 hours ago</span>
                    </div>
                    <p class="reply-cmnt">
                      Yes avaliable, please read the description. avliable
                      hooked book 25 pcs. Delivery is only valid on working days
                      on Monday-Friday.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Sidebar from "./../layouts/components/Sidebar1";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    Sidebar,
    VueperSlides,
    VueperSlide,
  },
  data() {
    return {
      visibleVideosCount: 9,
      playlistInfo: [],
      newUserPlaylist: null,
      playlistChecked: [],
      userPlaylists: [],
    };
  },
  mounted() {
    this.$store.dispatch("getLatestVideos");
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      allVideos: (state) => state.video.latestVideos,
      latestVideos() {
        return this.allVideos.slice(0, this.visibleVideosCount);
      },
      slides() {
        return [
          {
            // title: "Blossoming flower",
            video: {
              url: "//fast.wistia.net/embed/iframe/8nx0eir0wv?stillUrl=https://embed-ssl.wistia.com/deliveries/be30bc869aacf898d3a1b4f538f75382.jpeg?video_still_time=47.65&videoFoam=true&controlsVisibleOnLoad=false&playButton=false&playbar=false&smallPlayButton=false&qualityControl=false&playbackRateControl=false",
            },
          },
        ];
      },
    }),
    ...mapGetters(["isLogged"]),
    currentDate() {
      return moment(new Date()).format("MMMM D, Y");
    },
  },
};
</script>
