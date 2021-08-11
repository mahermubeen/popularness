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

          <section class="setting-account">
            <div class="wrapper">
              <p>
                if you want to delete your account, click the button below.
                please note that this can not be undone
              </p>
              <button class="btn-default">Delete This Account</button>
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
