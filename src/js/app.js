import $ from 'jquery'
import Headroom from "headroom.js"
import Glide, {
  Swipe,
  Breakpoints
} from '@glidejs/glide/dist/glide.modular.esm'
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import shave from 'shave'
import AOS from 'aos'
import Fuse from 'fuse.js/dist/fuse.basic.esm.min.js'
import {
  isRTL,
  formatDate,
  isDarkMode,
  isMobile,
  getParameterByName
} from './helpers'

$(() => {
  if (isRTL()) {
    $('html').attr('dir', 'rtl').addClass('rtl')
  }

  const $body = $('body')
  const $header = $('.js-header')
  const $openMenu = $('.js-open-menu')
  const $closeMenu = $('.js-close-menu')
  const $menu = $('.js-menu')
  const $toggleSubmenu = $('.js-toggle-submenu')
  const $submenuOption = $('.js-submenu-option')[0]
  const $submenu = $('.js-submenu')
  const $recentSlider = $('.js-recent-slider')
  const $openSecondaryMenu = $('.js-open-secondary-menu')
  const $openSearch = $('.js-open-search')
  const $closeSearch = $('.js-close-search')
  const $search = $('.js-search')
  const $inputSearch = $('.js-input-search')
  const $searchResults = $('.js-search-results')
  const $searchNoResults = $('.js-no-results')
  const $toggleDarkMode = $('.js-toggle-darkmode')
  const $closeNotification = $('.js-notification-close')
  const $mainNav = $('.js-main-nav')
  const $mainNavLeft = $('.js-main-nav-left')
  const $newsletterElements = $('.js-newsletter')
  const currentSavedTheme = localStorage.getItem('theme')

  let fuse = null
  let submenuIsOpen = false
  let secondaryMenuTippy = null

  const showSubmenu = () => {
    $header.addClass('submenu-is-active')
    $toggleSubmenu.addClass('active')
    $submenu.removeClass('closed').addClass('opened')
  }

  const hideSubmenu = () => {
    $header.removeClass('submenu-is-active')
    $toggleSubmenu.removeClass('active')
    $submenu.removeClass('opened').addClass('closed')
  }

  const toggleScrollVertical = () => {
    $body.toggleClass('no-scroll-y')
  }

  const tryToRemoveNewsletter = () => {
    if (typeof disableNewsletter !== 'undefined' && disableNewsletter) {
      $newsletterElements.remove()
    }
  }

  const trySearchFeature = () => {
    if (typeof ghostSearchApiKey !== 'undefined') {
      getAllPosts(ghostHost, ghostSearchApiKey)
    } else {
      $openSearch.css('visibility', 'hidden')
      $closeSearch.remove()
      $search.remove()
    }
  }

  const getAllPosts = (host, key) => {
    const api = new GhostContentAPI({
      url: host,
      key,
      version: 'v4'
    })
    const allPosts = []
    const fuseOptions = {
      shouldSort: true,
      ignoreLocation: true,
      findAllMatches: true,
      includeScore: true,
      minMatchCharLength: 2,
      keys: ['title', 'custom_excerpt', 'tags.name']
    }

    api.posts.browse({
      limit: 'all',
      include: 'tags',
      fields: 'id, title, url, published_at, custom_excerpt'
    })
      .then((posts) => {
        for (let i = 0, len = posts.length; i < len; i++) {
          allPosts.push(posts[i])
        }

        fuse = new Fuse(allPosts, fuseOptions)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const showNotification = (typeNotification) => {
    const $notification = $(`.js-alert[data-notification="${typeNotification}"]`)
    $notification.addClass('opened')
    setTimeout(() => {
      closeNotification($notification)
    }, 5000)
  }

  const closeNotification = ($notification) => {
    $notification.removeClass('opened')
    const url = window.location.toString()

    if (url.indexOf('?') > 0) {
      const cleanUrl = url.substring(0, url.indexOf('?'))
      window.history.replaceState({}, document.title, cleanUrl)
    }
  }

  const checkForActionParameter = () => {
    const action = getParameterByName('action')
    const stripe = getParameterByName('stripe')

    if (action === 'subscribe') {
      showNotification('subscribe')
    }

    if (action === 'signup') {
      window.location = `${ghostHost}/signup/?action=checkout`
    }

    if (action === 'checkout') {
      showNotification('signup')
    }

    if (action === 'signin') {
      showNotification('signin')
    }

    if (stripe === 'success') {
      showNotification('checkout')
    }
  }

  const toggleDesktopTopbarOverflow = (disableOverflow) => {
    if (!isMobile()) {
      if (disableOverflow) {
        $mainNav.addClass('toggle-overflow')
        $mainNavLeft.addClass('toggle-overflow')
      } else {
        $mainNav.removeClass('toggle-overflow')
        $mainNavLeft.removeClass('toggle-overflow')
      }
    }
  }

  $openMenu.on('click', () => {
    $header.addClass('mobile-menu-opened')
    $menu.addClass('opened')
    toggleScrollVertical()
  })

  $closeMenu.on('click', () => {
    $header.removeClass('mobile-menu-opened')
    $menu.removeClass('opened')
    toggleScrollVertical()
  })

  $toggleSubmenu.on('click', () => {
    submenuIsOpen = !submenuIsOpen

    if (submenuIsOpen) {
      showSubmenu()
    } else {
      hideSubmenu()
    }
  })

  $openSearch.on('click', () => {
    $search.addClass('opened')
    setTimeout(() => {
      $inputSearch.trigger('focus')
    }, 400);
    toggleScrollVertical()
  })

  $closeSearch.on('click', () => {
    $inputSearch.trigger('blur')
    $search.removeClass('opened')
    toggleScrollVertical()
  })

  $inputSearch.on('keyup', () => {
    if ($inputSearch.val().length > 0 && fuse) {
      const results = fuse.search($inputSearch.val())
      const bestResults = results.filter((result) => {
        if (result.score <= 0.5) {
          return result
        }
      })

      let htmlString = ''

      if (bestResults.length > 0) {
        for (let i = 0, len = bestResults.length; i < len; i++) {
          htmlString += `
          <article class="m-result">\
            <a href="${bestResults[i].item.url}" class="m-result__link">\
              <h3 class="m-result__title">${bestResults[i].item.title}</h3>\
              <span class="m-result__date">${formatDate(bestResults[i].item.published_at)}</span>\
            </a>\
          </article>`
        }

        $searchNoResults.hide()
        $searchResults.html(htmlString)
        $searchResults.show()
      } else {
        $searchResults.html('')
        $searchResults.hide()
        $searchNoResults.show()
      }
    } else {
      $searchResults.html('')
      $searchResults.hide()
      $searchNoResults.hide()
    }
  })

  $toggleDarkMode.on('change', () => {
    if ($toggleDarkMode.is(':checked')) {
      $('html').attr('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    } else {
      $('html').attr('data-theme', 'light')
      localStorage.setItem('theme', 'light')
    }
  })

  $toggleDarkMode.on('mouseenter', () => {
    toggleDesktopTopbarOverflow(true)
  })

  $toggleDarkMode.on('mouseleave', () => {
    toggleDesktopTopbarOverflow(false)
  })

  $closeNotification.on('click', function () {
    closeNotification($(this).parent())
  })

  $(window).on('click', (e) => {
    if (submenuIsOpen) {
      if ($submenuOption && !$submenuOption.contains(e.target)) {
        submenuIsOpen = false
        hideSubmenu()
      }
    }
  })

  $(document).on('keyup', (e) => {
    if (e.key === 'Escape' && $search.hasClass('opened')) {
      $closeSearch.trigger('click')
    }
  })

  if (currentSavedTheme) {
    $('html').attr('data-theme', currentSavedTheme)

    if (currentSavedTheme === 'dark') {
      $toggleDarkMode.attr('checked', true)
    }
  } else {
    if (isDarkMode()) {
      $toggleDarkMode.attr('checked', true)
    }
  }

  if ($header.length > 0) {
    const headroom = new Headroom($header[0], {
      tolerance: {
        down: 10,
        up: 20
      },
      offset: 15,
      onUnpin: () => {
        if (!isMobile() && secondaryMenuTippy) {
          const desktopSecondaryMenuTippy = secondaryMenuTippy[0]

          if (
            desktopSecondaryMenuTippy && desktopSecondaryMenuTippy.state.isVisible
          ) {
            desktopSecondaryMenuTippy.hide()
          }
        }
      }
    })
    headroom.init()
  }

  if ($recentSlider.length > 0) {
    const recentSlider = new Glide('.js-recent-slider', {
      type: 'slider',
      rewind: false,
      perView: 4,
      swipeThreshold: false,
      dragThreshold: false,
      gap: 0,
      direction: isRTL() ? 'rtl' : 'ltr',
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
          peek: { before: 0, after: 115 }
        },
        568: {
          perView: 1,
          swipeThreshold: 80,
          dragThreshold: 120,
          peek: { before: 0, after: 115 }
        }
      }
    })

    recentSlider.on('mount.after', () => {
      shave('.js-recent-article-title', 50)
    })

    recentSlider.mount({ Swipe, Breakpoints })
  }

  if (typeof disableFadeAnimation === 'undefined' || !disableFadeAnimation) {
    AOS.init({
      once: true,
      startEvent: 'DOMContentLoaded',
    })
  } else {
    $('[data-aos]').addClass('no-aos-animation')
  }

  if ($openSecondaryMenu.length > 0) {
    const template = document.getElementById('secondary-navigation-template')

    secondaryMenuTippy = tippy('.js-open-secondary-menu', {
      appendTo: document.body,
      content: template.innerHTML,
      allowHTML: true,
      arrow: true,
      trigger: 'click',
      interactive: true,
      onShow() {
        toggleDesktopTopbarOverflow(true)
      },
      onHidden() {
        toggleDesktopTopbarOverflow(false)
      }
    })
  }

  tippy('.js-tooltip')

  shave('.js-article-card-title', 100)
  shave('.js-article-card-title-no-image', 250)

  checkForActionParameter()
  tryToRemoveNewsletter()
  trySearchFeature()
})
