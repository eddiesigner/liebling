export const isRTL = () => {
  const $html = document.querySelector('html')
  return $html.getAttribute('lang') === 'ar' || $html.getAttribute('lang') === 'he'
}

export const isMobile = (width = '768px') => {
  return window.matchMedia(`(max-width: ${width})`).matches
}

export const isDarkMode = () => {
  const darkModeMatcher = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')

  return darkModeMatcher && darkModeMatcher.matches
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
