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

          <h3 class="my-5 text-center">Select Your Account Type</h3>

          <section class="subscription-wrapper">
              <div class="clm">
                  <div class="title">INDY</div>
                  <div class="price-info">
                      <div class="price">Free</div>
                      <div class="limit">For Lifetime</div>
                  </div>
                  <div class="info">For aspiring recording artist looking to showcase their music video</div>
                  <ul>
                      <li><i class="fas fa-check-circle"></i>Artist/Band Profile</li>
                      <li><i class="fas fa-check-circle"></i>1 Upload per month</li>
                      <li><i class="fas fa-check-circle"></i>1 GB Total Stroage</li>
                      <li class="blur"><i class="fas fa-check-circle"></i>Global Video Analytics</li>
                      <li class="blur"><i class="fas fa-check-circle"></i>Performance Report</li>
                      <li class="blur"><i class="fas fa-check-circle"></i>Monetize your Videos</li>
                  </ul>
                  <div class="p-3 mt-3">
                      <button class="btn-full">Start Now</button>
                  </div>
              </div>
              <div class="clm pro">
                  <div class="title">PRO</div>
                  <div class="price-info">
                      <div class="price">$100</div>
                      <div class="limit">Per Month</div>
                  </div>
                  <div class="info">For professional recording artist looking to tour and make money with their music videos</div>
                  <ul>
                      <li><i class="fas fa-check-circle"></i>Artist/Band Profile</li>
                      <li><i class="fas fa-check-circle"></i>3 Upload per month</li>
                      <li><i class="fas fa-check-circle"></i>Unlimited Stroage</li>
                      <li><i class="fas fa-check-circle"></i>Global Video Analytics</li>
                      <li><i class="fas fa-check-circle"></i>Performance Report</li>
                      <li><i class="fas fa-check-circle"></i>Monetize your Videos</li>
                  </ul>
                  <div class="p-3 mt-3">
                      <button class="btn-full">Start Now</button>
                  </div>
              </div>
          </section>

          <section class="package-detail">
              <div class="row">
                  <div class="col-lg-6">
                      <h3>My Subscription Information:</h3>
                      <div class="my-subscription-info">
                          <p class="title">My Account Type: <span>Pro </span></p>

                          <p class="title">My Billing Duration: <span>Monthly </span></p>

                          <p class="title">Monthly Bill Amount: <span>$100 </span></p>

                          <p class="title">Next Billing Date: <span>31 December, 2019 </span></p>

                      </div>
                  </div>

                  <div class="col-lg-6">
                      <h3>Update Your Credit Card Information</h3>
                      <div class="card-form">
                          <div class="custom-dropdown">
                              <select class="form-control">
                                  <option>Card Type: Mastercard</option>
                              </select>
                          </div>
                          <input type="text" class="form-control" placeholder="Name On Card" />
                          <input type="text" class="form-control" placeholder="Your Card Number" />
                          <div class="row card-row">
                              <div class="col">
                                  <select class="form-control">
                                      <option>Month</option>
                                  </select>
                              </div>
                              <div class="col">
                                  <div class="custom-dropdown">
                                      <select class="form-control">
                                          <option>Year</option>
                                      </select>
                                  </div>
                              </div>
                              <div class="col">
                                  <input type="text" class="form-control cvv" placeholder="CVV" />
                              </div>
                          </div>
                          <button class="btn-full">Update Card Information</button>
                      </div>
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
