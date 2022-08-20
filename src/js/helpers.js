export const isRTL = () => {
  const $html = document.querySelector('html');
  return ['ar', 'he', 'fa'].includes($html.getAttribute('lang'));
};

export const isMobile = (width = '768px') => {
  return window.matchMedia(`(max-width: ${width})`).matches;
};

export const formatDate = date => {
  if (date) {
    return new Date(date).toLocaleDateString(document.documentElement.lang, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  return '';
};

export const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;

  name = name.replace(/[\[\]]/g, '\\$&');

  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);

  if (!results) return null;

  if (!results[2]) return '';

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const adjustImageGallery = () => {
  const images = document.querySelectorAll('.kg-gallery-image img');

  for (var i = 0, len = images.length; i < len; i++) {
    const container = images[i].closest('.kg-gallery-image');
    const width = images[i].attributes.width.value;
    const height = images[i].attributes.height.value;
    const ratio = width / height;
    container.style.flex = `${ratio} 1 0%`;
  }
};

export const managePostImages = $ => {
  $('.js-post-content')
    .find('img')
    .each(function() {
      if (
        !$(this)
          .closest('figure')
          .hasClass('kg-bookmark-card') &&
        !$(this)
          .closest('figure')
          .hasClass('kg-nft-card') &&
        !$(this)
          .parent()
          .is('a') &&
        !$(this).hasClass('kg-product-card-image') &&
        !$(this).hasClass('kg-audio-thumbnail')
      ) {
        $(this).addClass('js-zoomable');
      }
    });
};

export const makeImagesZoomable = ($, mediumZoom) => {
  const zoom = mediumZoom('.js-zoomable');

  zoom.on('opened', () => {
    setTimeout(() => {
      const $mediumZoomImages = $('.medium-zoom-image--opened');
      if ($mediumZoomImages.length > 1) {
        $mediumZoomImages.last().hide();
      }
    }, 10);
  });
};
