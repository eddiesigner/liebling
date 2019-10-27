export const isRTL = () => {
  const $html = document.querySelector('html')
  return $html.getAttribute('lang') === 'ar' || $html.getAttribute('lang') === 'he'
}

export const isMobile = (width = '768px') => {
  return window.matchMedia(`(max-width: ${width})`).matches
}

export const formatDate = (date) => {
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
