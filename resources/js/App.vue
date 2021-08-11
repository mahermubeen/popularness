<template>
  <div>
    <Header></Header>
    <notifications :duration="5000" />
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import Header from "./layouts/components/Header";
import Footer from "./layouts/components/Footer";

export default {
  components: {
    Header,
    Footer,
  },
  mounted() {
    // console.log('Component mounted.')
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
    ...mapGetters(["isLogged"]),
  },
  methods: {
    handleLogout() {
      this.$store
        .dispatch("handleLogout")
        .then((response) => {
          this.$router.push({ name: "welcome" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
