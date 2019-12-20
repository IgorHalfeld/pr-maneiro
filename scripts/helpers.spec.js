const CreateHelperFunctions = require('./helpers')
const { readFileSync } = require('fs')

const html = readFileSync(process.cwd() + '/index.html')

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
    fetch,
    navigator: {
      clipboard: {
        write: true
      }
    },
    ClipboardItem: () => ({})
  }
}

let helpers
beforeAll(async () => {
  document.documentElement.innerHTML = html
  helpers = await CreateHelperFunctions({ deps })
})

describe('Helpers', () => {
  test('should get an element on DOM', () => {
    const button = helpers.$('#buttonCopy')
    expect(button.textContent.trim()).toBe('Copiar!')
  })

  test('should return true with clipboard API available', () => {
    const hasFeature = helpers.checkCopyFeature()
    expect(hasFeature).toBe(true)
  })

  test('should load a template with a component name', async () => {
    const tweet = await helpers.loadComponent('tweet')
    expect(typeof tweet === 'string').toBe(true)
  })
})
