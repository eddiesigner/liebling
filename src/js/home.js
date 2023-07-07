import $ from 'jquery';
import shave from 'shave';
import Swiper, { Navigation, A11y } from 'swiper';
import 'swiper/css';

$(() => {
  const $featuredSlider = $('.js-featured-slider');

  if ($featuredSlider.length > 0) {
    const numSlides = $featuredSlider.find('.swiper-slide').length;
    const featuredSwiper = new Swiper('.js-featured-slider', {
      modules: [Navigation, A11y],
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      a11y: true,
      on: {
        init: function() {
          shave('.js-featured-article-title', 200);
        }
      }
    });

    if (numSlides === 1) {
      $featuredSlider.find('.js-featured-slider-button').remove();
    }
  }

  shave('.js-featured-article-title', 200);
});
