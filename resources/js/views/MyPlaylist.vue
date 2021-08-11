<template>
  <section class="body-container">
    <Sidebar></Sidebar>
    <main class="">
      <div class="profile-banner"></div>

      <UserHeader></UserHeader>

        <section class="content-container">
            <div class="backend-pages">
                <DashboardNav></DashboardNav>

                <div class="playlist-wrapper">
                    <div class="sorting-row">
                        <h4>My Playlist</h4>
                        <div class="sortby">
                            <span>Sort By: </span>
                            <select class="form-control">
                                <option>Most Recent</option>
                                <option>Most Recent</option>
                                <option>Most Recent</option>
                            </select>
                        </div>
                    </div>
                    <div class="playlist-row" v-for="(playlist, index) in myPlaylists" :key="index">
                        <img :src="playlist.thumbnail ? playlist.thumbnail : 'assets/images/video-img.jpg'" :alt="playlist.name" class="thumbnail" />
                        <div class="info">
                            <h2>{{ playlist.name }}</h2>
                            <div class="actions-btns">
                                <router-link :to="'/playlist/update/' + playlist.hash_id"><i class="fas fa-pencil-alt"></i></router-link>
                                <img src="assets/images/share.png" alt="" width="18px">
                                <i class="fas fa-times"></i>
                            </div>
                        </div>

                    </div>
                    <!-- <div class="playlist-row">
                        <img src="assets/images/video-img.jpg" alt="" class="thumbnail" />
                        <div class="info">
                            <h2>Look What You Made Me Do - Official</h2>
                            <div class="actions-btns">
                                <i class="fas fa-pencil-alt"></i>
                                <img src="assets/images/share.png" alt="" width="18px">
                                <i class="fas fa-times"></i>
                            </div>
                        </div>

                    </div>
                    <div class="playlist-row">
                        <img src="assets/images/video-img.jpg" alt="" class="thumbnail" />
                        <div class="info">
                            <h2>Look What You Made Me Do - Official</h2>
                            <div class="actions-btns">
                                <i class="fas fa-pencil-alt"></i>
                                <img src="assets/images/share.png" alt="" width="18px">
                                <i class="fas fa-times"></i>
                            </div>
                        </div>

                    </div>
                    <div class="playlist-row">
                        <img src="assets/images/video-img.jpg" alt="" class="thumbnail" />
                        <div class="info">
                            <h2>Look What You Made Me Do - Official</h2>
                            <div class="actions-btns">
                                <i class="fas fa-pencil-alt"></i>
                                <img src="assets/images/share.png" alt="" width="18px">
                                <i class="fas fa-times"></i>
                            </div>
                        </div>

                    </div> -->
                </div>

            </div>
        </section>
    </main>
</section>
</template>

<script>
import { mapState } from "vuex";
import Sidebar from "./../layouts/components/Sidebar";
import UserHeader from "./../layouts/components/UserHeader";
import DashboardNav from "./../layouts/components/DashboardNav";

export default {
  components: {
    Sidebar,
    UserHeader,
    DashboardNav,
  },
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
