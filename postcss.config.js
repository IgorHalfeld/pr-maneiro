const tailwind = require('tailwindcss') // eslint-disable-line

module.exports = {
  plugins: [
    tailwind('tailwind.config.js')
  ],
  whitelist: ['mode-dark']
}
