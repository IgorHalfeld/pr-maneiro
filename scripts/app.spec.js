const BuildApp = require('./app')
const { readFileSync } = require('fs')

const html = readFileSync(process.cwd() + '/index.template.html')

const fetch = path => new Promise(resolve => {
  const file = readFileSync(process.cwd() + path)
  resolve({
    text: () => Promise.resolve(file.toString())
  })
})

const deps = {
  document,
  window: {
    ...window,
    CreateHelperFunctions: () => Promise.resolve({
      loadComponent: () => ({}),
      $: () => ({
        addEventListener: () => ({})
      })
    }),
    domtoimage: {
      toPng: () => 'image_png'
    },
    fetch,
    navigator: {
      clipboard: {
        write: true
      }
    },
    ClipboardItem: () => ({})
  }
}

let app
beforeAll(async () => {
  document.documentElement.innerHTML = html
  app = await BuildApp({ ...deps })
  app = app._internal
})

describe('App', () => {
  it('should create a select/option element with a gave object', () => {
    const person = {
      igorhalfeld: {
        name: 'Igor Halfeld',
        username: 'igorhalfeld',
        msg: 'Saudade do que a gente não viveu ainda!!',
        image: 'https://i.imgur.com/k2Uah9s.jpg'
      }
    }
    let selectElement = document.createElement('select')
    selectElement = app.createPeopleListAndAttach(person, selectElement)

    expect(selectElement.outerHTML).toEqual('<select><option value="igorhalfeld">Igor Halfeld</option></select>')
  })

  it('should clean a textarea', () => {
    let textAreaElement = document.createElement('textarea')
    textAreaElement.value = 'hello friend'
    expect(textAreaElement.value).toEqual('hello friend')
    textAreaElement = app.cleanTextArea(textAreaElement)
    expect(textAreaElement.value).toEqual('')
  })

  it('should not break if a not pass a element to clean a textarea', () => {
    const textAreaElement = app.cleanTextArea()
    expect(textAreaElement).toEqual(undefined)
  })
})
