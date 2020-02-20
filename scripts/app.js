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
  const darkModeBtn = helpers.$('#change-mode')

  const persons = window.Persons

  const cleanTextArea = (element) => {
    if (!element) return
    element.value = null
    return element
  }

  // creates select/option on view
  const createPeopleListAndAttach = (data, template) => {
    Object.keys(data)
      .forEach((person) => {
        const option = document.createElement('option')
        option.value = person
        option.textContent = data[person].name
        template.appendChild(option)
      })
    return template
  }

  // replace values on view with textarea value
  const handleTypingValuesChange = (event) => {
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

    changeDarkMode()
  }

  // replace values on view with default template
  const handleValuesChange = (event) => {
    const defaultTemplate = persons.ney
    const person = (!!event && event.target.value.length) ? event.target.value : null
    const template = persons[person] ? persons[person] : defaultTemplate

    helpers.replaceValues({
      previewEl,
      time: helpers.getCurrentTimeFormated(),
      value: template.msg,
      image: template.image,
      name: template.name,
      username: template.username,
      template: tweetView
    })
    changeDarkMode()
  }

  // Check if must keep the dark-mode
  const changeDarkMode = (event) => {
    if (darkModeBtn.checked) {
      tweet.classList.add("dark-mode");
    } else {
      tweet.classList.remove("dark-mode");
    }
  }

  // if not available, remove button
  const checkCopyCliboardFeature = () => {
    const isAvailable = helpers.checkCopyFeature()
    if (!isAvailable) buttonCopy.remove()
  }

  buttonCopy.addEventListener('click', () => {
    const tweet = helpers.$('#tweet')
    buttonCopy.textContent = 'Copiado 🔥'
    helpers.handleCopy(tweet)

    setTimeout(() => {
      buttonCopy.textContent = 'Copiar!'
    }, 1500)
  })
  buttonDownload.addEventListener('click', () => {
    const tweet = helpers.$('#tweet')
    helpers.handleDownload(tweet)
  })
  tweetValue.addEventListener('keyup', handleTypingValuesChange)
  templateElement.addEventListener('change', handleValuesChange)
  darkModeBtn.addEventListener('change', changeDarkMode)

  const andRun = () => {
    createPeopleListAndAttach(persons, templateElement)
    handleValuesChange()
    checkCopyCliboardFeature()
    cleanTextArea(tweetValue)
  }
  return {
    andRun,
    _internal: {
      createPeopleListAndAttach,
      handleValuesChange,
      handleTypingValuesChange,
      cleanTextArea
    }
  }
}

if (typeof module === 'object') {
  module.exports = BuildApp
} else if (typeof window === 'object') {
  window.BuildApp = BuildApp // eslint-disable-line
}
