<template>
  <section class="body-container">
    <Sidebar></Sidebar>
    <main class="">
      <div class="profile-banner"></div>

      <UserHeader></UserHeader>

      <section class="content-container">
        <div class="backend-pages">
          <DashboardNav></DashboardNav>

          <ul class="setting-menu">
            <li>
              <router-link to="/settings"><a>Account</a></router-link>
            </li>
            <li>
              <router-link to="/balance"><a>Balance</a></router-link>
            </li>
            <li>
              <router-link to="/subscription"><a>Subscription</a></router-link>
            </li>
            <li>
              <router-link to="/notifications"><a>Notifications</a></router-link>
            </li>
            <li>
              <router-link to="/newsletter"><a>Newsletter</a></router-link>
            </li>
          </ul>

        <section class="newsletter-setting">
            <div class="wrapper">
                <h3 class="text-center mb-5">Account Notification</h3>
                <div class="setting-row">
                    <div class="switch-clm">
                        <label class="switch ">
                            <input type="checkbox" class="default">
                            <span class="slider round"></span>
                        </label>
                    </div>
                    <div class="text">
                        <h4>New Videos</h4>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                    </div>
                </div>

                <div class="setting-row">
                    <div class="switch-clm">
                        <label class="switch ">
                            <input type="checkbox" class="default">
                            <span class="slider round"></span>
                        </label>
                    </div>
                    <div class="text">
                        <h4>New Followers</h4>
                    </div>
                </div>
                <div class="setting-row">
                    <div class="switch-clm">
                        <label class="switch ">
                            <input type="checkbox" class="default">
                            <span class="slider round"></span>
                        </label>
                    </div>
                    <div class="text">
                        <h4>New Playlist Within My Community</h4>
                    </div>
                </div>
                <div class="setting-row">
                    <div class="switch-clm">
                        <label class="switch ">
                            <input type="checkbox" class="default">
                            <span class="slider round"></span>
                        </label>
                    </div>
                    <div class="text">
                        <h4>New Comments</h4>
                    </div>
                </div>
                <div class="setting-row">
                    <div class="switch-clm">
                        <label class="switch ">
                            <input type="checkbox" class="default">
                            <span class="slider round"></span>
                        </label>
                    </div>
                    <div class="text">
                        <h4>My Playlist Rated</h4>
                    </div>
                </div>
                <div class="setting-row">
                    <div class="switch-clm">
                        <label class="switch ">
                            <input type="checkbox" class="default">
                            <span class="slider round"></span>
                        </label>
                    </div>
                    <div class="text">
                        <h4>Video Rated Within My Community</h4>
                    </div>
                </div>
                <div class="text-center">
                    <button class="btn-full">SAVE</button>
                </div>
            </div>
        </section>
        </div>
      </section>
    </main>
  </section>
</template>

<script>
import { mapState } from "vuex";
import Sidebar from "./../../layouts/components/Sidebar";
import UserHeader from "./../../layouts/components/UserHeader";
import DashboardNav from "./../../layouts/components/DashboardNav";

export default {
  components: {
    Sidebar,
    UserHeader,
    DashboardNav,
  }
};
</script>
