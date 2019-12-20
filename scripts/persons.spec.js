const Persons = require('./persons')

const requiredProperties = ['name', 'username', 'msg', 'image']

describe('Persons', () => {
  // TODO: needs be an imgur link

  it('should have all properties', () => {
    const persons = Object.values(Persons)
    persons.forEach(person => {
      expect(Object.keys(person)).toEqual(requiredProperties)
    })
  })
})
