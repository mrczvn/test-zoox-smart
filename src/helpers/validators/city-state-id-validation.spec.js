const cityStateIdValidation = require('./city-state-id-validation')
const { invalidParamError } = require('../errors')
const { CityValidatorAdapterSpy } = require('../../test')

const makeSut = () => {
  const field = 'any_field'

  const cityValidatorAdapterSpy = CityValidatorAdapterSpy()

  const sut = cityStateIdValidation(field, cityValidatorAdapterSpy)

  return { sut, field, cityValidatorAdapterSpy }
}

describe('CityStateId Validation', () => {
  test('Should call isValidStateId with correct values', () => {
    const { sut, field, cityValidatorAdapterSpy } = makeSut()

    const abbreviation = 'any_stateId'

    sut.validate({ [field]: abbreviation })

    expect(cityValidatorAdapterSpy.stateId).toBe(abbreviation)
  })

  test('Should return an error if isValidStateId returns false', () => {
    const { sut, field, cityValidatorAdapterSpy } = makeSut()

    cityValidatorAdapterSpy.isStateIdValid = false

    const error = sut.validate({ [field]: 'any_cityName' })

    expect(error).toEqual(invalidParamError(field))
  })
})
