<template>
  <section class="login-container sign-up">
    <div class="signup-wrapper">
      <h4 class="mb-4 text-center">Create Artist Account</h4>
      <input
        type="email"
        class="fld"
        placeholder="Email Address"
        v-model="email"
        @keyup.enter="resetPassword"
        required
      />
      <input
        type="password"
        class="fld"
        placeholder="New Password"
        v-model="password"
        @keyup.enter="resetPassword"
        required
      />
      <input
        type="password"
        class="fld"
        placeholder="Confirm Password"
        v-model="password_confirmation"
        @keyup.enter="resetPassword"
        required
      />
      <div class="text-center">
        <button
          class="btn-default yellow-btn radius mt-4"
          @submit.prevent="resetPassword">
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
        token: null,
        email: null,
        password: null,
        password_confirmation: null,
        has_error: false
      }
    },
    methods: {
        resetPassword() {
            axios.post("/api/reset/password", {
                token: this.$route.params.token,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation
            })
            .then(result => {
                this.$notify({
                    title: 'Success!',
                    text: result.data.message,
                    type: 'success',
                });
                this.$router.push({name: 'login'})
            }, error => {
                console.error(error);
            });
        }
    }
}
</script>