(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/home"],{

/***/ "./js/helpers.js":
/*!***********************!*\
  !*** ./js/helpers.js ***!
  \***********************/
/*! exports provided: isRTL, isMobile, isDarkMode, formatDate, getParameterByName, makeImagesZoomable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isRTL", function() { return isRTL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMobile", function() { return isMobile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDarkMode", function() { return isDarkMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDate", function() { return formatDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParameterByName", function() { return getParameterByName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeImagesZoomable", function() { return makeImagesZoomable; });
var isRTL = function isRTL() {
  var $html = document.querySelector('html');
  return ['ar', 'he', 'fa'].includes($html.getAttribute('lang'));
};
var isMobile = function isMobile() {
  var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '768px';
  return window.matchMedia("(max-width: ".concat(width, ")")).matches;
};
var isDarkMode = function isDarkMode() {
  var darkModeMatcher = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  return darkModeMatcher && darkModeMatcher.matches;
};
var formatDate = function formatDate(date) {
  if (date) {
    return new Date(date).toLocaleDateString(document.documentElement.lang, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  return '';
};
var getParameterByName = function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp("[?&]".concat(name, "(=([^&#]*)|&|#|$)"));
  var results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};
var makeImagesZoomable = function makeImagesZoomable($, mediumZoom) {
  var zoom = mediumZoom('.js-zoomable');
  zoom.on('open', function (event) {
    if (isMobile() && $(event.target).parent().hasClass('kg-gallery-image')) {
      setTimeout(function () {
        var $mediumZoomImage = $('.medium-zoom-image--opened');
        var transform = $mediumZoomImage[0].style.transform;
        var scale = transform.substr(0, transform.indexOf(' '));
        var scaleValue = parseFloat(scale.substr(scale.indexOf('(') + 1).split(')')[0]);
        var translate = transform.substr(transform.indexOf(' ') + 1);
        var translateY = parseFloat(translate.split(',')[1]);
        var newTranslateY = translateY < 0 ? scaleValue * translateY + translateY : scaleValue * translateY - translateY;
        var newTransform = "scale(1) translate3d(0, ".concat(newTranslateY, "px, 0)");
        $mediumZoomImage.addClass('medium-zoom-image-mobile');
        $mediumZoomImage[0].style.transform = newTransform;
      }, 10);
    }
  });
  zoom.on('close', function () {
    if (isMobile() && $(event.target).parent().hasClass('kg-gallery-image')) {
      var $mediumZoomImage = $('.medium-zoom-image');
      $mediumZoomImage.removeClass('medium-zoom-image-mobile');
    }
  });
};

/***/ }),

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
/* harmony import */ var slick_carousel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! slick-carousel */ "./node_modules/slick-carousel/slick/slick.js");
/* harmony import */ var slick_carousel__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(slick_carousel__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var shave__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! shave */ "./node_modules/shave/dist/shave.es.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers */ "./js/helpers.js");




jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).ready(function () {
  var $featuredArticles = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-featured-articles');

  if ($featuredArticles.length > 0) {
    $featuredArticles.on('init', function () {
      Object(shave__WEBPACK_IMPORTED_MODULE_2__["default"])('.js-featured-article-title', 200);
    });
    $featuredArticles.slick({
      arrows: true,
      infinite: true,
      prevArrow: '<button class="m-icon-button in-featured-articles slick-prev" aria-label="Previous"><span class="icon-arrow-left"></span></button>',
      nextArrow: '<button class="m-icon-button in-featured-articles slick-next" aria-label="Next"><span class="icon-arrow-right"></span></button>',
      mobileFirst: true,
      rtl: Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["isRTL"])()
    });
    setTimeout(function () {
      $featuredArticles.slick('setPosition');
    }, 350);
  }
});

/***/ }),

/***/ 2:
/*!**************************!*\
  !*** multi ./js/home.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/vasanth/Documents/workspace/mobilelabs/liebling/src/js/home.js */"./js/home.js");


/***/ })

},[[2,"/js/manifest","/js/vendor"]]]);