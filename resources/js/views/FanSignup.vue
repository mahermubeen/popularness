<template>
  <section class="login-container fan-page">
    <div class="signup-wrapper">
      <h4 class="mb-4 text-center">Create FAN Account</h4>
      <div class="email-fld">
        <input
          type="text"
          class="fld"
          placeholder="Email Address"
          v-model="email"
          @keyup.enter="register"
        />
        <a href="#"
          ><img
            src="assets/images/fan-fld-arrow.png"
            alt="Submit"
            @click="register"
        /></a>
      </div>

      <div class="text-center have-account">
        Already have an account ?
        <router-link to="/login"><a>Sign In</a></router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      email: "",
    };
  },
  computed: {
    ...mapState([]),
    ...mapGetters([]),
  },
  methods: {
    register() {
      this.$store
        .dispatch("register", { email: this.email })
        .then((response) => {
          if(response.status) {
            this.$notify({
              title: 'Success!',
              text: response.data.message,
              type: 'success',
            });
            this.$router.push({ name: "confirmation-email" });
          } else {
            this.$notify({
              title: 'Oops!',
              text: response.data.message + ` - Please try again!`,
              type: 'warning',
            });
            this.$router.push({ name: "login" });
          };
        })
        .catch((err) => {
          this.$notify({
            title: 'Error!',
            text: err.message,
            type: 'error',
          });
        });
    },
  },
};
</script>
