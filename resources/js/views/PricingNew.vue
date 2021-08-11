<template>
  <section class="pricing-new">
    <Sidebar></Sidebar>
    <div class="offers-wrapper">
      <div class="container1">
        <div class="row1">
          <h1 class="main-heading">The World is Your Stage...</h1>
          <p class="main-p">Upgrade, Downgrade,Cancel at any time</p>
        </div>

        <div class="row1" v-if="packageId">
          <section class="login-container sign-up">
            <div class="signup-wrapper">
              <h4 class="mb-4 text-center">
                Are you sure to sign up for
                <span style="color: #ffa472"
                  >{{ packageId == 2 ? "Pro" : "Indy" }}
                </span>
                package?
              </h4>
              <div class="text-center">
                <button
                  class="btn-default yellow-btn mt-4"
                  @click="register"
                  :disabled="disableSubmitBtn"
                >
                  {{ disableSubmitBtn ? "Processing..." : "Confirm" }}
                </button>
              </div>
            </div>
          </section>
        </div>

        <div class="row2" v-if="!packageId">
          <div class="box left-box">
            <h1>INDY</h1>

            <p class="p1"><span class="price">$0</span> Per Month</p>
            <img src="../../assets/images/pricing-img.png" />
            <p class="p2" @click="submit(1)">TOTALLY FREE FOREVER</p>
          </div>
          <div class="left box1">
            <div class="limits">
              <img src="../../assets/images/tick-white.png" />
              <p>Monthly Upload: 1 music video per month</p>
            </div>
            <div class="limits">
              <img src="../../assets/images/tick-white.png" />
              <p>Monthly Upload: 1 music</p>
            </div>
            <div class="limits">
              <img src="../../assets/images/tick-white.png" />
              <p>Upload Limit: 10GB Total Storage</p>
            </div>
            <div class="limits">
              <img src="../../assets/images/tick-white.png" />
              <p>Videos Limit: 25 videos</p>
            </div>
            <div class="limits">
              <img src="../../assets/images/tick-white.png" />
              <p>Standard Distribution - 5 business days</p>
            </div>
          </div>
          <div class="box right-box">
            <h1>
              PRO
              <span style="font-size: 16px; text-transform: capitalize">{{
                "(" + (isYearly ? "Yearly" : "Monthly") + ")"
              }}</span>
            </h1>

            <p class="p1"><span class="price">$99</span> Per Month</p>
            <img src="../../assets/images/pricing-img2.png" />
            <p class="p2" @click="submit(2)">
              TRY {{ isYearly ? "60" : "30" }} DAYS FOR FREE
            </p>
            <span class="span1">No Credit Card Required</span>
          </div>
          <div class="right box1">
            <div class="limits">
              <img src="../../assets/images/orange-tick.png" />
              <p>Monthly Upload: 3 music videos per month</p>
            </div>
            <div class="limits">
              <img src="../../assets/images/orange-tick.png" />
              <p>Upload Limit: 100GB Total Storage</p>
            </div>
            <div class="limits">
              <img src="../../assets/images/orange-tick.png" />
              <p>Videos Limit: Unlimited</p>
            </div>
            <div class="limits">
              <img src="../../assets/images/orange-tick.png" />
              <p>Express Distribution - 24 hours</p>
            </div>
            <div class="limits">
              <img src="../../assets/images/orange-tick.png" />
              <p>Tips: Receive 100% monthly</p>
            </div>
            <div class="limits">
              <img src="../../assets/images/orange-tick.png" />
              <p>Smart Video Analytics</p>
            </div>
            <div class="limits">
              <img src="../../assets/images/orange-tick.png" />
              <p>Detailed Report</p>
            </div>
            <div class="limits">
              <img src="../../assets/images/orange-tick.png" />
              <p>Additional Storage: $0.25/GB</p>
            </div>
          </div>
          <div class="row1">
            <div class="time-wrapper">
              <div class="time-period">
                <label class="toggler__label">
                  <input type="checkbox" hidden v-model="isYearly" />
                  <div class="toggler"></div>
                </label>
                <div class="offer">
                  <img src="../../assets/images/arrow.png" />
                  <p>
                    Get 2 Months<br />
                    For Free
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row3" v-if="!packageId">
          <div class="left box">
            <div class="limits">
              <img src="../../assets/images/tick-white.png" />
              <p>Monthly Upload: 1 music video per month</p>
            </div>
            <div class="limits">
              <img src="../../assets/images/tick-white.png" />
              <p>Monthly Upload: 1 music</p>
            </div>
            <div class="limits">
              <img src="../../assets/images/tick-white.png" />
              <p>Upload Limit: 10GB Total Storage</p>
            </div>
            <div class="limits">
              <img src="../../assets/images/tick-white.png" />
              <p>Videos Limit: 25 videos</p>
            </div>
            <div class="limits">
              <img src="../../assets/images/tick-white.png" />
              <p>Standard Distribution - 5 business days</p>
            </div>
          </div>
          <div class="right box">
            <div class="limits">
              <img src="../../assets/images/orange-tick.png" />
              <p>Monthly Upload: 3 music videos per month</p>
            </div>
            <div class="limits">
              <img src="../../assets/images/orange-tick.png" />
              <p>Upload Limit: 100GB Total Storage</p>
            </div>
            <div class="limits">
              <img src="../../assets/images/orange-tick.png" />
              <p>Videos Limit: Unlimited</p>
            </div>
            <div class="limits">
              <img src="../../assets/images/orange-tick.png" />
              <p>Express Distribution - 24 hours</p>
            </div>
            <div class="limits">
              <img src="../../assets/images/orange-tick.png" />
              <p>Tips: Receive 100% monthly</p>
            </div>
            <div class="limits">
              <img src="../../assets/images/orange-tick.png" />
              <p>Smart Video Analytics</p>
            </div>
            <div class="limits">
              <img src="../../assets/images/orange-tick.png" />
              <p>Detailed Report</p>
            </div>
            <div class="limits">
              <img src="../../assets/images/orange-tick.png" />
              <p>Additional Storage: $0.25/GB</p>
            </div>
          </div>
        </div>

        <div class="plan-table-btn" v-if="!packageId">
          <button>VIEW PLAN FEATURE COMPARISON TABLE</button>
        </div>
      </div>
    </div>

    <div class="faq-wrapper">
      <div class="container2">
        <h1 class="main-head">Frequently Asked Questions</h1>
        <div class="ques-wrapper">
          <div class="left box">
            <div class="top">
              <div class="dot"></div>
              <p class="p1">
                What happens after the free 30-day PRO plan trial?
              </p>
              <p class="p2">
                After the free 30-day PRO trial period, your account will
                automatically be downgraded to the INDY plan which will be free
                forever. PRO features like receiving tips and smart video
                analytics will be disabled.
              </p>
            </div>
            <div class="bottom">
              <div class="dot"></div>
              <p class="p1">Who is the INDY plan best suited for?</p>
              <p class="p2">
                The INDY plan is best suited for aspiring recording artists
                simply looking to showcase their music videos. However, if you
                are a professional recording artist that wants to receive tips
                from Fans for example, you’ll need to upgrade to the PRO plan.
              </p>
            </div>
          </div>
          <div class="right box">
            <div class="top">
              <div class="dot"></div>
              <p class="p1">What payment methods do you accept?</p>
              <p class="p2">
                We accept Visa, MasterCard, American Express, and Discover.
              </p>
            </div>
            <div class="bottom">
              <div class="dot"></div>
              <p class="p1">Do you have monthly and yearly plans?</p>
              <p class="p2">
                We have both. You can see monthly plans and annual plans using
                the toggle at the top of this page. Take an annual plan and
                you’ll save 2 months free.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="offer-details-wrapper">
      <div class="container2">
        <div class="row1">
          <div class="time-period">
            <span class="month">Monthly</span>
            <label class="toggler__label">
              <input type="checkbox" hidden />
              <div class="toggler"></div>
            </label>
            <span class="year">Yearly</span>
            <div class="offer">
              <img src="../../assets/images/arrow.png" />
              <p>
                Get 2 Months<br />
                For Free
              </p>
            </div>
          </div>

          <div class="col2">
            <h1>INDY</h1>
            <p class="p1"><span class="price">$0</span> Per Month</p>
            <button>Sign up</button>
          </div>

          <div class="col3">
            <h1>PRO</h1>
            <p class="p1"><span class="price">$99</span> Per Month</p>
            <button class="get-plan">Get Plan</button>
          </div>
        </div>

        <div class="row2">
          <h3>Music Video</h3>
          <div class="list">
            <div class="item">
              <p>Monthly Upload</p>
              <p>1</p>
              <p>3</p>
            </div>
            <div class="item">
              <p>Storage</p>
              <p>10gb</p>
              <p>100gb</p>
            </div>
            <div class="item">
              <p>Video Limit</p>
              <p>25</p>
              <p>Unlimited</p>
            </div>
            <div class="item">
              <p>Distribution <img src="../../assets/images/info-tag.png" /></p>
              <p>5 Business Days</p>
              <p>24 Hours</p>
            </div>
            <div class="item">
              <p>Additional Storage</p>
              <figure>
                <img src="../../assets/images/red-cross.png" />
              </figure>
              <p>$0.25/GB</p>
            </div>
          </div>
        </div>

        <div class="row3">
          <h3>Tips From Fans</h3>
          <div class="list">
            <div class="item">
              <p>Monthly</p>
              <figure>
                <img src="../../assets/images/red-cross.png" />
              </figure>
              <figure>
                <img src="../../assets/images/orange-tick.png" />
              </figure>
            </div>
          </div>
        </div>

        <div class="row4">
          <h3>Video Analytics</h3>
          <div class="list">
            <div class="item">
              <p>Audience <img src="../../assets/images/info-tag.png" /></p>
              <figure>
                <img src="../../assets/images/red-cross.png" />
              </figure>
              <figure>
                <img src="../../assets/images/orange-tick.png" />
              </figure>
            </div>
            <div class="item">
              <p>
                For Engagement <img src="../../assets/images/info-tag.png" />
              </p>
              <figure>
                <img src="../../assets/images/red-cross.png" />
              </figure>
              <figure>
                <img src="../../assets/images/orange-tick.png" />
              </figure>
            </div>
            <div class="item">
              <p>
                Attention Span <img src="../../assets/images/info-tag.png" />
              </p>
              <figure>
                <img src="../../assets/images/red-cross.png" />
              </figure>
              <figure>
                <img src="../../assets/images/orange-tick.png" />
              </figure>
            </div>
            <div class="item">
              <p>Social Stats <img src="../../assets/images/info-tag.png" /></p>
              <figure>
                <img src="../../assets/images/red-cross.png" />
              </figure>
              <figure>
                <img src="../../assets/images/orange-tick.png" />
              </figure>
            </div>
            <div class="item">
              <p>
                Detailed Report <img src="../../assets/images/info-tag.png" />
              </p>
              <figure>
                <img src="../../assets/images/red-cross.png" />
              </figure>
              <figure>
                <img src="../../assets/images/orange-tick.png" />
              </figure>
            </div>
          </div>
        </div>

        <div class="pro-btn">
          <div class="col3-1">
            <h1>PRO</h1>
            <p class="p1"><span class="price">$99</span> Per Month</p>
            <button class="get-plan">Get Plan</button>
          </div>
        </div>

        <div class="row2-1">
          <h3>Music Video</h3>
          <div class="list">
            <div class="item">
              <p>Monthly Upload</p>
              <p>1</p>
              <p>3</p>
            </div>
            <div class="item">
              <p>Storage</p>
              <p>10gb</p>
              <p>100gb</p>
            </div>
            <div class="item">
              <p>Video Limit</p>
              <p>25</p>
              <p>Unlimited</p>
            </div>
            <div class="item">
              <p>Distribution <img src="../../assets/images/info-tag.png" /></p>
              <p>5 Business Days</p>
              <p>24 Hours</p>
            </div>
            <div class="item">
              <p>Additional Storage</p>
              <figure>
                <img src="../../assets/images/red-cross.png" />
              </figure>
              <p>$0.25/GB</p>
            </div>
          </div>
        </div>

        <div class="row3-1">
          <h3>Tips From Fans</h3>
          <div class="list">
            <div class="item">
              <p>Monthly</p>
              <figure>
                <img src="../../assets/images/red-cross.png" />
              </figure>
              <figure>
                <img src="../../assets/images/orange-tick.png" />
              </figure>
            </div>
          </div>
        </div>

        <div class="row4-1">
          <h3>Video Analytics</h3>
          <div class="list">
            <div class="item">
              <p>Audience <img src="../../assets/images/info-tag.png" /></p>
              <figure>
                <img src="../../assets/images/red-cross.png" />
              </figure>
              <figure>
                <img src="../../assets/images/orange-tick.png" />
              </figure>
            </div>
            <div class="item">
              <p>
                For Engagement <img src="../../assets/images/info-tag.png" />
              </p>
              <figure>
                <img src="../../assets/images/red-cross.png" />
              </figure>
              <figure>
                <img src="../../assets/images/orange-tick.png" />
              </figure>
            </div>
            <div class="item">
              <p>
                Attention Span <img src="../../assets/images/info-tag.png" />
              </p>
              <figure>
                <img src="../../assets/images/red-cross.png" />
              </figure>
              <figure>
                <img src="../../assets/images/orange-tick.png" />
              </figure>
            </div>
            <div class="item">
              <p>Social Stats <img src="../../assets/images/info-tag.png" /></p>
              <figure>
                <img src="../../assets/images/red-cross.png" />
              </figure>
              <figure>
                <img src="../../assets/images/orange-tick.png" />
              </figure>
            </div>
            <div class="item">
              <p>
                Detailed Report <img src="../../assets/images/info-tag.png" />
              </p>
              <figure>
                <img src="../../assets/images/red-cross.png" />
              </figure>
              <figure>
                <img src="../../assets/images/orange-tick.png" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Sidebar from "./../layouts/components/Sidebar1";
