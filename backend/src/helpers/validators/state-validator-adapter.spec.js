const locationBr = require('easy-location-br')
const stateValidatorAdapter = require('./state-validator-adapter')

const makeSut = () => stateValidatorAdapter()

describe('AbbreviationValidatorAdapter', () => {
  describe('isValidAbbreviation()', () => {
    test('Should call easy-location-br once', () => {
      const sut = makeSut()

      const getAllStatesSpy = jest.spyOn(locationBr, 'getAllStates')

      sut.isValidAbbreviation('any_abbreviation')

      expect(getAllStatesSpy).toHaveBeenCalledTimes(0)
    })

    test('Should return false if there is no abbreviation in easy-location-br', () => {
      const sut = makeSut()

      const isValid = sut.isValidAbbreviation('any_abbreviation')

      expect(isValid).toBeFalsy()
    })

    test('Should return true if there is a valid abbreviation in easy-location-us', () => {
      const sut = makeSut()

      const isValid = sut.isValidAbbreviation('SP')

      expect(isValid).toBeTruthy()
    })
  })

  describe('isValidName()', () => {
    test('Should call easy-location-br once', () => {
      const sut = makeSut()

      const getAllStatesSpy = jest.spyOn(locationBr, 'getAllStates')

      sut.isValidName('any_abbreviation')

      expect(getAllStatesSpy).toHaveBeenCalledTimes(0)
    })

    test('Should return false if there is no state name in easy-location-br', () => {
      const sut = makeSut()

      const isValid = sut.isValidName('any_stateName')

      expect(isValid).toBeFalsy()
    })

    test('Should return true if there is a valid state name in easy-location-us', () => {
      const sut = makeSut()

      const isValid = sut.isValidName('são paulo')

      expect(isValid).toBeTruthy()
    })
  })
})
