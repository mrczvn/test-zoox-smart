const stateAbbreviationValidation = require('./state-abbreviation-validation')
const { invalidParamError } = require('../errors')
const { StateValidatorAdapterSpy } = require('../../test')

const makeSut = () => {
  const field = 'any_field'

  const abbreviationValidatorSpy = StateValidatorAdapterSpy()

  const sut = stateAbbreviationValidation(field, abbreviationValidatorSpy)

  return { sut, field, abbreviationValidatorSpy }
}

describe('Abbreviation Validation', () => {
  test('Should call AbbreviationValidator with correct values', () => {
    const { sut, field, abbreviationValidatorSpy } = makeSut()

    const abbreviation = 'any_abbreviation'

    sut.validate({ [field]: abbreviation })

    expect(abbreviationValidatorSpy.abbreviation).toBe(abbreviation)
  })

  test('Should return an error if AbbreviationValidator returns false', () => {
    const { sut, field, abbreviationValidatorSpy } = makeSut()

    abbreviationValidatorSpy.isAbbreviationValid = false

    const error = sut.validate({ [field]: 'any_abbreviation' })

    expect(error).toEqual(invalidParamError(field))
  })
})
