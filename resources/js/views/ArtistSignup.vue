<template>
  <section class="login-container sign-up">
    <div class="signup-wrapper">
      <h4 class="mb-4 text-center">Create Artist Account</h4>
      <input
        type="text"
        class="fld"
        placeholder="Email Address"
        v-model="email"
        @keyup.enter="subscribe"
      />
      <div class="text-center">
        <button class="btn-default yellow-btn mt-4" @click="subscribe" :disabled="disableSubmitBtn">
          Sign up
        </button>
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
      packageId: 1,
      disableSubmitBtn: false
    };
  },
  computed: {
    ...mapState([]),
    ...mapGetters([])
  },
  mounted() {
    let status = this.$route.query.status;
    let email = this.$route.query.email;

    if (status && email) {
      this.disableSubmitBtn = true
      if (status == 2) {
        this.packageId = 2;
      }
      this.email = email;
      this.register();
    }
  },
  methods: {
    register() {
      this.$store
        .dispatch("register", {
          email: this.email,
          type: 2,
          packageId: this.packageId
        }) // type: 2 == Artist
        .then(response => {
          if (response.status) {
            this.$notify({
              title: "Success!",
              text: response.data.message,
              type: "success"
            });
            this.$router.push({ name: "confirmation-email" });
          } else {
            this.$notify({
              title: "Oops!",
              text: response.data.message + ` - Please try again!`,
              type: "warning"
            });
            this.$router.push({ name: "login" });
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
    subscribe() {
      this.$store
        .dispatch("getUserWithEmail", { email: this.email })
        .then(res => {
          if (res.data.status) {
            this.$notify({
              title: "Error!",
              text: "You are already a registered artist! Please login",
              type: "error"
            });
            this.$router.push({ name: "login" });
          } else {
            this.$router.push({ name: "pricing", params: { email: this.email } });
          }
        })
        .catch(err => {
          this.$notify({
            title: "Error!",
            text: err.message,
            type: "error"
          });
          this.$router.push({ name: "login" });
        });
    }
  }
};
</script>

