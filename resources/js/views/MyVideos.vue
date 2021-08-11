<template>
  <section class="body-container">
    <Sidebar></Sidebar>
    <main class="">
        <div class="profile-banner"></div>

        <UserHeader></UserHeader>

        <section class="content-container">
            <div class="backend-pages">
                <DashboardNav></DashboardNav>

                <div class="my-videos-wrapper">
                    <div class="video-row" v-for="(video, index) in myVideos" :key="index">
                      <router-link :to="`/video-play/${video.hash_id}`">
                        <div class="img-holder" style="max-height: 156px">
                            <img class="video-img" :src="video.image ? video.image : 'assets/images/thumbnail-img.jpg'" alt="" />
                        </div>
                      </router-link>
                        <a>
                            <div class="video-info" style="max-width:600px">
                                <h4>
                                  <router-link :to="`/video-play/${video.hash_id}`">
                                  {{ video.title }}
                                  </router-link>
                                  <span>
                                    <button
                                      style="background: black; border: none"
                                      tooltip="Edit Video Info"
                                      @click.prevent="videoUpdate(video.hash_id)"
                                      >
                                      <img src="assets/images/edit-icon.png" style="border-radius: 50%;"/>
                                    </button>
                                  </span>
                                </h4>
                                <p>{{ video.description }}</p>
                            </div>
                        </a>
                        <div class="views-container">
                            <div class="views">
                                <router-link :to="`/video-analytics/${video.hash_id}`"><span class="counts">{{ video.views }}</span></router-link>
                                <span class="views-text">Video Views</span>
                            </div>
                            <div class="views">
                                <span class="counts">${{ video.earning_transaction_total.length > 1 ? video.earning_transaction_total.total : 0 }}</span>
                                <span class="views-text">Tips Earned</span>
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
    videoUpdate(hashId) {
      this.$router.push("video-update/" + hashId);
    },
  },
};
</script>

<style scoped>
.video-info-wrapper {
  min-height: 150px;
}
</style>
