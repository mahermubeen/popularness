<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Dashboard</div>

          <div class="card-body">
            <!-- <div class="row">
              <div class="col-6">
                <button @click.prevent="getUser">Get Info</button>
                <button @click.prevent="clearUser">Clear</button>
              </div>
            </div>
            <div class="row mt-2" v-if="userData">
              <div class="col-4">
                <b>Name</b>:
                {{ userData.first_name + " " + userData.last_name }}
              </div>
              <div class="col-4"><b>Email</b>: {{ userData.email }}</div>
            </div> -->
            <div class="row mt-2">
              <div class="col-12">
                <h4>Biography</h4>
                <p v-if="bioEditMode">
                  <textarea
                    v-model="userData.bio"
                    cols="95"
                    rows="5"
                  ></textarea>
                </p>
                <p v-else>{{ userData.bio }}</p>
                <button v-if="bioEditMode" @click.prevent="toggleBioEditMode">
                  Update
                </button>
                <button v-else @click.prevent="toggleBioEditMode">Edit</button>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-12">
                <h4>My Videos</h4>
                <div
                  class="row mt-2"
                  v-for="(video, index) in myVideos"
                  :key="index"
                >
                  <div class="col-md-2 video-info-wrapper">
                    <img
                      src="https://popularness-static.s3.amazonaws.com/thumbnails/9409819731676112.jpeg"
                      alt=""
                    />
                  </div>
                  <div class="col-md-8">
                    <h3>{{ video.title }}</h3>
                    <div class="row">
                      <div class="col-3">Genre: {{ video.genres_name }}</div>
                      <div class="col-3">Views: {{ video.views }}</div>
                      <div class="col-3">Published On: {{ video.published_at }}</div>
                      <div class="col-3">Tips Earned: {{
                        video.earning_transaction_total.length > 1
                          ? video.earning_transaction_total.total
                          : 0
                      }}</div>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <button class="mt-4">Details</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      userData: {},
      bioEditMode: false,
    };
  },
  mounted() {
    this.getUser();
    this.$store.dispatch("getMyVideos");
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      myVideos: (state) => state.video.myVideos,
    }),
    ...mapGetters([]),
  },
  methods: {
    getUser() {
      this.$store
        .dispatch("getUser")
        .then((response) => {
          this.userData = response.data;
        })
        .catch((err) => {
          alert(err.message);
        });
    },
    clearUser() {
      this.userData = null;
    },
    toggleBioEditMode() {
      if (this.bioEditMode) {
        this.$store
          .dispatch("updateBio", { bio: this.userData.bio })
          .then((response) => {
            alert("Biography Updated Successfully!");
          })
          .catch((err) => {
            // console.log(err);
          });
      }
      this.bioEditMode = !this.bioEditMode;
    },
  },
};
</script>
