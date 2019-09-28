import $ from 'jquery'
import slick from 'slick-carousel'
import tippy from 'tippy.js'
import AOS from 'aos'
import GhostContentAPI from '@tryghost/content-api'
import Fuse from 'fuse.js'

$(document).ready(() => {
  const isRTL = $('html').attr('lang') === 'ar' || $('html').attr('lang') === 'he'

  if (isRTL) {
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
  const $recentArticles = $('.js-recent-articles')
  const $openSearch = $('.js-open-search')
  const $closeSearch = $('.js-close-search')
  const $search = $('.js-search')
  const $inputSearch = $('.js-input-search')
  const $searchResults = $('.js-search-results')
  const $searchNoResults = $('.js-no-results')

  const headerHeight = $header.outerHeight()

  let fuse = null
  let lastScrollY = window.pageYOffset
  let ticking = false
  let submenuIsOpen = false

  function onScroll() {
    requestTick()
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(toggleHeader)
    }

    ticking = true
  }

  function toggleHeader() {
    const scrollTop = window.pageYOffset

    if (scrollTop >= headerHeight) {
      $header.addClass('fixed')

      if (submenuIsOpen) {
        $header.addClass('fixed-active')
      }

      if (scrollTop >= lastScrollY) {
        if (!submenuIsOpen) {
          $header.removeClass('fixed-active')
        }
      } else {
        $header.addClass('fixed-active')
      }
    } else {
      if (!submenuIsOpen) {
        $header.removeClass('fixed-active')
      }

      $header.removeClass('fixed')
    }

    lastScrollY = scrollTop
    ticking = false
  }

  function showSubmenu() {
    $header.addClass('submenu-is-active')
    $toggleSubmenu.addClass('active')
    $submenu.removeClass('closed').addClass('opened')
  }

  function hideSubmenu() {
    $header.removeClass('submenu-is-active')
    $toggleSubmenu.removeClass('active')
    $submenu.removeClass('opened').addClass('closed')
  }

  function toggleScrollVertical() {
    $body.toggleClass('no-scroll-y')
  }

  function trySearchFeature() {
    if (typeof ghostSearchApiKey !== 'undefined') {
      getAllPosts(ghostHost, ghostSearchApiKey)
    } else {
      $openSearch.remove()
      $closeSearch.remove()
      $search.remove()
    }
  }

  function getAllPosts(host, key) {
    const api = new GhostContentAPI({
      url: host,
      key,
      version: 'v2'
    })
    const allPosts = []
    const fuseOptions = {
      shouldSort: true,
      threshold: 0,
      location: 0,
      distance: 100,
      tokenize: true,
      matchAllTokens: true,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['title', 'custom_excerpt', 'html']
    }

    api.posts.browse({
      limit: 'all',
      fields: 'id, title, url, published_at, custom_excerpt, html'
    })
      .then((posts) => {
        for (var i = 0, len = posts.length; i < len; i++) {
          allPosts.push(posts[i])
        }

        fuse = new Fuse(allPosts, fuseOptions)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function formatDate(date) {
    if (date) {
      return new Date(date).toLocaleDateString(
        document.documentElement.lang,
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }
      )
    }

    return ''
  }

  $openMenu.click(() => {
    $menu.addClass('opened')
    toggleScrollVertical()
  })

  $closeMenu.click(() => {
    $menu.removeClass('opened')
    toggleScrollVertical()
  })

  $toggleSubmenu.click(() => {
    submenuIsOpen = !submenuIsOpen

    if (submenuIsOpen) {
      showSubmenu()
    } else {
      hideSubmenu()
    }
  })

  $openSearch.click(() => {
    $search.addClass('opened')
    setTimeout(() => {
      $inputSearch.focus()
    }, 400);
    toggleScrollVertical()
  })

  $closeSearch.click(() => {
    $inputSearch.blur()
    $search.removeClass('opened')
    toggleScrollVertical()
  })

  $inputSearch.keyup(() => {
    if ($inputSearch.val().length > 0 && fuse) {
      const results = fuse.search($inputSearch.val())
      let htmlString = ''

      if (results.length > 0) {
        for (var i = 0, len = results.length; i < len; i++) {
          htmlString += `
          <article class="m-result">\
            <a href="${results[i].url}" class="m-result__link">\
              <h3 class="m-result__title">${results[i].title}</h3>\
              <span class="m-result__date">${formatDate(results[i].published_at)}</span>\
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

  $(window).click((e) => {
    if (submenuIsOpen) {
      if ($submenuOption && !$submenuOption.contains(e.target)) {
        submenuIsOpen = false
        hideSubmenu()
      }
    }
  })

  if ($recentArticles.length > 0) {
    $recentArticles.slick({
      adaptiveHeight: true,
      arrows: false,
      infinite: false,
      mobileFirst: true,
      variableWidth: true,
      rtl: isRTL
    })
  }

  if (typeof disableFadeAnimation === 'undefined' || !disableFadeAnimation) {
    AOS.init({
      once: true,
      startEvent: 'DOMContentLoaded',
    })
  } else {
    $('[data-aos]').addClass('no-aos-animation')
  }

  tippy('.js-tooltip')

  trySearchFeature()

  window.addEventListener('scroll', onScroll, { passive: true })
})
