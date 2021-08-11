<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">My Videos</div>
          <div class="card-body">
            <div class="row" v-for="(video, index) in myVideos" :key="index">
              <div class="col-md-2 video-info-wrapper">
                <img
                  src="https://popularness-static.s3.amazonaws.com/thumbnails/9409819731676112.jpeg"
                  alt=""
                />
              </div>
              <div class="col-md-8">
                <h2>{{ video.title }}</h2>
                <p>{{ video.description }}</p>
              </div>
              <div class="col-md-2">
                <span>Views: {{ video.views }}</span> <br>
                <span>Earnings: {{ video.earning_transaction_total.length > 1 ? video.earning_transaction_total.total : 0 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  mounted() {
    // if (this.myVideos.length < 1) {
      this.$store.dispatch("getMyVideos");
    // }
  },
  computed: {
    ...mapState({
      myVideos: (state) => state.video.myVideos,
    }),
  },
  methods: {
    showLog(data) {
      console.log(data);
    },
  },
};
</script>

<style scoped>
.video-info-wrapper {
  min-height: 150px;
}
</style>
