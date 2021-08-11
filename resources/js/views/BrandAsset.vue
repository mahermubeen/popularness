<template>
  <section class="body-container">
    
    <Sidebar></Sidebar>
    
    <main class="">
      <section class="content-container">
            <div class="media-kit-text">
                <p>
                    We promise we’re not trying to be d-bags, but yeah we have to lay a few ground rules when
                    using our brand assets. So, relax and make yourself at home while you have a look. We ask that
                    you and please:
                </p>
                <p>
                    Always use the mascot and logotype together, or just the mascot. Don’t use the logotype on its
                    own.
                </p>
                <p>
                    Use the black or white logo when overlaying on other images or colored backgrounds.
                </p>
                <p>
                    Don’t use colors in the logo that aren’t included in our brand colors (see below).
                </p>
                <p>
                    Give the logo adequate negative space — don’t clutter it with other text or graphics.
                </p>
            </div>
            <div class="mediakit-wrapper">
                <div class="collections-media">
                    <div class="row">
                        <div class="col-lg-3">
                            <div class="media-img-holder">
                                <img src="assets/images/mascot-logo.jpg" />
                                <div class="file-info">
                                    <span>16 files</span>
                                    <span>95 MB</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-9">
                            <h2>The Popularness Logo</h2>
                            <button class="download-btn mt-2"><span class="fa fa-download"></span> Download</button>
                        </div>
                    </div>
                </div>
                <div class="collections-media">
                    <div class="row">
                        <div class="col-lg-3">
                            <div class="media-img-holder">
                                <img class="colors" src="assets/images/brand-colors.png" />
                                <div class="file-info">
                                    <span>16 files</span>
                                    <span>95 MB</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-9">
                            <h2>Brand Colors</h2>
                            <button class="download-btn mt-2"><span class="fa fa-download"></span> Download</button>
                        </div>
                    </div>
                </div>

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
