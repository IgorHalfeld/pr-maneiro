async function CreateHelperFunctions({ deps }) { // eslint-disable-line
  const { window, document } = deps
  const monthList = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]

  // jquery like to get some element on DOM
  const $ = (element) => document.querySelector(element)

  // load HTML as a "component"
  const loadComponent = f => async (component) => {
    const res = await f('/components/' + component + '.html')
    const template = await res.text()
    return template
  }

  // get the tweet element and parser to canvas to download as a image
  const handleDownload = async (element) => {
    const dataUrl = await window.domtoimage.toPng(element, { quality: 0.95 })
    const link = document.createElement('a')
    link.download = 'pr-maneiro.png'
    link.href = dataUrl
    link.click()
    return link
  }

  // put image on cliboard for better UX
  const handleCopy = async (element) => {
    const dataUrl = await window.domtoimage.toBlob(element, { quality: 0.95 })
    const item = new window.ClipboardItem({ 'image/png': dataUrl })
    window.navigator.clipboard.write([item])
  }

  // check if copy to clipboard feature is available
  const checkCopyFeature = () => {
    return !(
      !window.navigator.clipboard ||
      !window.navigator.clipboard.write ||
      typeof window.ClipboardItem === 'undefined'
    )
  }

  // get date on twitter format
  const getCurrentTimeFormated = (now = new Date()) => {
    const getCurrentMonth = monthNumber => {
      return monthList[monthNumber]
    }

    const day = now.getDate()
    const year = now.getFullYear()
    const month = now.getMonth()
    const hourNow = now.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })

    return `${hourNow} · ${getCurrentMonth(month)} ${day} ${year}`
  }

  // replate `{{}}` expressions from template before insert on DOM
  const replaceValues = ({ template, previewEl, name, username, value, image, time }) => {
    const tweetComplete = template
      .replace('{{ tweetContent }}', value)
      .replace('{{ name }}', name)
      .replace('{{ username }}', username)
      .replace('{{ image }}', image)
      .replace('{{ time }}', time)

    previewEl.innerHTML = tweetComplete
    return previewEl
  }

  return {
    $,
    monthList,
    handleDownload,
    replaceValues,
    handleCopy,
    checkCopyFeature,
    getCurrentTimeFormated,
    loadComponent: loadComponent(window.fetch)
  }
}

if (typeof module === 'object') {
  module.exports = CreateHelperFunctions
} else if (typeof window === 'object') {
  window.CreateHelperFunctions = CreateHelperFunctions // eslint-disable-line
}
