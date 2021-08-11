<template>
  <section class="body-container">
    <Sidebar></Sidebar>
    <main class="">
      <div class="profile-banner"></div>

      <UserHeader></UserHeader>

      <section class="content-container">
        <div class="backend-pages">
          <DashboardNav></DashboardNav>

          <div class="edit-profile-wrapper">
            <div class="form-group w-50">
              <h3>{{ playlistInfo.hash ? "Update" : "Create" }} Playlist</h3>
            </div>
            <div class="form-group w-50">
              <input
                type="text"
                class="form-control"
                placeholder="Title"
                v-model="playlistInfo.name"
              />
            </div>

            <!-- <div class="row align-items-center privacy-row">
              <div class="col-md-2 col-6">
                <p class="mb-0">Photo</p>
              </div>
              <div class="col-md-4 col-6">
                <S3FileUpload
                  filedName="proPic"
                  directory="thumbnails"
                  @fileUploaded="fileUploadCallback"
                  class="form-control"
                />
              </div>
            </div> -->
          </div>
          <div class="row edit-profile justify-content-center">
            <div class="col-md-4 mt-5 text-center">
              <button @click.prevent="submitForm" class="btn-full">
                {{ playlistInfo.hash ? "Update" : "Create" }}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </section>
</template>

<script>
import { mapState } from "vuex";
import S3FileUpload from "../components/S3FileUpload.vue";
import Sidebar from "./../layouts/components/Sidebar";
import UserHeader from "./../layouts/components/UserHeader";
import DashboardNav from "./../layouts/components/DashboardNav";

export default {
  components: {
    S3FileUpload,
    Sidebar,
    UserHeader,
    DashboardNav
  },
  data() {
    return {
      playlistInfo: {
        hash: null,
        name: null,
        image: null
      }
    };
  },
  mounted() {
    this.playlistInfo.hash = this.$route.params.hash;
    this.$store.dispatch("getMyPlaylists");
  },
  computed: {
    ...mapState({
      myPlaylists: state => state.playlist.myPlaylists
    })
  },
  methods: {
    showLog(data) {
      console.log(data);
    },
    submitForm() {
      if (this.playlistInfo.hash) {
        this.updatePlaylistInfo();
      } else {
        this.savePlaylistInfo();
      }
    },
    savePlaylistInfo() {
      this.$store
        .dispatch("saveBasicPlaylist", this.playlistInfo)
        .then(response => {
          if (response.data.status) {
            this.$store.dispatch("getMyPlaylists");
            this.$notify({
              title: "Success!",
              text: response.data.message,
              type: "success"
            });
          }
          this.playlistInfo = {}
        })
        .catch(err => {
          this.$notify({
            title: "Error!",
            text: err.message,
            type: "error"
          });
        });
    },
    updatePlaylistInfo() {
      this.$store
        .dispatch("saveBasicPlaylist", this.playlistInfo)
        .then(response => {
          if (response.data.status) {
            this.$notify({
              title: "Success!",
              text: response.data.message,
              type: "success"
            });
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
    fileUploadCallback(data) {
      if (data.url) this.playlistInfo.image = data.url;
      console.log(data);
    }
  }
};
</script>

<style scoped>
.video-info-wrapper {
  min-height: 150px;
}
</style>
