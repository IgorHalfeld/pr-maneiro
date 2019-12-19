async function CreateHelperFunctions({ deps }) { // eslint-disable-line
  const { window, document } = deps

  // jquery like to get some element on DOM
  const $ = (element) => document.querySelector(element)

  // load HTML as a "component"
  const loadComponent = async (component) => {
    const res = await window.fetch('/components/' + component + '.html')
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
  }

  // put image on cliboard for better UX
  const handleCopy = async (element) => {
    const dataUrl = await window.domtoimage.toBlob(element, { quality: 0.95 })
    const item = new window.ClipboardItem({ 'image/png': dataUrl })
    window.navigator.clipboard.write([item])
    alert('Copiado para a área de transferência com sucesso!!')
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
  const getCurrentTimeFormated = () => {
    const getCurrentMonth = monthNumber => {
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ][monthNumber]
    }
    const now = new Date()
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
  }

  return {
    $,
    handleDownload,
    loadComponent,
    replaceValues,
    handleCopy,
    checkCopyFeature,
    getCurrentTimeFormated
  }
}

window.CreateHelperFunctions = CreateHelperFunctions // eslint-disable-line
