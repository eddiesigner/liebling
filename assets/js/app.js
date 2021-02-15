(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/app"],{

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var headroom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! headroom.js */ "./node_modules/headroom.js/dist/headroom.js");
/* harmony import */ var headroom_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(headroom_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @glidejs/glide/dist/glide.modular.esm */ "./node_modules/@glidejs/glide/dist/glide.modular.esm.js");
/* harmony import */ var tippy_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tippy.js */ "./node_modules/tippy.js/esm/index.all.js");
/* harmony import */ var shave__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! shave */ "./node_modules/shave/dist/shave.es.js");
/* harmony import */ var aos__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! aos */ "./node_modules/aos/dist/aos.js");
/* harmony import */ var aos__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(aos__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var fuse_js_dist_fuse_basic_esm_min_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! fuse.js/dist/fuse.basic.esm.min.js */ "./node_modules/fuse.js/dist/fuse.basic.esm.min.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./helpers */ "./js/helpers.js");








jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).ready(function () {
  if (Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["isRTL"])()) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').attr('dir', 'rtl').addClass('rtl');
  }

  var $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body');
  var $header = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-header');
  var $openMenu = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-open-menu');
  var $closeMenu = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-close-menu');
  var $menu = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-menu');
  var $toggleSubmenu = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-toggle-submenu');
  var $submenuOption = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-submenu-option')[0];
  var $submenu = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-submenu');
  var $recentSlider = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-recent-slider');
  var $openSecondaryMenu = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-open-secondary-menu');
  var $openSearch = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-open-search');
  var $closeSearch = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-close-search');
  var $search = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-search');
  var $inputSearch = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-input-search');
  var $searchResults = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-search-results');
  var $searchNoResults = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-no-results');
  var $toggleDarkMode = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-toggle-darkmode');
  var $closeNotification = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-notification-close');
  var $mainNav = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-main-nav');
  var $mainNavLeft = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.js-main-nav-left');
  var currentSavedTheme = localStorage.getItem('theme');
  var fuse = null;
  var submenuIsOpen = false;
  var secondaryMenuTippy = null;

  var showSubmenu = function showSubmenu() {
    $header.addClass('submenu-is-active');
    $toggleSubmenu.addClass('active');
    $submenu.removeClass('closed').addClass('opened');
  };

  var hideSubmenu = function hideSubmenu() {
    $header.removeClass('submenu-is-active');
    $toggleSubmenu.removeClass('active');
    $submenu.removeClass('opened').addClass('closed');
  };

  var toggleScrollVertical = function toggleScrollVertical() {
    $body.toggleClass('no-scroll-y');
  };

  var trySearchFeature = function trySearchFeature() {
    if (typeof ghostSearchApiKey !== 'undefined') {
      getAllPosts(ghostHost, ghostSearchApiKey);
    } else {
      $openSearch.css('visibility', 'hidden');
      $closeSearch.remove();
      $search.remove();
    }
  };

  var getAllPosts = function getAllPosts(host, key) {
    var api = new GhostContentAPI({
      url: host,
      key: key,
      version: 'v2'
    });
    var allPosts = [];
    var fuseOptions = {
      shouldSort: true,
      ignoreLocation: true,
      findAllMatches: true,
      includeScore: true,
      minMatchCharLength: 2,
      keys: ['title', 'custom_excerpt', 'tags.name']
    };
    api.posts.browse({
      limit: 'all',
      include: 'tags',
      fields: 'id, title, url, published_at, custom_excerpt'
    }).then(function (posts) {
      for (var i = 0, len = posts.length; i < len; i++) {
        allPosts.push(posts[i]);
      }

      fuse = new fuse_js_dist_fuse_basic_esm_min_js__WEBPACK_IMPORTED_MODULE_6__["default"](allPosts, fuseOptions);
    })["catch"](function (err) {
      console.log(err);
    });
  };

  var showNotification = function showNotification(typeNotification) {
    var $notification = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".js-alert[data-notification=\"".concat(typeNotification, "\"]"));
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
    var action = Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["getParameterByName"])('action');
    var stripe = Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["getParameterByName"])('stripe');

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

  var toggleDesktopTopbarOverflow = function toggleDesktopTopbarOverflow(disableOverflow) {
    if (!Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["isMobile"])()) {
      if (disableOverflow) {
        $mainNav.addClass('toggle-overflow');
        $mainNavLeft.addClass('toggle-overflow');
      } else {
        $mainNav.removeClass('toggle-overflow');
        $mainNavLeft.removeClass('toggle-overflow');
      }
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
      var bestResults = results.filter(function (result) {
        if (result.score <= 0.5) {
          return result;
        }
      });
      var htmlString = '';

      if (bestResults.length > 0) {
        for (var i = 0, len = bestResults.length; i < len; i++) {
          htmlString += "\n          <article class=\"m-result\">            <a href=\"".concat(bestResults[i].item.url, "\" class=\"m-result__link\">              <h3 class=\"m-result__title\">").concat(bestResults[i].item.title, "</h3>              <span class=\"m-result__date\">").concat(Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["formatDate"])(bestResults[i].item.published_at), "</span>            </a>          </article>");
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
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').attr('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').attr('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });
  $toggleDarkMode.hover(function () {
    toggleDesktopTopbarOverflow(true);
  }, function () {
    toggleDesktopTopbarOverflow(false);
  });
  $closeNotification.click(function () {
    closeNotification(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent());
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).click(function (e) {
    if (submenuIsOpen) {
      if ($submenuOption && !$submenuOption.contains(e.target)) {
        submenuIsOpen = false;
        hideSubmenu();
      }
    }
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).keyup(function (e) {
    if (e.key === 'Escape' && $search.hasClass('opened')) {
      $closeSearch.click();
    }
  });

  if (currentSavedTheme) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').attr('data-theme', currentSavedTheme);

    if (currentSavedTheme === 'dark') {
      $toggleDarkMode.attr('checked', true);
    }
  } else {
    if (Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["isDarkMode"])()) {
      $toggleDarkMode.attr('checked', true);
    }
  }

  if ($header.length > 0) {
    var headroom = new headroom_js__WEBPACK_IMPORTED_MODULE_1___default.a($header[0], {
      tolerance: {
        down: 10,
        up: 20
      },
      offset: 15,
      onUnpin: function onUnpin() {
        if (!Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["isMobile"])() && secondaryMenuTippy) {
          var desktopSecondaryMenuTippy = secondaryMenuTippy[0];

          if (desktopSecondaryMenuTippy && desktopSecondaryMenuTippy.state.isVisible) {
            desktopSecondaryMenuTippy.hide();
          }
        }
      }
    });
    headroom.init();
  }

  if ($recentSlider.length > 0) {
    var recentSlider = new _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_2__["default"]('.js-recent-slider', {
      type: 'slider',
      rewind: false,
      perView: 4,
      swipeThreshold: false,
      dragThreshold: false,
      gap: 0,
      direction: Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["isRTL"])() ? 'rtl' : 'ltr',
      breakpoints: {
        1024: {
          perView: 3,
          swipeThreshold: 80,
          dragThreshold: 120
        },
        768: {
          perView: 2,
          swipeThreshold: 80,
          dragThreshold: 120,
          peek: {
            before: 0,
            after: 115
          }
        },
        568: {
          perView: 1,
          swipeThreshold: 80,
          dragThreshold: 120,
          peek: {
            before: 0,
            after: 115
          }
        }
      }
    });
    recentSlider.on('mount.after', function () {
      Object(shave__WEBPACK_IMPORTED_MODULE_4__["default"])('.js-recent-article-title', 50);
    });
    recentSlider.mount({
      Swipe: _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_2__["Swipe"],
      Breakpoints: _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_2__["Breakpoints"]
    });
  }

  if (typeof disableFadeAnimation === 'undefined' || !disableFadeAnimation) {
    aos__WEBPACK_IMPORTED_MODULE_5___default.a.init({
      once: true,
      startEvent: 'DOMContentLoaded'
    });
  } else {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-aos]').addClass('no-aos-animation');
  }

  if ($openSecondaryMenu.length > 0) {
    var template = document.getElementById('secondary-navigation-template');
    secondaryMenuTippy = Object(tippy_js__WEBPACK_IMPORTED_MODULE_3__["default"])('.js-open-secondary-menu', {
      content: template.innerHTML,
      allowHTML: true,
      arrow: true,
      trigger: 'click',
      interactive: true,
      onShow: function onShow() {
        toggleDesktopTopbarOverflow(true);
      },
      onHidden: function onHidden() {
        toggleDesktopTopbarOverflow(false);
      }
    });
  }

  Object(tippy_js__WEBPACK_IMPORTED_MODULE_3__["default"])('.js-tooltip');
  Object(shave__WEBPACK_IMPORTED_MODULE_4__["default"])('.js-article-card-title', 100);
  Object(shave__WEBPACK_IMPORTED_MODULE_4__["default"])('.js-article-card-title-no-image', 250);
  checkForActionParameter();
  trySearchFeature();
});

/***/ }),

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

/***/ 1:
/*!*************************!*\
  !*** multi ./js/app.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/eddie/Code/own/liebling/src/js/app.js */"./js/app.js");


/***/ })

},[[1,"/js/manifest","/js/vendor"]]]);