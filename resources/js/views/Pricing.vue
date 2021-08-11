<template>
  <section class="login-container desired-package">
    <div class="wrapper">
      <h3>Choose The Plan That’s Right For You</h3>
      <h4 class="mb-5">Upgrade, downgrade, cancel at any time.</h4>
      <section class="subscription-wrapper">
        <div class="clm">
          <div class="title"></div>
          <div class="price-info">
            <div class="price">INDY</div>
            <div class="limit">Always Free</div>
          </div>
          <div class="info">
            For aspiring recording artist looking to showcase their music videos
          </div>
          <ul>
            <li><i class="fas fa-check-circle"></i>Monthly Uploads: 1 video</li>
            <li>
              <i class="fas fa-check-circle"></i>Upload Limit : 10 GB Total
              Storage
            </li>
            <li class="blur"><i class="fas fa-check-circle"></i>Tips: N/A</li>
            <li class="blur">
              <i class="fas fa-check-circle"></i>Video Analytics: N/A
            </li>
            <li class="blur">
              <i class="fas fa-check-circle"></i>Detailed Report: N/A
            </li>
            <li>
              <i class="fas fa-check-circle"></i>Get unlimited free storage
              space by inviting Artists or Fans to Popularness!
            </li>
            <li>
              <i class="fas fa-check-circle"></i>For every Artist who joins
              Popularness, we'll give you both 1GB MB of bonus space.
            </li>
            <li>
              <i class="fas fa-check-circle"></i>For every Fan who joins
              Popularness, we’ll give you 500 MB of bonus space.
            </li>
          </ul>
          <div class="p-3 mt-3">
            <!-- <router-link to="/artist-signup"> -->
              <a class="btn-full" @click="submit(1)">ALWAYS FREE</a>
            <!-- </router-link> -->
          </div>
        </div>
        <div class="clm pro">
          <div class="title"></div>
          <div class="price-info">
            <div class="price">PRO</div>
            <div class="limit">$100</div>
          </div>
          <div class="info">
            For professional recording artists looking to make money with their
            music videos and tour smartly
          </div>
          <ul>
            <li>
              <i class="fas fa-check-circle"></i>Monthly Uploads: 5 videos
            </li>
            <li><i class="fas fa-check-circle"></i>Total Storage: Unlimited</li>
            <li><i class="fas fa-check-circle"></i>Tips: Monthly</li>
            <li>
              <i class="fas fa-check-circle"></i>Video Analytics: Worldwide
            </li>
            <li>
              <i class="fas fa-check-circle"></i>New Fans (total viewers, avg
              per day, and max per day)
            </li>
            <li>
              <i class="fas fa-check-circle"></i>Unique Fans (total viewers, avg
              per day, and max per day)
            </li>
            <li>
              <i class="fas fa-check-circle"></i>Fanbase Markets (viewers by
              country, state/province, and city)
            </li>
            <li>
              <i class="fas fa-check-circle"></i>Video Views (total views, avg
              per day, and max per day)
            </li>
            <li>
              <i class="fas fa-check-circle"></i>Viewed Minutes (total viewed
              mins, avg per day, and max per day)
            </li>
            <li>
              <i class="fas fa-check-circle"></i>Attention Span (the % viewers
              have watched of a video Ie up to 25%, up to 75% of a video)
            </li>
            <li><i class="fas fa-check-circle"></i>Detailed Report: Monthly</li>
          </ul>
          <div class="p-3 mt-3">
            <stripe-checkout
              ref="checkoutRef"
              mode="subscription"
              :pk="publishableKey"
              :line-items="lineItems"
              :success-url="successURL"
              :cancel-url="cancelURL"
              :customer-email="customerEmail"
              @loading="v => (loading = v)"
            />
            <!-- <router-link to="/artist-signup" @click="submit"> -->
                <!-- <button class="btn-full" @click="submit">Start Now</button> -->
              <a class="btn-full" @click="submit(2)">Start Now</a>
            <!-- </router-link> -->
          </div>
        </div>
      </section>
      <div class="stripe">
        <h4 class="text-left mt-4">Payment Information</h4>
        <img src="assets/images/stripe.png" alt="" />
      </div>
    </div>
  </section>
</template>

<script>
import { StripeCheckout } from "@vue-stripe/vue-stripe";

export default {
  components: {
    StripeCheckout
  },
  data () {
    this.publishableKey = process.env.MIX_STRIPE_KEY || 'pk_test_51IVLFdEtvCklNSsXRSfVTHUzebyaYizT8nyPiLQ5COTdI3qcRg2v6Dtdktljmt8m1DGD9XpgKlfCW6pZUlmuAL5900hINOtBW0';
    return {
      status: 1,
      loading: false,
      lineItems: [
        {
          price: process.env.MIX_STRIPE_PRICE_KEY || 'price_1ImOqMEtvCklNSsXDT1IwPZ8', // The id of the recurring price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      successURL: process.env.MIX_APP_URL + 'artist-signup?status=2&email=' + this.$route.params.email,
      cancelURL: process.env.MIX_APP_URL + 'artist-signup?status=0',
      customerEmail: this.$route.params.email,
    };
  },
  mounted() {
      // this.email = this.$route.params.email
      // if(!this.email || this.email == '') {
      //     this.$router.push({name:'artist-signup'})
      // }
  },
  methods: {
    submit (packageId = null) {
      if(packageId == 2) {
          // You will be redirected to Stripe's secure checkout page
          this.$refs.checkoutRef.redirectToCheckout();
      } else {
          this.$router.push({name:'artist-signup', query: { status: 1, email: this.email }})
      }
    },
  },
};
</script>