import { StripeCheckout } from "@vue-stripe/vue-stripe";

export default {
  components: {
    Sidebar,
    StripeCheckout,
  },
  data() {
    this.publishableKey =
      process.env.MIX_STRIPE_KEY ||
      "pk_test_51IVLFdEtvCklNSsXRSfVTHUzebyaYizT8nyPiLQ5COTdI3qcRg2v6Dtdktljmt8m1DGD9XpgKlfCW6pZUlmuAL5900hINOtBW0";
    return {
      status: 1,
      loading: false,
      isYearly: false,
      email: "",
      lineItems: [
        {
          price:
            process.env.MIX_STRIPE_PRICE_KEY ||
            "price_1ImOqMEtvCklNSsXDT1IwPZ8", // The id of the recurring price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      successURL:
        process.env.MIX_APP_URL +
        "artist-signup?status=2&email=" +
        this.$route.params.email,
      cancelURL: process.env.MIX_APP_URL + "artist-signup?status=0",
      customerEmail: this.$route.params.email,
      packageId: null,
      disableSubmitBtn: false,
    };
  },
  methods: {
    submit(packageId = null) {
      this.$router.push({
        name: "complete-artist-profile",
        params: { packageId },
      });

      // if(packageId == 2) {
      //     // You will be redirected to Stripe's secure checkout page
      //     this.$refs.checkoutRef.redirectToCheckout();
      // } else {
      //     this.$router.push({name:'artist-signup', query: { status: 1, email: this.email }})
      // }
    },
    register() {
      this.disableSubmitBtn = true;
      this.$store
        .dispatch("register", {
          email: this.email,
          type: this.packageId,
          packageId: this.packageId,
        }) // type: 2 == Artist
        .then((response) => {
          if (response.status) {
            this.$notify({
              title: "Success!",
              text: response.data.message,
              type: "success",
            });
            this.$router.push({ name: "confirmation-email" });
          } else {
            this.disableSubmitBtn = false;
            this.$notify({
              title: "Oops!",
              text: response.data.message + ` - Please try again!`,
              type: "warning",
            });
            this.$router.push({ name: "login" });
          }
        })
        .catch((err) => {
          this.disableSubmitBtn = false;
          this.$notify({
            title: "Error!",
            text: err.message,
            type: "error",
          });
        });
    },
    subscribe(packageId) {
      this.$store
        .dispatch("getUserWithEmail", { email: this.email })
        .then((res) => {
          if (res.data.status) {
            this.$notify({
              title: "Error!",
              text: "You are already a registered artist! Please login",
              type: "error",
            });
            return 0;
          }
          this.packageId = packageId;
        })
        .catch((err) => {
          this.$notify({
            title: "Error!",
            text: err.message,
            type: "error",
          });
          return 0;
        });
    },
  },
};
</script>
<style scoped>
.login-container {
  padding: 0 !important;
  background: transparent;
}
</style>
