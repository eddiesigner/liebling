(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/app"],{

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var css_vars_ponyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css-vars-ponyfill */ "./node_modules/css-vars-ponyfill/dist/css-vars-ponyfill.esm.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lozad__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lozad */ "./node_modules/lozad/dist/lozad.min.js");
/* harmony import */ var lozad__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lozad__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var headroom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! headroom.js */ "./node_modules/headroom.js/dist/headroom.js");
/* harmony import */ var headroom_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(headroom_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var slick_carousel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! slick-carousel */ "./node_modules/slick-carousel/slick/slick.js");
/* harmony import */ var slick_carousel__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(slick_carousel__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var tippy_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tippy.js */ "./node_modules/tippy.js/esm/index.all.js");
/* harmony import */ var shave__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! shave */ "./node_modules/shave/dist/shave.es.js");
/* harmony import */ var aos__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! aos */ "./node_modules/aos/dist/aos.js");
/* harmony import */ var aos__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(aos__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var fuse_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! fuse.js */ "./node_modules/fuse.js/dist/fuse.js");
/* harmony import */ var fuse_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(fuse_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./helpers */ "./js/helpers.js");










Object(css_vars_ponyfill__WEBPACK_IMPORTED_MODULE_0__["default"])({}); // Your web app's Firebase configuration

