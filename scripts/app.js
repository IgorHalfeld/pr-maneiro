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
    Object.keys({ ...data })
      .sort(function(a, b) {
        var nameA = data[a].name.toUpperCase();
        var nameB = data[b].name.toUpperCase();
      
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      })
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

    changeDarkModeHandler()
  }

  // replace values on view with default template
  const handleValuesChange = (event) => {
    const defaultTemplate = persons.ney
    const person = (!!event && event.target.value.length) ? event.target.value : null
    const template = persons[person] ? persons[person] : defaultTemplate
    templateElement.value = person

    helpers.replaceValues({
      previewEl,
      time: helpers.getCurrentTimeFormated(),
      value: template.msg,
      image: template.image,
      name: template.name,
      username: template.username,
      template: tweetView
    })
    changeDarkModeHandler()
  }

  // Check if must keep the dark-mode
  const changeDarkMode = (_darkModeBtn, _tweet) => {
    if (_darkModeBtn.checked) {
      _tweet.classList.add('dark-mode')
    } else {
      _tweet.classList.remove('dark-mode')
    }
  }

  const changeDarkModeHandler = () => {
    const tweet = helpers.$('#tweet')
    changeDarkMode(darkModeBtn, tweet)
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
  darkModeBtn.addEventListener('change', changeDarkModeHandler)

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
      cleanTextArea,
      changeDarkMode
    }
  }
}

if (typeof module === 'object') {
  module.exports = BuildApp
} else if (typeof window === 'object') {
  window.BuildApp = BuildApp // eslint-disable-line
}
