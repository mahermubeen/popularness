<template>
  <section class="body-container" style="display:block">
    
    <section class="login-container fan-page confirmation-email">
      <div class="confirmation-email-wrapper">
        <img src="assets/images/confirmation-icon.png" alt="" class="icon" />
        <h2>Confirmation email has been sent</h2>
        <h3>Confirmation email has been sent. Please check your inbox to proceed.</h3>
      </div>
    </section>
  </section>
</template>

<script>

export default {
  created() {
    setTimeout( () => this.$router.push({ path: '/login'}), 5000);
  }
};
</script>
