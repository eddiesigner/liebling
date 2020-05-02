(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/post"],{

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

/***/ "./js/post.js":
/*!********************!*\
  !*** ./js/post.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var slick_carousel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! slick-carousel */ "./node_modules/slick-carousel/slick/slick.js");
/* harmony import */ var slick_carousel__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(slick_carousel__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var stickybits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! stickybits */ "./node_modules/stickybits/dist/stickybits.es.js");
/* harmony import */ var medium_zoom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! medium-zoom */ "./node_modules/medium-zoom/dist/medium-zoom.esm.js");
/* harmony import */ var fitvids__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! fitvids */ "./node_modules/fitvids/index.js");
/* harmony import */ var fitvids__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(fitvids__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var shave__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! shave */ "./node_modules/shave/dist/shave.es.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./helpers */ "./js/helpers.js");







var $aosWrapper = null;
var $progressCircle = null;
var lastScrollingY = window.pageYOffset;
var lastWindowHeight = 0;
var lastDocumentHeight = 0;
var circumference = 0;
var isTicking = false;

function onScrolling() {
  lastScrollingY = window.pageYOffset;
  requestTicking();
}

function adjustShare(timeout) {
  if (!Object(_helpers__WEBPACK_IMPORTED_MODULE_6__["isMobile"])('1023px')) {
    Object(stickybits__WEBPACK_IMPORTED_MODULE_2__["default"])('.js-sticky', {
      stickyBitStickyOffset: 100
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').removeClass('share-menu-displayed');
  } else {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').addClass('share-menu-displayed');
    setTimeout(function () {
      $aosWrapper.removeAttr('data-aos');
    }, timeout);
  }
}

function onResizing() {
  setHeights();
  adjustShare(100);
  setTimeout(function () {
    setCircleStyles();
    requestTicking();
  }, 200);
}

function requestTicking() {
  if (!isTicking) {
    requestAnimationFrame(updating);
  }

  isTicking = true;
}

function updating() {
  var progressMax = lastDocumentHeight - lastWindowHeight;
  var percent = Math.ceil(lastScrollingY / progressMax * 100);

  if (percent <= 100) {
    setProgress(percent);
  }

  isTicking = false;
}

function setHeights() {
  lastWindowHeight = window.innerHeight;
  lastDocumentHeight = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).height();
}

function setCircleStyles() {
  var svgWidth = $progressCircle.parent().width();
  var radiusCircle = svgWidth / 2;
  var borderWidth = Object(_helpers__WEBPACK_IMPORTED_MODULE_6__["isMobile"])() ? 2 : 3;
  $progressCircle.parent().attr('viewBox', "0 0 ".concat(svgWidth, " ").concat(svgWidth));
  $progressCircle.attr('stroke-width', borderWidth);
  $progressCircle.attr('r', radiusCircle - (borderWidth - 1));
  $progressCircle.attr('cx', radiusCircle);
  $progressCircle.attr('cy', radiusCircle);
  circumference = radiusCircle * 2 * Math.PI;
  $progressCircle[0].style.strokeDasharray = "".concat(circumference, " ").concat(circumference);
  $progressCircle[0].style.strokeDashoffset = circumference;
}

function setProgress(percent) {
  if (percent <= 100) {
    var offset = circumference - percent / 100 * circumference;
    $progressCircle[0].style.strokeDashoffset = offset;
  }
}

function prepareProgressCircle() {
  $progressCircle = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-progress');
  setHeights();
  setCircleStyles();
  updating();
  setTimeout(function () {
    $progressCircle.parent().css('opacity', 1);
  }, 300);
}

jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).ready(function () {
  $aosWrapper = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-aos-wrapper');
  var $scrollButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-scrolltop');
  var $loadComments = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-load-comments');
  var $commentsIframe = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-comments-iframe');
  var $recommendedArticles = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-recommended-articles');
  fitvids__WEBPACK_IMPORTED_MODULE_4___default()('.js-post-content');

  function adjustImageGallery() {
    var images = document.querySelectorAll('.kg-gallery-image img');

    for (var i = 0, len = images.length; i < len; i++) {
      var container = images[i].closest('.kg-gallery-image');
      var width = images[i].attributes.width.value;
      var height = images[i].attributes.height.value;
      var ratio = width / height;
      container.style.flex = "".concat(ratio, " 1 0%");
    }
  }

  adjustImageGallery();
  adjustShare(1000);

  if ($recommendedArticles.length > 0) {
    $recommendedArticles.on('init', function () {
      prepareProgressCircle();
      Object(shave__WEBPACK_IMPORTED_MODULE_5__["default"])('.js-article-card-title', 100);
      Object(shave__WEBPACK_IMPORTED_MODULE_5__["default"])('.js-article-card-title-no-image', 250);
    });
    $recommendedArticles.slick({
      arrows: true,
      infinite: true,
      prevArrow: '<button class="m-icon-button filled in-recommended-articles slick-prev" aria-label="Previous"><span class="icon-arrow-left"></span></button>',
      nextArrow: '<button class="m-icon-button filled in-recommended-articles slick-next" aria-label="Next"><span class="icon-arrow-right"></span></button>',
      mobileFirst: true,
      responsive: [{
        breakpoint: 720,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 1023,
        settings: {
          arrows: false,
          slidesToShow: 3
        }
      }],
      rtl: Object(_helpers__WEBPACK_IMPORTED_MODULE_6__["isRTL"])()
    });
  }

  $scrollButton.click(function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').animate({
      scrollTop: 0
    }, 500);
  });
  $loadComments.click(function () {
    $loadComments.parent().hide();
    $commentsIframe.fadeIn('slow');
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-post-content').find('img').each(function () {
    if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('figure').hasClass('kg-bookmark-card')) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).addClass('js-zoomable');
    }

    var $figcaption = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().find('figcaption');

    if ($figcaption) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('alt', $figcaption.text());
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('alt', '');
    }
  });
  Object(_helpers__WEBPACK_IMPORTED_MODULE_6__["makeImagesZoomable"])(jquery__WEBPACK_IMPORTED_MODULE_0___default.a, medium_zoom__WEBPACK_IMPORTED_MODULE_3__["default"]);
  window.addEventListener('scroll', onScrolling, {
    passive: true
  });
  window.addEventListener('resize', onResizing, {
    passive: true
  });
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('load', function () {
  prepareProgressCircle();
});

/***/ }),

/***/ 3:
/*!**************************!*\
  !*** multi ./js/post.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/vasanth/Documents/workspace/mobilelabs/liebling/src/js/post.js */"./js/post.js");


/***/ })

},[[3,"/js/manifest","/js/vendor"]]]);