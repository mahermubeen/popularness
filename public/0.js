(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/ArtistProfile.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/ArtistProfile.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _layouts_components_Sidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../layouts/components/Sidebar */ "./resources/js/layouts/components/Sidebar.vue");
/* harmony import */ var _layouts_components_UserHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../layouts/components/UserHeader */ "./resources/js/layouts/components/UserHeader.vue");
/* harmony import */ var _layouts_components_DashboardNav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../layouts/components/DashboardNav */ "./resources/js/layouts/components/DashboardNav.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    Sidebar: _layouts_components_Sidebar__WEBPACK_IMPORTED_MODULE_1__["default"],
    UserHeader: _layouts_components_UserHeader__WEBPACK_IMPORTED_MODULE_2__["default"],
    DashboardNav: _layouts_components_DashboardNav__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  data: function data() {
    return {
      userData: {},
      myVideos: [],
      bioEditMode: false
    };
  },
  mounted: function mounted() {
    var artistId = this.$route.params.id || null;

    if (!artistId) {
      this.$router.push('/');
      return;
    }

    this.getArtistInfo();
  },
  methods: {
    // getUser() {
    //   this.$store
    //     .dispatch("getUser")
    //     .then((response) => {
    //       this.userData = response.data;
    //       // TODO::Need to optimize below code-block
    //       if(!response.data.favourite_genres || JSON.parse(response.data.favourite_genres).length < 1) {
    //         this.$router.replace({ name: "fan-genres" });
    //         this.$notify({
    //           title: "Warning!",
    //           text: "Please select your favourite genres!",
    //           type: "warning",
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       if (err.status === 401) {
    //         // console.log(err.message);
    //         this.$router.replace({ name: "login" });
    //       }
    //       // alert(err.message);
    //     });
    // },
    getArtistInfo: function getArtistInfo() {
      var _this = this;

      this.$store.dispatch("getArtistInfo", {
        userId: this.$route.params.id
      }).then(function (response) {
        _this.userData = response.data;
        _this.myVideos = response.data.videos;
        console.log(response.data);
      })["catch"](function (err) {
        if (err.status === 401) {
          // console.log(err.message);
          _this.$router.replace({
            name: "login"
          });
        } // alert(err.message);

      });
    },
    clearUser: function clearUser() {
      this.userData = null;
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/ArtistProfile.vue?vue&type=template&id=593fde5a&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/ArtistProfile.vue?vue&type=template&id=593fde5a& ***!
  \************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "section",
    { staticClass: "body-container" },
    [
      _c("Sidebar"),
      _vm._v(" "),
      _c("main", {}, [
        _c("div", { staticClass: "profile-banner" }),
        _vm._v(" "),
        _c("div", { staticClass: "profile-info" }, [
          _c("div", { staticClass: "avtar-clm" }, [
            _c("div", { staticClass: "user-avtar" }, [
              _c("img", {
                attrs: {
                  src: _vm.userData.image
                    ? _vm.userData.image
                    : "/assets/images/avtar-img.jpg",
                  alt: ""
                }
              })
            ])
          ]),
          _vm._v(" "),
          _c("div", [
            _c(
              "p",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value:
                      _vm.userData.city ||
                      _vm.userData.state ||
                      _vm.userData.country,
                    expression:
                      "userData.city || userData.state || userData.country"
                  }
                ]
              },
              [
                _c("i", { staticClass: "fas fa-map-marker-alt" }),
                _vm._v(
                  "\n      " +
                    _vm._s(
                      _vm.userData.city && _vm.userData.city.name
                        ? _vm.userData.city.name + ","
                        : "Miami,"
                    ) +
                    "\n      " +
                    _vm._s(
                      _vm.userData.state && _vm.userData.state.name
                        ? _vm.userData.state.name
                        : "FL"
                    ) +
                    "\n      " +
                    _vm._s(
                      _vm.userData.country && _vm.userData.country.name
                        ? _vm.userData.country.name
                        : "USA"
                    ) +
                    "\n    "
                )
              ]
            )
          ]),
          _vm._v(" "),
          _vm._m(0)
        ]),
        _vm._v(" "),
        _c("section", { staticClass: "content-container" }, [
          _c("div", { staticClass: "backend-pages" }, [
            _c("div", { staticClass: "dashboard-wrapper" }, [
              _c("div", { staticClass: "bio" }, [
                _c("h3", { staticClass: "d-flex mb-4 align-items-center" }, [
                  _vm._v("\n              Biography\n            ")
                ]),
                _vm._v(" "),
                _c("p", [_vm._v(_vm._s(_vm.userData.bio))])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "row mt-4 total-tip" }, [
                _c("div", { staticClass: "col-lg-10" }, [
                  _c(
                    "div",
                    { staticClass: "bg-color" },
                    [
                      _c(
                        "h3",
                        {
                          staticClass:
                            "d-flex mb-4 align-items-center justify-content-between"
                        },
                        [_vm._v("\n                  Videos\n                ")]
                      ),
                      _vm._v(" "),
                      _vm._l(_vm.myVideos, function(video, index) {
                        return _c(
                          "div",
                          { key: index, staticClass: "my-videos" },
                          [
                            _c("img", {
                              staticClass: "video-img",
                              attrs: {
                                src: video.image
                                  ? video.image
                                  : "assets/images/video-img.jpg",
                                alt: ""
                              }
                            }),
                            _vm._v(" "),
                            _c("div", { staticClass: "info" }, [
                              _c("h4", [_vm._v(_vm._s(video.title))]),
                              _vm._v(" "),
                              _c("div", { staticClass: "icons-wrapper" }, [
                                _c("div", [
                                  _c("img", {
                                    attrs: {
                                      src: "assets/images/category-icon.png",
                                      alt: ""
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("span", [
                                    _vm._v(
                                      "Category: " + _vm._s(video.genres_name)
                                    )
                                  ])
                                ]),
                                _vm._v(" "),
                                _c("div", [
                                  _c("img", {
                                    attrs: {
                                      src: "assets/images/views-icon.png",
                                      alt: ""
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("span", [_vm._v(_vm._s(video.views))])
                                ]),
                                _vm._v(" "),
                                _c("div", [
                                  _c("img", {
                                    attrs: {
                                      src: "assets/images/publish-icon.png",
                                      alt: ""
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("span", [
                                    _vm._v(
                                      "Published On: " +
                                        _vm._s(video.published_at)
                                    )
                                  ])
                                ]),
                                _vm._v(" "),
                                _c("div", [
                                  _c("i", { staticClass: "fa fa-money-bill" }),
                                  _vm._v(" "),
                                  _c("span", [
                                    _vm._v(
                                      "Tips Earned: $" +
                                        _vm._s(
                                          video.earning_transaction_total &&
                                            video.earning_transaction_total
                                              .length > 1
                                            ? video.earning_transaction_total
                                                .total
                                            : 0
                                        ) +
                                        "\n                        "
                                    )
                                  ])
                                ])
                              ])
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "ml-auto" },
                              [
                                _c(
                                  "router-link",
                                  {
                                    attrs: {
                                      to: "/video-play/" + video.hash_id
                                    }
                                  },
                                  [
                                    _c(
                                      "a",
                                      { staticClass: "btn-default green-btn" },
                                      [_vm._v("Details")]
                                    )
                                  ]
                                )
                              ],
                              1
                            )
                          ]
                        )
                      })
                    ],
                    2
                  )
                ])
              ])
            ])
          ])
        ])
      ])
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", [
      _c("ul", { staticClass: "social-links" }, [
        _c("li", [
          _c("a", { attrs: { href: "#" } }, [
            _c("i", { staticClass: "fab fa-facebook-f" })
          ])
        ]),
        _vm._v(" "),
        _c("li", [
          _c("a", { attrs: { href: "#" } }, [
            _c("i", { staticClass: "fab fa-instagram" })
          ])
        ]),
        _vm._v(" "),
        _c("li", [
          _c("a", { attrs: { href: "#" } }, [
            _c("i", { staticClass: "fab fa-twitter" })
          ])
        ]),
        _vm._v(" "),
        _c("li", [
          _c("a", { attrs: { href: "#" } }, [
            _c("i", { staticClass: "fab fa-linkedin-in" })
          ])
        ])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/ArtistProfile.vue":
/*!**********************************************!*\
  !*** ./resources/js/views/ArtistProfile.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ArtistProfile_vue_vue_type_template_id_593fde5a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ArtistProfile.vue?vue&type=template&id=593fde5a& */ "./resources/js/views/ArtistProfile.vue?vue&type=template&id=593fde5a&");
/* harmony import */ var _ArtistProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ArtistProfile.vue?vue&type=script&lang=js& */ "./resources/js/views/ArtistProfile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ArtistProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ArtistProfile_vue_vue_type_template_id_593fde5a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ArtistProfile_vue_vue_type_template_id_593fde5a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/ArtistProfile.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/ArtistProfile.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/views/ArtistProfile.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ArtistProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./ArtistProfile.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/ArtistProfile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ArtistProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/ArtistProfile.vue?vue&type=template&id=593fde5a&":
/*!*****************************************************************************!*\
  !*** ./resources/js/views/ArtistProfile.vue?vue&type=template&id=593fde5a& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ArtistProfile_vue_vue_type_template_id_593fde5a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./ArtistProfile.vue?vue&type=template&id=593fde5a& */ "./node_modules/laravel-mix/node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/ArtistProfile.vue?vue&type=template&id=593fde5a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_laravel_mix_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ArtistProfile_vue_vue_type_template_id_593fde5a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_laravel_mix_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ArtistProfile_vue_vue_type_template_id_593fde5a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);