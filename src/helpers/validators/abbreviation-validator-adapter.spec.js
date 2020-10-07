const locationBr = require('easy-location-br')
const abbreviationValidatorAdapter = require('./abbreviation-validator-adapter')

const makeSut = () => abbreviationValidatorAdapter()

describe('EmailValidatorAdapter', () => {
  test('Should call easy-location-br once', () => {
    const sut = makeSut()

    const abbreviation = 'any_abbreviation'

    const getAllStatesSpy = jest.spyOn(locationBr, 'getAllStates')

    sut.isValid(abbreviation)

    expect(getAllStatesSpy).toHaveBeenCalledTimes(0)
  })

  test('Should return false if there is no abbreviation in easy-location-br', () => {
    const sut = makeSut()

    const abbreviation = 'any_abbreviation'

    const isValid = sut.isValid(abbreviation)

    expect(isValid).toBeFalsy()
  })

  test('Should return true if there is a valid abbreviation in easy-location-us', () => {
    const sut = makeSut()

    const abbreviation = 'SP'

    const isValid = sut.isValid(abbreviation)

    expect(isValid).toBeTruthy()
  })
})
