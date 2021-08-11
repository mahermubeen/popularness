<template>
  <section class="body-container">
    
    <Sidebar></Sidebar>
    
    <main class="">

        <section class="content-container">
            <div class="about-text">
                <h4>Step 1</h4>
                <p>
                    Fans get to add money to their digital wallet by creating an account or signing into their account.
                </p>
                <h4>Step 2</h4>
                <p>
                    Once signed in, Fans get to tip any music video with at least 25 cents.
                </p>
                <h4>Step 3</h4>
                <p>
                    Each month, the Artists receives 100% of your tips.
                </p>
            </div>
        </section>
    </main>
  </section>
</template>

<script>
import { mapState } from "vuex";
import Sidebar from "./../layouts/components/Sidebar";

export default {
  components: {
    Sidebar,
  }
};
</script>
