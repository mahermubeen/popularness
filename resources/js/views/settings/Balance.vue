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
              <h3 class="text-right">Current Balance: ${{ userData.wallet.deposit_balance }}</h3>
              <div class="edit-profile-wrapper">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="First Name"
                    v-model="customer.first_name"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Last Name"
                    v-model="customer.last_name"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Email"
                    v-model="customer.email"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Street Address"
                    v-model="customer.address"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="City"
                    v-model="customer.city"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="State"
                    v-model="customer.state"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Zip Code"
                    v-model="customer.zip_code"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Amount"
                    v-model="customer.amount"
                  />
                </div>
                <div class="form-group" style="text-align:left">
                  <label for="card-element">Card Information</label>
                  <div id="card-element" class="form-control"></div>
                </div>
              </div>

              
              <button class="btn-default"
              @click="processPayment"
              :disabled="paymentProcessing"
              v-text="paymentProcessing ? 'Processing': 'Pay Now'"
              ></button>
              <!-- <p>
                if you want to delete your account, click the button below.
                please note that this can not be undone
              </p>
              <button class="btn-default">Delete This Account</button> -->
            </div>
          </section>
        </div>
      </section>
    </main>
  </section>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { loadStripe } from '@stripe/stripe-js'
import Sidebar from "./../../layouts/components/Sidebar";
import UserHeader from "./../../layouts/components/UserHeader";
import DashboardNav from "./../../layouts/components/DashboardNav";
import axios from 'axios';

export default {
  components: {
    Sidebar,
    UserHeader,
    DashboardNav,
  },
  data() {
    return {
      stripe: {},
      cardElement: {},
      customer: {
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip_code: '',
        amount: null,
      },
      paymentProcessing: false
    }
  },
  async mounted() {
    this.stripe = await loadStripe(process.env.MIX_STRIPE_KEY)

    const elements = this.stripe.elements();

    this.cardElement = elements.create('card', {
      classes: {
        base: ''
      }
    })

    this.cardElement.mount('#card-element')
  },
  computed: {
    // ...mapState({
    //   user: (state) => state.user,
    // }),
    ...mapGetters(["userData"])
  },
  methods: {
    async processPayment() {
      // send the payment information to laravel + stripe for processing
      this.paymentProcessing = true

      const { paymentMethod, error } = await this.stripe.createPaymentMethod(
        'card', this.cardElement, {
          billing_details: {
            name: this.customer.first_name + ' ' + this.customer.last_name,
            email: this.customer.email,
            address: {
              line1: this.customer.address,
              city: this.customer.city,
              state: this.customer.state,
              postal_code: this.customer.zip_code,
            }
          }
        }
      );

      if(error) {
        this.paymentProcessing = false;
        alert(error.message);
      } else {
        this.customer.payment_method_id = paymentMethod.id;

        axios.post('api/deposit-wallet', this.customer)
        .then((res) => {
          this.paymentProcessing = false;
        })
        .catch((err) => {
          this.paymentProcessing = false;
          console.log(err);
        })
      }
    }
  }
};
</script>
<style scoped>

/* Can't see what I type without this */
#card-number.form-control,
#card-cvc.form-control,
#card-exp.form-control {
    display:inline-block;
    color: #fff;
}
.InputContainer .InputElement {
    position: absolute;
    top: 0;
    color: #fff;
}
.ElementsApp .InputElement.is-invalid {
  color: #fff;
}
</style>
