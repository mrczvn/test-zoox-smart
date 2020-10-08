const stateNameValidation = require('./state-name-validation')
const { invalidParamError } = require('../errors')
const { StateValidatorAdapterSpy } = require('../../test')

const makeSut = () => {
  const field = 'any_field'

  const stateValidatorAdapterSpy = StateValidatorAdapterSpy()

  const sut = stateNameValidation(field, stateValidatorAdapterSpy)

  return { sut, field, stateValidatorAdapterSpy }
}

describe('StateName Validation', () => {
  test('Should call isValidName with correct values', () => {
    const { sut, field, stateValidatorAdapterSpy } = makeSut()

    const abbreviation = 'any_abbreviation'

    sut.validate({ [field]: abbreviation })

    expect(stateValidatorAdapterSpy.stateName).toBe(abbreviation)
  })

  test('Should return an error if isValidName returns false', () => {
    const { sut, field, stateValidatorAdapterSpy } = makeSut()

    stateValidatorAdapterSpy.isStateNameValid = false

    const error = sut.validate({ [field]: 'any_abbreviation' })

    expect(error).toEqual(invalidParamError(field))
  })
})
