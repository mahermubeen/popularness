<template>
  <section class="login-container sign-up">
    <div class="signup-wrapper">
      <h4 class="mb-4 text-center">Reset Password</h4>
      <input
        type="email"
        class="fld"
        placeholder="Email Address"
        v-model="email"
        @keyup.enter="requestResetPassword"
        required
      />
      <div class="text-center">
        <button
          class="btn-default yellow-btn radius mt-4"
          @submit.prevent="requestResetPassword"
        >
          Submit
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      has_error: false
    };
  },
  methods: {
    requestResetPassword() {
      axios
        .post(
          "/api/reset-password",
          { email: this.email }
        )
        .then(
          result => {
            this.response = result.data;
            console.log(result.data);
            this.$notify({
              title: 'Success!',
              text: result.data.message,
              type: 'success',
            });
            this.$router.push({ name: "confirmation-email" });
          },
          error => {
            console.error(error);
          }
        );
    }
  }
};
</script>