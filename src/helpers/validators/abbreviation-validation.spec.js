const abbreviationValidation = require('./abbreviation-validation')
const { invalidParamError } = require('../errors')
const { AbbreviationValidatorSpy } = require('../../test')

const makeSut = () => {
  const field = 'any_field'

  const abbreviationValidatorSpy = AbbreviationValidatorSpy()

  const sut = abbreviationValidation(field, abbreviationValidatorSpy)

  return { sut, field, abbreviationValidatorSpy }
}

describe('Abbreviation Validation', () => {
  test('Should call AbbreviationValidator with correct email', () => {
    const { sut, field, abbreviationValidatorSpy } = makeSut()

    const abbreviation = 'any_abbreviation'

    sut.validate({ [field]: abbreviation })

    expect(abbreviationValidatorSpy.abbreviation).toBe(abbreviation)
  })

  test('Should return an error if AbbreviationValidator returns false', () => {
    const { sut, field, abbreviationValidatorSpy } = makeSut()

    abbreviationValidatorSpy.isAbbreviationValid = false

    const abbreviation = 'any_abbreviation'

    const error = sut.validate({ [field]: abbreviation })

    expect(error).toEqual(invalidParamError(field))
  })
})
