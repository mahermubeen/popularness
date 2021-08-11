<template>
  <section class="login-container fan-page selected-music">
    <h4 class="mb-4">selected Music genre</h4>
    <div class="bubbles-wrapper bubbles-wrapper2">
      <label class="bubble" v-for="(genre, index) in genres" :key="index">
        <input
          type="checkbox"
          name="bubbles"
          @click="genreChecked(genre.id)"
          :value="genre.id"
        />
        <span class="checkMark">{{ genre.genre }}</span>
      </label>
      <!-- <label class="bubble">
            <input type="checkbox" name="bubbles" />
            <span class="checkMark">Rock/Metal</span>
        </label>
        <label class="bubble">
            <input type="checkbox" name="bubbles" />
            <span class="checkMark">Latin</span>
        </label>
        <label class="bubble">
            <input type="checkbox" name="bubbles" />
            <span class="checkMark">International</span>
        </label>
        <label class="bubble">
            <input type="checkbox" name="bubbles" />
            <span class="checkMark">Pop</span>
        </label>
        <label class="bubble">
            <input type="checkbox" name="bubbles" />
            <span class="checkMark">R&B/Soul</span>
        </label>
        <label class="bubble">
            <input type="checkbox" name="bubbles" />
            <span class="checkMark">Electronic</span>
        </label><label class="bubble">
            <input type="checkbox" name="bubbles" />
            <span class="checkMark">Hot 100</span>
        </label>
        <label class="bubble">
            <input type="checkbox" name="bubbles" />
            <span class="checkMark">Gospel</span>
        </label>
        <label class="bubble">
            <input type="checkbox" name="bubbles" />
            <span class="checkMark">Country</span>
        </label>
        <label class="bubble">
            <input type="checkbox" name="bubbles" />
            <span class="checkMark">Hip Hop/Rap</span>
        </label>
        <label class="bubble">
            <input type="checkbox" name="bubbles" />
            <span class="checkMark">Reggae
                    Caribbean</span>
        </label> -->
    </div>
    <div class="text-center">
      <button
        class="btn-default yellow-btn radius"
        @click="saveFavouriteGenres"
      >
        Continue
      </button>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      email: "",
      genreChecks: [],
    };
  },
  computed: {
    ...mapState({
      genres: (state) => state.video.genres,
      user: (state) => JSON.parse(state.auth.user) || state.auth.user,
    }),
    ...mapGetters([]),
  },
  mounted() {
    if (this.genres.length < 1) {
      this.$store.dispatch("getGenres");
    }
  },
  methods: {
    genreChecked(genreId) {
      let userGenres = [];
      let genreLabels = document.querySelectorAll(
        'input[name="bubbles"]:checked'
      );

      genreLabels.forEach((element) => {
        userGenres.push(element.value);
      });

      this.genreChecks = userGenres;
    },
    saveFavouriteGenres() {
      if (this.genreChecks.length < 1) {
        this.$notify({
          title: "Error!",
          text: "Please select at least one genre!",
          type: "error",
        });
        return;
      }
      this.$store
        .dispatch("saveUserInfo", { favouriteGenres: this.genreChecks })
        .then((response) => {
          if (response.status) {
            this.$notify({
              title: "Success!",
              text: "Genre list updated!",
              type: "success",
            });
          }
          this.$router.push({ name: "welcome" });
        })
        .catch((err) => {
          this.$notify({
            title: "Error!",
            text: err.message,
            type: "error",
          });
        });
    },
  },
};
</script>
