<template>
  <section class="body-container">
    
    <Sidebar></Sidebar>
    
    <main class="">

        <section class="content-container">
            <div class="contact-wrapper">
                <div class="light-bg">
                    <div class="dark-bg">
                        <div class="container-fluid">
                            <div class="row contact-text">
                                <div class="col-md-12">
                                    <p>For answers to the most frequently asked questions, please visit our FAQ section.</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <h4>CHAT WITH US</h4>
                                    <button class="btn-default radius" style="width:120px"><i class="fa fa-comments" aria-hidden="true"></i></button>
                                </div>
                                <div class="col-lg-6">
                                    <h4>
                                        <img src="assets/images/share-icon.png" alt="" />
                                        Connect With Us
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="contact-form-container">
                    <div class="row justify-content-center">
                        <div class="col-lg-8">
                            <div class="light-bg">
                                <form class="contact-form">
                                    <div class="input-group">
                                        <input type="text" class="fld" placeholder="Your Full Name" />
                                    </div>
                                    <div class="input-group">
                                        <input type="text" class="fld" placeholder="Your Email Address" />
                                    </div>
                                    <div class="input-group">
                                        <select name="subject" class="fld">
                                            <option selected disabled>Select Your Subject</option>
                                            <option>General</option>
                                            <option>Press Inquiries</option>
                                            <option>Advertising</option>
                                        </select>
                                    </div>
                                    <textarea placeholder="Write Your Message" rows="5"></textarea>
                                    <button class="submit-btn">SEND</button>
                                </form>
                            </div>
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
