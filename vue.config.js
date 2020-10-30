/* eslint-disable @typescript-eslint/camelcase */

module.exports = {
  pwa: {
    name: 'PR Maneiro',
    themeColor: '#27A1F9',
    msTileColor: '#FFF',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'white',
    manifestOptions: {
      background_color: '#FFF',
      icons: [
        {
          src: 'img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable any'
        },
        {
          src: 'img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable any'
        }
      ]
    },
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      msTileImage: 'img/icons/msapplication-icon-144x144.png',
      maskIcon: null
    }
  }
}
