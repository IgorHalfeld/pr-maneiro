async function BuildApp ({ window, document }) {
  const helpers = await window.CreateHelperFunctions({
    deps: { window, document }
  })

  const tweetView = await helpers.loadComponent('tweet')
  const tweetValue = helpers.$('#tweetValue')
  const previewEl = helpers.$('#preview')
  const templateElement = helpers.$('#template')
  const buttonCopy = helpers.$('#buttonCopy')
  const buttonDownload = helpers.$('#buttonDownload')

  const persons = window.Persons

  const cleanTextArea = (element) => {
    if (!element) return
    element.value = null
  }

  // creates select/option on view
  const createPeopleList = () => {
    Object.keys(persons)
      .forEach((person) => {
        const option = document.createElement('option')
        option.value = person
        option.textContent = persons[person].name
        templateElement.appendChild(option)
        console.log('template element', templateElement)
      })
  }

  // replace values on view with default template or textarea value
  const handleValuesChange = (event) => {
    const defaultTemplate = persons.ney
    const value = (!!event && event.target.value.length) ? event.target.value : null
    const template = persons[value] ? persons[value] : defaultTemplate

    helpers.replaceValues({
      previewEl,
      time: helpers.getCurrentTimeFormated(),
      value: template.msg,
      image: template.image,
      name: template.name,
      username: template.username,
      template: tweetView
    })
  }

  // if not available, remove button
  const checkCopyCliboardFeature = () => {
    const isAvailable = helpers.checkCopyFeature()
    if (!isAvailable) buttonCopy.remove()
  }

  buttonCopy.addEventListener('click', () => {
    const tweet = helpers.$('#tweet')
    helpers.handleCopy(tweet)
  })
  buttonDownload.addEventListener('click', () => {
    const tweet = helpers.$('#tweet')
    helpers.handleDownload(tweet)
  })
  tweetValue.addEventListener('keyup', (event) => {
    const defaultTemplate = persons.ney
    const value = (!!event && event.target.value.length)
      ? event.target.value
      : defaultTemplate.msg
    const selected = templateElement.value
    const template = persons[selected] ? persons[selected] : defaultTemplate

    helpers.replaceValues({
      previewEl,
      time: helpers.getCurrentTimeFormated(),
      value: value || template.msg,
      image: template.image,
      name: template.name,
      username: template.username,
      template: tweetView
    })
  })
  templateElement.addEventListener('change', handleValuesChange)

  const andRun = () => {
    createPeopleList()
    handleValuesChange()
    checkCopyCliboardFeature()
    cleanTextArea(tweetValue)
  }
  return { andRun }
}

if (typeof module === 'object') {
  module.exports = BuildApp
} else if (typeof window === 'object') {
  window.BuildApp = BuildApp // eslint-disable-line
}