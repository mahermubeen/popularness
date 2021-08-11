<template>
  <div class="dashboard-menu">
    <ul>
      <li>
        <!-- <?xml version="1.0" ?> -->
        <svg
          height="22px"
          id="Layer_1"
          style="background-color:#8e8e8e;"
          version="1.1"
          viewBox="0 0 32 32"
          width="22px"
          xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <path
            d="M12,30h16c1.1,0,2-0.9,2-2V12H12V30z M28,2H4C2.9,2,2,2.9,2,4v6h28V4C30,2.9,29.1,2,28,2z M2,28c0,1.1,0.9,2,2,2h6V12H2V28z  "
          />
        </svg>
        <router-link to="/dashboard">
          <a>
            <i></i>
            Dashboard
          </a>
        </router-link>
      </li>
      <li v-if="user.user && user.user.user_type != 1">
        <router-link to="/upload">
          <a>
            <i class="fas fa-cloud-upload-alt"></i>
            Upload Video
          </a>
        </router-link>
      </li>
      <li>
        <router-link to="/my-videos">
          <a>
            <i class="fas fa-video"></i>
            My Videos
          </a>
        </router-link>
      </li>
      <li>
        <router-link to="/profile">
          <a>
            <i class="fas fa-user-edit"></i>
            Edit Profile
          </a>
        </router-link>
      </li>
      <li>
        <router-link to="/my-playlist">
          <a>
            <i class="fas fa-list"></i>
            My Playlist
          </a>
        </router-link>
      </li>
      <li>
        <router-link to="/connections">
          <a>
            <i class="fas fa-share-alt"></i>
            Connections
          </a>
        </router-link>
      </li>
      <li>
        <router-link to="/settings">
          <a>
            <i class="fas fa-cog"></i>
            Settings
          </a>
        </router-link>
      </li>
      <li>
        <router-link to="/">
          <a @click.prevent="handleLogout">
            <i class="fas fa-power-off"></i>
            Log Out
          </a>
          <!-- <a @click.prevent="handleLogout" class="dropdown-item"
                          >Log Out</a> -->
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      user: state => state.user
    }),
  },
  methods: {
      handleLogout() {
        this.$store
          .dispatch("handleLogout")
          .then(() => {
            if (this.$route.name != "welcome") {
              this.$router.push({ name: "welcome" });
            }
            this.$notify({
              title: "Success!",
              text: "You are logged out successfully!",
              type: "success"
            });
          })
          .catch(err => {
            this.$notify({
              title: "Error!",
              text: err.message,
              type: "error"
            });
          });
      }
    }
};
</script>