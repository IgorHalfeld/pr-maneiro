
function checkDarkMode () {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

function addDarkModeSelector () {
  if (checkDarkMode()) {
    document.documentElement.classList.add('mode-dark')
  } else {
    document.documentElement.classList.remove('mode-dark')
  }
}

function watchDarkMode () {
  if (!window.matchMedia) return

  window.matchMedia('(prefers-color-scheme: dark)').addListener(addDarkModeSelector)
}

/**
 * see: https://github.com/ChanceArthur/tailwindcss-dark-mode/blob/master/prefers-dark.js
 */
export function prefersDark () {
  addDarkModeSelector()
  watchDarkMode()
}
