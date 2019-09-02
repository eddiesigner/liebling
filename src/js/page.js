import $ from 'jquery'
import mediumZoom from 'medium-zoom'
import fitvids from 'fitvids'

$(document).ready(() => {
  fitvids('.js-post-content')

  function adjustImageGallery() {
    const images = document.querySelectorAll('.kg-gallery-image img')

    for (var i = 0, len = images.length; i < len; i++) {
      const container = images[i].closest('.kg-gallery-image')
      const width = images[i].attributes.width.value
      const height = images[i].attributes.height.value
      const ratio = width / height
      container.style.flex = `${ratio} 1 0%`
    }
  }

  adjustImageGallery()

  $('.js-post-content').find('figure img').each(function() {
    if (!$(this).closest('figure').hasClass('kg-bookmark-card')) {
      $(this).addClass('js-zoomable')
    }

    const $figcaption = $(this).parent().find('figcaption')
    if ($figcaption) {
      $(this).attr('alt', $figcaption.text())
    } else {
      $(this).attr('alt', '')
    }
  })

  mediumZoom('.js-zoomable')
})