var firebaseConfig = {
  apiKey: "AIzaSyBpcd-h19ooAHrfy0fxg1kQvAnkv4lETo4",
  authDomain: "mobilelabs-in.firebaseapp.com",
  databaseURL: "https://mobilelabs-in.firebaseio.com",
  projectId: "mobilelabs-in",
  storageBucket: "mobilelabs-in.appspot.com",
  messagingSenderId: "681943753189",
  appId: "1:681943753189:web:82e2a230c076bc46b48f0c",
  measurementId: "G-TTWTBSRFT7"
};
jquery__WEBPACK_IMPORTED_MODULE_1___default()(document).ready(function () {
  if (Object(_helpers__WEBPACK_IMPORTED_MODULE_9__["isRTL"])()) {
    jquery__WEBPACK_IMPORTED_MODULE_1___default()('html').attr('dir', 'rtl').addClass('rtl');
  }

  var $body = jquery__WEBPACK_IMPORTED_MODULE_1___default()('body');
  var $header = jquery__WEBPACK_IMPORTED_MODULE_1___default()('.js-header');
  var $openMenu = jquery__WEBPACK_IMPORTED_MODULE_1___default()('.js-open-menu');
  var $closeMenu = jquery__WEBPACK_IMPORTED_MODULE_1___default()('.js-close-menu');
  var $menu = jquery__WEBPACK_IMPORTED_MODULE_1___default()('.js-menu');
  var $toggleSubmenu = jquery__WEBPACK_IMPORTED_MODULE_1___default()('.js-toggle-submenu');
  var $submenuOption = jquery__WEBPACK_IMPORTED_MODULE_1___default()('.js-submenu-option')[0];
  var $submenu = jquery__WEBPACK_IMPORTED_MODULE_1___default()('.js-submenu');
  var $recentArticles = jquery__WEBPACK_IMPORTED_MODULE_1___default()('.js-recent-articles');
  var $openSearch = jquery__WEBPACK_IMPORTED_MODULE_1___default()('.js-open-search');
  var $closeSearch = jquery__WEBPACK_IMPORTED_MODULE_1___default()('.js-close-search');
  var $search = jquery__WEBPACK_IMPORTED_MODULE_1___default()('.js-search');
  var $inputSearch = jquery__WEBPACK_IMPORTED_MODULE_1___default()('.js-input-search');
  var $searchResults = jquery__WEBPACK_IMPORTED_MODULE_1___default()('.js-search-results');
  var $searchNoResults = jquery__WEBPACK_IMPORTED_MODULE_1___default()('.js-no-results');
  var $toggleDarkMode = jquery__WEBPACK_IMPORTED_MODULE_1___default()('.js-toggle-darkmode');
  var $closeNotification = jquery__WEBPACK_IMPORTED_MODULE_1___default()('.js-notification-close');
  var currentSavedTheme = localStorage.getItem('theme');
  var fuse = null;
  var submenuIsOpen = false;

  function showSubmenu() {
    $header.addClass('submenu-is-active');
    $toggleSubmenu.addClass('active');
    $submenu.removeClass('closed').addClass('opened');
  }

  function hideSubmenu() {
    $header.removeClass('submenu-is-active');
    $toggleSubmenu.removeClass('active');
    $submenu.removeClass('opened').addClass('closed');
  }

  function toggleScrollVertical() {
    $body.toggleClass('no-scroll-y');
  }

  function trySearchFeature() {
    if (typeof ghostSearchApiKey !== 'undefined') {
      getAllPosts(ghostHost, ghostSearchApiKey);
    } else {
      $openSearch.css('visibility', 'hidden');
      $closeSearch.remove();
      $search.remove();
    }
  }

  function getAllPosts(host, key) {
    var api = new GhostContentAPI({
      url: host,
      key: key,
      version: 'v2'
    });
    var allPosts = [];
    var fuseOptions = {
      shouldSort: true,
      threshold: 0,
      location: 0,
      distance: 100,
      tokenize: true,
      matchAllTokens: false,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['title', 'custom_excerpt', 'html']
    };
    api.posts.browse({
      limit: 'all',
      fields: 'id, title, url, published_at, custom_excerpt, html'
    }).then(function (posts) {
      for (var i = 0, len = posts.length; i < len; i++) {
        allPosts.push(posts[i]);
      }

      fuse = new fuse_js__WEBPACK_IMPORTED_MODULE_8___default.a(allPosts, fuseOptions);
    })["catch"](function (err) {
      console.log(err);
    });
  }

  var showNotification = function showNotification(typeNotification) {
    var $notification = jquery__WEBPACK_IMPORTED_MODULE_1___default()(".js-alert[data-notification=\"".concat(typeNotification, "\"]"));
    $notification.addClass('opened');
    setTimeout(function () {
      closeNotification($notification);
    }, 5000);
  };

  var closeNotification = function closeNotification($notification) {
    $notification.removeClass('opened');
    var url = window.location.toString();

    if (url.indexOf('?') > 0) {
      var cleanUrl = url.substring(0, url.indexOf('?'));
      window.history.replaceState({}, document.title, cleanUrl);
    }
  };

  var checkForActionParameter = function checkForActionParameter() {
    var action = Object(_helpers__WEBPACK_IMPORTED_MODULE_9__["getParameterByName"])('action');
    var stripe = Object(_helpers__WEBPACK_IMPORTED_MODULE_9__["getParameterByName"])('stripe');

    if (action === 'subscribe') {
      showNotification('subscribe');
    }

    if (action === 'signup') {
      window.location = "".concat(ghostHost, "/signup/?action=checkout");
    }

    if (action === 'checkout') {
      showNotification('signup');
    }

    if (action === 'signin') {
      showNotification('signin');
    }

    if (stripe === 'success') {
      showNotification('checkout');
    }
  };

  $openMenu.click(function () {
    $header.addClass('mobile-menu-opened');
    $menu.addClass('opened');
    toggleScrollVertical();
  });
  $closeMenu.click(function () {
    $header.removeClass('mobile-menu-opened');
    $menu.removeClass('opened');
    toggleScrollVertical();
  });
  $toggleSubmenu.click(function () {
    submenuIsOpen = !submenuIsOpen;

    if (submenuIsOpen) {
      showSubmenu();
    } else {
      hideSubmenu();
    }
  });
  $openSearch.click(function () {
    $search.addClass('opened');
    setTimeout(function () {
      $inputSearch.focus();
    }, 400);
    toggleScrollVertical();
  });
  $closeSearch.click(function () {
    $inputSearch.blur();
    $search.removeClass('opened');
    toggleScrollVertical();
  });
  $inputSearch.keyup(function () {
    if ($inputSearch.val().length > 0 && fuse) {
      var results = fuse.search($inputSearch.val());
      var htmlString = '';

      if (results.length > 0) {
        for (var i = 0, len = results.length; i < len; i++) {
          htmlString += "\n          <article class=\"m-result\">            <a href=\"".concat(results[i].url, "\" class=\"m-result__link\">              <h3 class=\"m-result__title\">").concat(results[i].title, "</h3>              <span class=\"m-result__date\">").concat(Object(_helpers__WEBPACK_IMPORTED_MODULE_9__["formatDate"])(results[i].published_at), "</span>            </a>          </article>");
        }

        $searchNoResults.hide();
        $searchResults.html(htmlString);
        $searchResults.show();
      } else {
        $searchResults.html('');
        $searchResults.hide();
        $searchNoResults.show();
      }
    } else {
      $searchResults.html('');
      $searchResults.hide();
      $searchNoResults.hide();
    }
  });
  $toggleDarkMode.change(function () {
    if ($toggleDarkMode.is(':checked')) {
      jquery__WEBPACK_IMPORTED_MODULE_1___default()('html').attr('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_1___default()('html').attr('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });
  $closeNotification.click(function () {
    closeNotification(jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).parent());
  });
  jquery__WEBPACK_IMPORTED_MODULE_1___default()(window).click(function (e) {
    if (submenuIsOpen) {
      if ($submenuOption && !$submenuOption.contains(e.target)) {
        submenuIsOpen = false;
        hideSubmenu();
      }
    }
  });

  if (currentSavedTheme) {
    jquery__WEBPACK_IMPORTED_MODULE_1___default()('html').attr('data-theme', currentSavedTheme);

    if (currentSavedTheme === 'dark') {
      $toggleDarkMode.attr('checked', true);
    }
  } else {
    if (Object(_helpers__WEBPACK_IMPORTED_MODULE_9__["isDarkMode"])()) {
      $toggleDarkMode.attr('checked', true);
    }
  }

  var headerElement = document.querySelector('.js-header');

  if (headerElement) {
    var headroom = new headroom_js__WEBPACK_IMPORTED_MODULE_3___default.a(headerElement, {
      tolerance: {
        down: 10,
        up: 20
      },
      offset: 15
    });
    headroom.init();
  }

  if ($recentArticles.length > 0) {
    $recentArticles.on('init', function () {
      Object(shave__WEBPACK_IMPORTED_MODULE_6__["default"])('.js-recent-article-title', 50);
    });
    $recentArticles.slick({
      adaptiveHeight: true,
      arrows: false,
      infinite: false,
      mobileFirst: true,
      variableWidth: true,
      rtl: Object(_helpers__WEBPACK_IMPORTED_MODULE_9__["isRTL"])()
    });
  }

  if (typeof disableFadeAnimation === 'undefined' || !disableFadeAnimation) {
    aos__WEBPACK_IMPORTED_MODULE_7___default.a.init({
      once: true,
      startEvent: 'DOMContentLoaded'
    });
  } else {
    jquery__WEBPACK_IMPORTED_MODULE_1___default()('[data-aos]').addClass('no-aos-animation');
  }

  var observer = lozad__WEBPACK_IMPORTED_MODULE_2___default()('.lozad', {
    loaded: function loaded(el) {
      el.classList.add('loaded');
    }
  });
  observer.observe();
  Object(tippy_js__WEBPACK_IMPORTED_MODULE_5__["default"])('.js-tooltip');
  Object(shave__WEBPACK_IMPORTED_MODULE_6__["default"])('.js-article-card-title', 100);
  Object(shave__WEBPACK_IMPORTED_MODULE_6__["default"])('.js-article-card-title-no-image', 250);
  checkForActionParameter();
  trySearchFeature();
});

/***/ }),

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

/***/ 1:
/*!*************************!*\
  !*** multi ./js/app.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/vasanth/Documents/workspace/mobilelabs/liebling/src/js/app.js */"./js/app.js");


/***/ })

},[[1,"/js/manifest","/js/vendor"]]]);