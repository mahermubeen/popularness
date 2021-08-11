import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/Dashboard";
import Profile from "./views/Profile";
import Login from "./auth/Login";
import Welcome from "./views/Welcome";
import UploadVideo from "./views/Upload";
import UpdateVideo from "./views/UpdateVideo";
import Connections from "./views/Connections";
import About from "./views/About";
import ConfirmationEmail from "./views/ConfirmationEmail";
import BrandAsset from "./views/BrandAsset";
import Career from "./views/Career";
import ArtistFeatures from "./views/ArtistFeatures";
import FanFeatures from "./views/FanFeatures";
import Pricing from "./views/Pricing";
import VideoAnalytics from "./views/VideoAnalytics";
import MyVideoAnalytics from "./views/MyVideoAnalytics";
import HowItWorks from "./views/HowItWorks";
import ArtistSignup from "./views/ArtistSignup";
import FanSignup from "./views/FanSignup";
import FanGenres from "./views/FanGenres";
import FAQ from "./views/FAQ";
import Contact from "./views/Contact";
import Terms from "./views/Terms";
import Privacy from "./views/Privacy";
import CompleteFanProfile from "./views/CompleteFanProfile";
import CompleteArtistProfile from "./views/CompleteArtistProfile";

import VideoPlay from "./views/VideoPlay";
import MyVideos from "./views/MyVideos";
import RecentlyWatched from "./views/RecentlyWatched";
import MyPlaylist from "./views/MyPlaylist";
import PlaylistForm from "./views/PlaylistForm";
import AccountSettings from "./views/settings/Account";
import Balance from "./views/settings/Balance";
import Subscription from "./views/settings/Subscription";
import Notifications from "./views/settings/Notifications.vue";
import Newsletter from "./views/settings/Newsletter.vue";
import ForgotPassword from "./views/auth/ForgotPassword.vue";
import ResetPasswordForm from "./views/auth/ResetPasswordForm.vue";

import PricingNew from "./views/PricingNew.vue";
import Brand from "./views/Brand.vue";
import Product from "./views/Product.vue";

