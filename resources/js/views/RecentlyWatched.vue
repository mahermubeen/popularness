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
                    <div class="video-row" v-for="(recent, index) in recentlyWatched" :key="index">
                        <div class="img-holder" style="max-height: 156px">
                            <img :src="recent.video.image ? recent.video.image : 'assets/images/thumbnail-img.jpg'" alt="" />
                        </div>
                        <router-link :to="`/video-play/${recent.video.hash_id}`">
                            <a>
                                <div class="video-info" style="max-width:600px">
                                    <h4>{{ recent.video.title }}</h4>
                                    <p>{{ recent.video.description }}</p>
                                </div>
                            </a>
                        </router-link>
                        <div class="views-container">
                            <div class="views">
                                <span class="counts">{{ recent.video.views }}</span>
                                <span class="views-text">Video Views</span>
                            </div>
                            <div class="views">
                                <span class="counts">${{ recent.video.earning_transaction_total && recent.video.earning_transaction_total.length > 1 ? recent.video.earning_transaction_total.total : 0 }}</span>
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
      this.$store.dispatch("getRecentlyWatchedVideos");
  },
  computed: {
    ...mapState({
      recentlyWatched: (state) => state.video.recentlyWatched,
    }),
  },
  methods: {
  },
};
</script>

<style scoped>
.video-info-wrapper {
  min-height: 150px;
}
</style>
