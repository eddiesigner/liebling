(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/home"],{

/***/ "./js/home.js":
/*!********************!*\
  !*** ./js/home.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var shave__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! shave */ "./node_modules/shave/dist/shave.es.js");
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper */ "./node_modules/swiper/swiper.esm.js");



jquery__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  var $featuredSlider = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-featured-slider');

  if ($featuredSlider.length > 0) {
    var numSlides = $featuredSlider.find('.swiper-slide').length;
    var featuredSwiper = new swiper__WEBPACK_IMPORTED_MODULE_2__["default"]('.js-featured-slider', {
      modules: [swiper__WEBPACK_IMPORTED_MODULE_2__["Navigation"], swiper__WEBPACK_IMPORTED_MODULE_2__["A11y"]],
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      a11y: true,
      on: {
        init: function init() {
          Object(shave__WEBPACK_IMPORTED_MODULE_1__["default"])('.js-featured-article-title', 200);
        }
      }
    });

    if (numSlides === 1) {
      $featuredSlider.find('.js-featured-slider-button').remove();
    }
  }

  Object(shave__WEBPACK_IMPORTED_MODULE_1__["default"])('.js-featured-article-title', 200);
});

/***/ }),

/***/ 2:
/*!**************************!*\
  !*** multi ./js/home.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/eddie/Code/own/liebling/src/js/home.js */"./js/home.js");


/***/ })

},[[2,"/js/manifest","/js/vendor"]]]);