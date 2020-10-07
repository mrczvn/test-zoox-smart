const locationBr = require('easy-location-br')
const cityValidatorAdapter = require('./city-validator-adapter')

const makeSut = () => cityValidatorAdapter()

describe('cityValidatorAdapter', () => {
  describe('isValidStateId()', () => {
    test('Should call easy-location-br once', () => {
      const sut = makeSut()

      const getAllStatesSpy = jest.spyOn(locationBr, 'getAllCities')

      sut.isValidStateId('any_stateId')

      expect(getAllStatesSpy).toHaveBeenCalledTimes(0)
    })

    test('Should return false if there is no stateId in easy-location-br', () => {
      const sut = makeSut()

      const isValid = sut.isValidStateId('any_stateId')

      expect(isValid).toBeFalsy()
    })

    test('Should return true if there is a valid stateId in easy-location-us', () => {
      const sut = makeSut()

      const isValid = sut.isValidStateId('sp')

      expect(isValid).toBeTruthy()
    })
  })

  describe('isValidName()', () => {
    test('Should call easy-location-br once', () => {
      const sut = makeSut()

      const getAllStatesSpy = jest.spyOn(locationBr, 'getAllCities')

      sut.isValidName('any_stateId')

      expect(getAllStatesSpy).toHaveBeenCalledTimes(0)
    })

    test('Should return false if there is no city name in easy-location-br', () => {
      const sut = makeSut()

      const isValid = sut.isValidName('any_cityName')

      expect(isValid).toBeFalsy()
    })

    test('Should return true if there is a valid city name in easy-location-us', () => {
      const sut = makeSut()

      const isValid = sut.isValidName('são paulo')

      expect(isValid).toBeTruthy()
    })
  })
})
