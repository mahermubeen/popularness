<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-9">
        <div class="card">
          <div class="card-header">My Playlists</div>
          <div class="card-body">
            <div
              class="row"
              v-for="(playlist, index) in myPlaylists"
              :key="index"
            >
              <div class="col-md-2 video-info-wrapper">
                <img :src="playlist.thumbnail" :alt="playlist.name" />
              </div>
              <div class="col-md-5 px-auto">
                <h4>{{ playlist.name }}</h4>
                <span>
                  <a href="#">Edit</a>
                  <a href="#">Share</a>
                  <a href="#">Delete</a>
                </span>
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
    this.$store.dispatch("getMyPlaylists");
  },
  computed: {
    ...mapState({
      myPlaylists: (state) => state.playlist.myPlaylists,
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
