const cityNameValidation = require('./city-name-validation')
const { invalidParamError } = require('../errors')
const { CityValidatorAdapterSpy } = require('../../test')

const makeSut = () => {
  const field = 'any_field'

  const cityValidatorAdapterSpy = CityValidatorAdapterSpy()

  const sut = cityNameValidation(field, cityValidatorAdapterSpy)

  return { sut, field, cityValidatorAdapterSpy }
}

describe('CityName Validation', () => {
  test('Should call isValidName with correct values', () => {
    const { sut, field, cityValidatorAdapterSpy } = makeSut()

    const abbreviation = 'any_cityName'

    sut.validate({ [field]: abbreviation })

    expect(cityValidatorAdapterSpy.cityName).toBe(abbreviation)
  })

  test('Should return an error if isValidName returns false', () => {
    const { sut, field, cityValidatorAdapterSpy } = makeSut()

    cityValidatorAdapterSpy.isCityNameValid = false

    const error = sut.validate({ [field]: 'any_cityName' })

    expect(error).toEqual(invalidParamError(field))
  })
})
