import $ from 'jquery'
import shave from 'shave'
import Glide, {
  Controls,
  Swipe,
  Breakpoints
} from '@glidejs/glide/dist/glide.modular.esm'
import { isRTL } from './helpers'

$(() => {
  const $featuredSlider = $('.js-featured-slider')

  if ($featuredSlider.length > 0) {
    const numSlides = $featuredSlider.find('.js-featured-slide').length
    const featuredSlider = new Glide('.js-featured-slider', {
      type: 'slider',
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

    const ArrowDisabler = (Glide, Components) => {
      const controlClasses = {
        'controls': 'js-featured-slider-controls',
        'backArrow': 'js-featured-slider-previous',
        'nextArrow': 'js-featured-slider-next',
      }

      return {
        mount() {
          if (Glide.settings.rewind || numSlides === 1) {
            return
          }

          Glide.on(['mount.after', 'run'], () => {
            for (let controlItem of Components.Controls.items) {
              if (!controlItem.className.includes(controlClasses.controls)) {
                continue
              }

              const left = controlItem.querySelector(`.${controlClasses.backArrow}`)

              if (left) {
                if (Glide.index === 0) {
                  left.setAttribute('disabled', '')
                } else {
                  left.removeAttribute('disabled')
                }
              }

              const right = controlItem.querySelector(`.${controlClasses.nextArrow}`)

              if (right) {
                const lastSlideIndex = Glide.settings.bound
                  ? Glide.index + (Glide.settings.perView - 1)
                  : Glide.index

                if (lastSlideIndex === Components.Sizes.length - 1) {
                  right.setAttribute('disabled', '')
                } else {
                  right.removeAttribute('disabled')
                }
              }
            }
          })
        }
      }
    }

    if (numSlides === 1) {
      $featuredSlider.find('.js-featured-slider-controls').remove()
    }

    featuredSlider.on('mount.after', () => {
      shave('.js-featured-article-title', 200)
    })

    featuredSlider.mount({ Controls, Swipe, Breakpoints, ArrowDisabler })

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 350)
  }

  shave('.js-featured-article-title', 200)
})
