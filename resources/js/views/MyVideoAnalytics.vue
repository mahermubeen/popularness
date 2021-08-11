<template>
  <section class="body-container">
    
    <Sidebar></Sidebar>
    
    <main class="">

        <section class="content-container">
            <div class="about-text">
                <h3 v-if="videoInfo.title">Video Analytics: {{ videoInfo.title }}</h3>
                <ul>
                  <li v-for="(stat, index) in videoStats" :key="index">
                    {{ _.startCase(index) }} : {{ stat }}
                  </li>
                </ul>
            </div>
        </section>
        
    </main>
  </section>
</template>

<script>
import Sidebar from "./../layouts/components/Sidebar";

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      videoInfo: {},
      videoStats: {}
    }
  },
  created() {
    let hashId = this.$route.params.hashId;
    this.getVideoStats(hashId);
  },
  computed:{
       _(){
           return _;
      }
  },
  methods: {
    getVideoStats(hashId) {
      this.$store
        .dispatch("getVideoStats", { hashId: hashId })
        .then((res) => {
          if (res.status) {
            this.videoStats = res.data.stats
            this.videoInfo = res.data.video
            this.$notify({
              title: "Success!",
              text: res.message,
              type: "success",
            });
          } else {
            this.$notify({
              title: "Error!",
              text: res.message,
              type: "error",
            });
          }
        })
        .catch((err) => {
          this.$notify({
              title: "Error!",
              text: err.message,
              type: "error",
            });
        });
      }
  }
};
</script>
