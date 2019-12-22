const Persons = require('./persons')

const requiredProperties = ['name', 'username', 'msg', 'image']

describe('Persons', () => {
  it('should have all properties', () => {
    const persons = Object.values(Persons)
    persons.forEach(person => {
      expect(Object.keys(person)).toEqual(requiredProperties)
    })
  })

  it('all images should be a imgur link', () => {
    const persons = Object.values(Persons)

    persons.forEach(person => {
      const rx = new RegExp('(i.imgur.com)')
      const link = person.image.match(rx)[0]
      expect(link).toEqual('i.imgur.com')
    })
  })
})
