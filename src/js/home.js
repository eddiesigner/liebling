import $ from 'jquery'
import shave from 'shave'
import Glide, {
  Controls,
  Swipe,
  Breakpoints
} from '@glidejs/glide/dist/glide.modular.esm'
import { isRTL } from './helpers'

$(document).ready(() => {
  const $featuredSlider = $('.js-featured-slider')

  if ($featuredSlider.length > 0) {
    const numSlides = $featuredSlider.find('.js-featured-slide').length
    const featuredSlider = new Glide('.js-featured-slider', {
      type: numSlides === 1 ? 'slider' : 'carousel',
      rewind: false,
      gap: 0,
      swipeThreshold: false,
      dragThreshold: false,
      direction: isRTL() ? 'rtl' : 'ltr',
      breakpoints: {
        768: {
          swipeThreshold: numSlides === 1 ? false : 80,
          dragThreshold: numSlides === 1 ? false : 120
        }
      }
    })

    if (numSlides === 1) {
      $featuredSlider.find('.js-controls').remove()
    }

    featuredSlider.on('mount.after', () => {
      shave('.js-featured-article-title', 200)
    })
    
    featuredSlider.mount({ Controls, Swipe, Breakpoints })

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 350)
  }

  shave('.js-featured-article-title', 200)
})
