(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/home"],{

/***/ "./js/helpers.js":
/*!***********************!*\
  !*** ./js/helpers.js ***!
  \***********************/
/*! exports provided: isRTL, isMobile, isDarkMode, formatDate, getParameterByName, adjustImageGallery, managePostImages, makeImagesZoomable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isRTL", function() { return isRTL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMobile", function() { return isMobile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDarkMode", function() { return isDarkMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDate", function() { return formatDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParameterByName", function() { return getParameterByName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adjustImageGallery", function() { return adjustImageGallery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "managePostImages", function() { return managePostImages; });
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
var adjustImageGallery = function adjustImageGallery() {
  var images = document.querySelectorAll('.kg-gallery-image img');

  for (var i = 0, len = images.length; i < len; i++) {
    var container = images[i].closest('.kg-gallery-image');
    var width = images[i].attributes.width.value;
    var height = images[i].attributes.height.value;
    var ratio = width / height;
    container.style.flex = "".concat(ratio, " 1 0%");
  }
};
var managePostImages = function managePostImages($) {
  $('.js-post-content').find('img').each(function () {
    if (!$(this).closest('figure').hasClass('kg-bookmark-card') && !$(this).parent().is('a')) {
      $(this).addClass('js-zoomable');
    }

    var $figcaption = $(this).parent().find('figcaption');

    if ($figcaption) {
      $(this).attr('alt', $figcaption.text());
    } else {
      $(this).attr('alt', '');
    }
  });
};
var makeImagesZoomable = function makeImagesZoomable($, mediumZoom) {
  var zoom = mediumZoom('.js-zoomable');
  zoom.on('opened', function () {
    setTimeout(function () {
      var $mediumZoomImages = $('.medium-zoom-image--opened');

      if ($mediumZoomImages.length > 1) {
        $mediumZoomImages.last().hide();
      }
    }, 10);
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
/* harmony import */ var shave__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! shave */ "./node_modules/shave/dist/shave.es.js");
/* harmony import */ var _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @glidejs/glide/dist/glide.modular.esm */ "./node_modules/@glidejs/glide/dist/glide.modular.esm.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers */ "./js/helpers.js");




jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).ready(function () {
  var $featuredSlider = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-featured-slider');

  if ($featuredSlider.length > 0) {
    var numSlides = $featuredSlider.find('.js-featured-slide').length;
    var featuredSlider = new _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_2__["default"]('.js-featured-slider', {
      type: 'slider',
      rewind: false,
      gap: 0,
      swipeThreshold: false,
      dragThreshold: false,
      direction: Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["isRTL"])() ? 'rtl' : 'ltr',
      breakpoints: {
        768: {
          swipeThreshold: numSlides === 1 ? false : 80,
          dragThreshold: numSlides === 1 ? false : 120
        }
      }
    });

    var ArrowDisabler = function ArrowDisabler(Glide, Components) {
      var controlClasses = {
        'controls': 'js-featured-slider-controls',
        'backArrow': 'js-featured-slider-previous',
        'nextArrow': 'js-featured-slider-next'
      };
      return {
        mount: function mount() {
          if (Glide.settings.rewind || numSlides === 1) {
            return;
          }

          Glide.on(['mount.after', 'run'], function () {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = Components.Controls.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var controlItem = _step.value;

                if (!controlItem.className.includes(controlClasses.controls)) {
                  continue;
                }

                var left = controlItem.querySelector(".".concat(controlClasses.backArrow));

                if (left) {
                  if (Glide.index === 0) {
                    left.setAttribute('disabled', '');
                  } else {
                    left.removeAttribute('disabled');
                  }
                }

                var right = controlItem.querySelector(".".concat(controlClasses.nextArrow));

                if (right) {
                  var lastSlideIndex = Glide.settings.bound ? Glide.index + (Glide.settings.perView - 1) : Glide.index;

                  if (lastSlideIndex === Components.Sizes.length - 1) {
                    right.setAttribute('disabled', '');
                  } else {
                    right.removeAttribute('disabled');
                  }
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          });
        }
      };
    };

    if (numSlides === 1) {
      $featuredSlider.find('.js-featured-slider-controls').remove();
    }

    featuredSlider.on('mount.after', function () {
      Object(shave__WEBPACK_IMPORTED_MODULE_1__["default"])('.js-featured-article-title', 200);
    });
    featuredSlider.mount({
      Controls: _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_2__["Controls"],
      Swipe: _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_2__["Swipe"],
      Breakpoints: _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_2__["Breakpoints"],
      ArrowDisabler: ArrowDisabler
    });
    setTimeout(function () {
      window.dispatchEvent(new Event('resize'));
    }, 350);
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