<template>
  <section class="body-container">
    
    <Sidebar></Sidebar>
    
    <main class="">

        <section class="content-container">
            <div class="about-text">
                <h3>Video Analytics Has Just Made Touring Smarter</h3>
                <p>
                    Gone are the days when you'd upload your music videos solely for views. Our built-in, smart video
                    analytics empowers you with all the magic that happens “behind the video” and each month we’ll
                    create an easy to understand report that breaks down exactly how Fans are engaging with your videos.
                </p>
                <p>
                    Trying to select a single for you new album? Put two videos head-to-head, see which performs best,
                    and pick the winner winner chicken dinner. Now you’ll know which song to put a serious budget behind.
                </p>
                <p>
                    Oh, so you want to hit the road? Don’t fret, we can pinpoint where your fans are located based on
                    Country, State, and City. Now you can take the guesswork out selecting mediocre markets and design
                    tour roadmaps in markets where they already know your name.
                </p>
                <p>
                    You’re welcome. You’re all welcome!
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