import store from "./store/store";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "welcome",
            component: Welcome
        },
        {
            path: "/pricing-new",
            name: "pricing-new",
            component: PricingNew
        },
        {
            path: "/brand",
            name: "brand",
            component: Brand
        },
        {
            path: "/product",
            name: "product",
            component: Product
        },
        {
            path: "/admin*"
        },
        {
            path: "/reset-password",
            name: "reset-password",
            component: ForgotPassword
        },
        {
            path: "/reset-password/:token",
            name: "reset-password-form",
            component: ResetPasswordForm
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: Dashboard,
            async beforeEnter(to, from, next) {
                try {
                    let hasPermission = await store.getters.isLogged;
                    if (hasPermission) {
                        next();
                    } else {
                        next({
                            name: "login" // back to safety route //
                        });
                    }
                } catch (e) {
                    next({
                        name: "login" // back to safety route //
                    });
                }
            }
        },
        {
            path: "/profile",
            name: "profile",
            component: Profile,
            async beforeEnter(to, from, next) {
                try {
                    let hasPermission = await store.getters.isLogged;
                    if (hasPermission) {
                        next();
                    } else {
                        next({
                            name: "login" // back to safety route //
                        });
                    }
                } catch (e) {
                    next({
                        name: "login" // back to safety route //
                    });
                }
            }
        },
        {
            path: "/artist-profile/:handle",
            name: "artist-profile",
            component: () => import("./views/ArtistProfile.vue")
        },
        {
            path: "/upload",
            name: "upload",
            component: UploadVideo,
            async beforeEnter(to, from, next) {
                try {
                    let hasPermission = await store.getters.isLogged;

                    if (hasPermission) {
                        let userType = await store.state.user.user.user_type
                        if(userType == 1){
                            next({
                                name: "dashboard"
                            });
                        } else {
                            next();
                        }
                    } else {
                        next({
                            name: "login" // back to safety route //
                        });
                    }
                } catch (e) {
                    next({
                        name: "login" // back to safety route //
                    });
                }
            }
        },
        {
            path: "/video-update/:hashId",
            name: "video-update",
            component: UpdateVideo,
            async beforeEnter(to, from, next) {
                try {
                    let hasPermission = await store.getters.isLogged;
                    if (hasPermission) {
                        next();
                    } else {
                        next({
                            name: "login" // back to safety route //
                        });
                    }
                } catch (e) {
                    next({
                        name: "login" // back to safety route //
                    });
                }
            }
        },
        {
            path: "/my-videos",
            name: "my-videos",
            component: MyVideos,
            async beforeEnter(to, from, next) {
                try {
                    let hasPermission = await store.getters.isLogged;
                    if (hasPermission) {
                        next();
                    } else {
                        next({
                            name: "login" // back to safety route //
                        });
                    }
                } catch (e) {
                    next({
                        name: "login" // back to safety route //
                    });
                }
            }
        },
        {
            path: "/recently-watched",
            name: "recently-watched",
            component: RecentlyWatched,
            async beforeEnter(to, from, next) {
                try {
                    let hasPermission = await store.getters.isLogged;
                    if (hasPermission) {
                        next();
                    } else {
                        next({
                            name: "login" // back to safety route //
                        });
                    }
                } catch (e) {
                    next({
                        name: "login" // back to safety route //
                    });
                }
            }
        },
        {
            path: "/my-playlist",
            name: "my-playlist",
            component: MyPlaylist,
            async beforeEnter(to, from, next) {
                try {
                    let hasPermission = await store.getters.isLogged;
                    if (hasPermission) {
                        next();
                    } else {
                        next({
                            name: "login" // back to safety route //
                        });
                    }
                } catch (e) {
                    next({
                        name: "login" // back to safety route //
                    });
                }
            }
        },
        {
            path: "/playlist/create",
            name: "create-playlist",
            component: PlaylistForm
        },
        {
            path: "/playlist/update/:hash",
            name: "update-playlist",
            component: PlaylistForm
        },
        {
            path: "/connections",
            name: "connections",
            component: Connections
        },
        {
            path: "/video-play/:hashId",
            name: "video-play",
            component: VideoPlay
        },
        {
            path: "/settings",
            name: "account-settings",
            component: AccountSettings,
            async beforeEnter(to, from, next) {
                try {
                    let hasPermission = await store.getters.isLogged;
                    if (hasPermission) {
                        next();
                    } else {
                        next({
                            name: "login" // back to safety route //
                        });
                    }
                } catch (e) {
                    next({
                        name: "login" // back to safety route //
                    });
                }
            }
        },
        {
            path: "/balance",
            name: "account-balance",
            component: Balance,
            async beforeEnter(to, from, next) {
                try {
                    let hasPermission = await store.getters.isLogged;
                    if (hasPermission) {
                        next();
                    } else {
                        next({
                            name: "login" // back to safety route //
                        });
                    }
                } catch (e) {
                    next({
                        name: "login" // back to safety route //
                    });
                }
            }
        },
        {
            path: "/subscription",
            name: "subscription",
            component: Subscription,
            async beforeEnter(to, from, next) {
                try {
                    let hasPermission = await store.getters.isLogged;
                    if (hasPermission) {
                        next();
                    } else {
                        next({
                            name: "login" // back to safety route //
                        });
                    }
                } catch (e) {
                    next({
                        name: "login" // back to safety route //
                    });
                }
            }
        },
        {
            path: "/notifications",
            name: "notifications",
            component: Notifications,
            async beforeEnter(to, from, next) {
                try {
                    let hasPermission = await store.getters.isLogged;
                    if (hasPermission) {
                        next();
                    } else {
                        next({
                            name: "login" // back to safety route //
                        });
                    }
                } catch (e) {
                    next({
                        name: "login" // back to safety route //
                    });
                }
            }
        },
        {
            path: "/newsletter",
            name: "newsletter",
            component: Newsletter,
            async beforeEnter(to, from, next) {
                try {
                    let hasPermission = await store.getters.isLogged;
                    if (hasPermission) {
                        next();
                    } else {
                        next({
                            name: "login" // back to safety route //
                        });
                    }
                } catch (e) {
                    next({
                        name: "login" // back to safety route //
                    });
                }
            }
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/logout",
            name: "logout",
            component: Login
        },
        {
            path: "/about",
            name: "about",
            component: About
        },
        {
            path: "/brand-assets",
            name: "brand-assets",
            component: Brand
            // component: BrandAsset
        },
        {
            path: "/career",
            name: "career",
            component: Career
        },
        {
            path: "/artist-features",
            name: "artist-features",
            component: ArtistFeatures
        },
        {
            path: "/fan-features",
            name: "fan-features",
            component: FanFeatures
        },
        {
            path: "/pricing",
            name: "pricing",
            component: PricingNew
            // component: Pricing
        },
        {
            path: "/video-analytics",
            name: "video-analytics",
            component: VideoAnalytics
        },
        {
            path: "/video-analytics/:hashId",
            name: "my-video-analytics",
            component: MyVideoAnalytics
        },
        {
            path: "/artist-signup",
            name: "artist-signup",
            component: ArtistSignup
        },
        {
            path: "/fan-signup",
            name: "fan-signup",
            component: FanSignup
        },
        {
            path: "/fan-genres",
            name: "fan-genres",
            component: FanGenres
        },
        {
            path: "/how-it-works",
            name: "how-it-works",
            component: HowItWorks
        },
        {
            path: "/faq",
            name: "faq",
            component: FAQ
        },
        {
            path: "/contact",
            name: "contact",
            component: Contact
        },
        {
            path: "/terms",
            name: "terms",
            component: Terms
        },
        {
            path: "/privacy",
            name: "privacy",
            component: Privacy
        },
        {
            path: "/confirmation-email",
            name: "confirmation-email",
            component: ConfirmationEmail
        },
        {
            path: "/complete-fan-profile/:userId?",
            name: "complete-fan-profile",
            component: CompleteFanProfile
        },
        {
            path: "/complete-artist-profile/:userId?",
            name: "complete-artist-profile",
            component: CompleteArtistProfile
        },

    ],
    mode: "history",
    linkExactActiveClass: "active",
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
});
