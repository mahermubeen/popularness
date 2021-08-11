<template>
  <div>
        <Header></Header>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "./../layouts/components/Header.vue";
import Footer from "./../layouts/components/Footer.vue";
import Welcome from "./../layouts/components/Footer.vue";

export default {
  components: {
    Header,
    Footer
  },
  computed: {
    // ...mapState({
    //   user: (state) => state.user,
    // }),
  },
};
</script>
