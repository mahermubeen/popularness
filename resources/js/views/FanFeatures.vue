<template>
  <section class="body-container">
    
    <Sidebar></Sidebar>
    
    <main class="">

        <section class="content-container">
            <div class="about-text">
                <h4>Personalize Your Feed</h4>
                <p>
                    Discover music videos only from the genres that interest you and do away with the ones that don’t
                    by using our filters. Your homepage and viewing experience will be tailored to your specific
                    preferences.
                </p>
                <h4>Create Custom Playlists for Sharing</h4>
                <p>
                    Whether in the morning getting ready for your day to having friends over after work to rest and
                    relaxation time alone, you can create custom playlists no matter the mood or occasion. We know
                    having best music video mixtapes in the crew matters.
                </p>
                <h4>Support Artists Directly</h4>
                <p>
                    You enjoy supporting the Artists you love, but despise hearing record labels and digital streaming
                    services paying your favorite Artists pennies on the dollar. Well, the day is here where you can
                    support them directly without anyone tapping their pockets.
                </p>
                <p>
                    Raise your glasses to 100%, 100, hundred, hunnid, hundo…
                    <br>
                    (Now if you can’t respect that your whole perspective is wack)
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
