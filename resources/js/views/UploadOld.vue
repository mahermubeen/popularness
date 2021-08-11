<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Upload Video</div>

          <div class="card-body">
            <form class="col-md-8 mx-auto">
              <div class="form-group">
                <S3FileUpload filedName="video" directory="videos" />
              </div>
              <div class="form-group">
                <label>Song Name</label>
                <input
                  v-model="videoInfo.title"
                  type="text"
                  class="form-control"
                  placeholder="Song Name"
                />
              </div>
              <div class="form-group">
                <label>Featuring</label>
                <input
                  v-model="videoInfo.artist"
                  type="text"
                  class="form-control"
                  placeholder="Featuring"
                />
              </div>
              <div class="form-group">
                <label>Genre</label>
                <select
                  v-model="videoInfo.genre"
                  class="form-control"
                >
                  <option class="form-control" selected value="">
                    Select Genre
                  </option>
                  <option
                    v-for="(genre, index) in genres"
                    :key="index"
                    :value="genre.id"
                  >
                    {{ genre.genre }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label>Directed By</label>
                <input
                  v-model="videoInfo.directedBy"
                  type="text"
                  class="form-control"
                  placeholder="Directed By"
                />
              </div>
              <div class="form-group">
                <label>Produced By</label>
                <input
                  v-model="videoInfo.producedBy"
                  type="text"
                  class="form-control"
                  placeholder="Produced By"
                />
              </div>
              <div class="form-group">
                <label>Label</label>
                <input
                  v-model="videoInfo.label"
                  type="text"
                  class="form-control"
                  placeholder="Label"
                />
              </div>
              <div class="form-group">
                <label>Composer(s)</label>
                <input
                  v-model="videoInfo.composers"
                  type="text"
                  class="form-control"
                  placeholder="Composer(s)"
                />
              </div>
              <div class="form-group">
                <label>Description</label>
                <textarea
                  v-model="videoInfo.description"
                  class="form-control"
                  placeholder="Description"
                  rows="5"
                >
                </textarea>
              </div>
              <button @click.prevent="saveVideoInfo" class="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import S3FileUpload from "../components/S3FileUpload.vue";

export default {
  components: {
    S3FileUpload,
  },
  data() {
    return {
      video: "",
      videoInfo: {
        title: "",
        artist: "",
        genre: "",
        directedBy: "",
        producedBy: "",
        label: "",
        composers: "",
        wistia: {
            id: 123,
            thumbnail: {
                url: "https://popularness-static.s3.amazonaws.com/thumbnails/9409819731676112.jpeg"
            }
        },
        type: "mp4",
        size: "4345343425",
        description: "",
      },
    };
  },
  mounted() {
    if (this.genres.length < 1) {
      this.$store.dispatch("getGenres");
    }
  },
  computed: {
    ...mapState({
      genres: (state) => state.video.genres,
    }),
  },
  methods: {
    saveVideoInfo() {
      this.$store
        .dispatch("saveVideoInfo", this.videoInfo)
        .then((response) => {
            console.log(response.data)
            this.resetForm()
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showLog(data) {
      console.log(data);
    },
    resetForm(){
      this.videoInfo = {
        title: "",
        artist: "",
        genre: "",
        directedBy: "",
        producedBy: "",
        label: "",
        composers: "",
        wistia: {
            id: 123,
            thumbnail: {
                url: "https://popularness-static.s3.amazonaws.com/thumbnails/9409819731676112.jpeg"
            }
        },
        type: "mp4",
        size: "4345343425",
        description: "",
      }
    }
  },
};
</script>
