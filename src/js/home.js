import $ from 'jquery'
import slick from 'slick-carousel'
import shave from 'shave'
import { isRTL } from './helpers'

$(document).ready(() => {
  const $featuredArticles = $('.js-featured-articles')

  if ($featuredArticles.length > 0) {
    $featuredArticles.on('init', function () {
      shave('.js-featured-article-title', 200)
    })

    $featuredArticles.slick({
      arrows: true,
      infinite: true,
      prevArrow: '<button class="m-icon-button in-featured-articles slick-prev" aria-label="Previous"><span class="icon-arrow-left"></span></button>',
      nextArrow: '<button class="m-icon-button in-featured-articles slick-next" aria-label="Next"><span class="icon-arrow-right"></span></button>',
      mobileFirst: true,
      rtl: isRTL(),
      autoplay: true,
      dots: true
    })
    
    setTimeout(() => {
      $featuredArticles.slick('setPosition')
    }, 350)
  }
})
