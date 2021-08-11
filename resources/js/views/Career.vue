<template>
  <section class="body-container">
    
    <Sidebar></Sidebar>
    
    <main class="career-page">

        <section class="content-container">
            <div class="about-text">
                <p>
                    Popularness is a startup where everyone does a little bit of everything.
                </p>
                <p>
                    As the company grows, opportunities will present themselves and internal mobility and growth will be
                    encouraged. We are looking for passionate, high-energy individuals who aspire to be extraordinary.
                </p>
                <p>
                    By bridging the gap between music videos, monetization, and video analytics we will be able to
                    assist Artists in managing their careers properly.
                </p>
                <p>
                    If music is your life and being a part of the industry is something you’ve always wanted to do,
                    then we want you on our team!
                </p>
                <p>
                    Currently, we have the following opportunities:
                </p>
                <p>
                    <ul class="career-links">
                        <li><a href="https://www.linkedin.com/company/popularness">Account Manager</a></li>
                        <li><a href="https://www.linkedin.com/company/popularness">Artists & Repertoire (A&R) Executive</a></li>
                        <li><a href="https://www.linkedin.com/company/popularness">College Marketing Representative</a></li>
                        <li><a href="https://www.linkedin.com/company/popularness">Data Engineers</a></li>
                        <li><a href="https://www.linkedin.com/company/popularness">Social Media Manager</a></li>
                        <li><a href="https://www.linkedin.com/company/popularness">Video Directors</a></li>
                    </ul>
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
