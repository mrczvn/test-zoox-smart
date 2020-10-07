const requiredFieldValidation = require('./required-field-validation')
const { missingParamError } = require('../errors')

const makeSut = () => {
  const field = 'any_field'

  const sut = requiredFieldValidation(field)

  return { sut, field }
}

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const { sut, field } = makeSut()

    const requiredFieldError = sut.validate({ invalidField: 'invalid_field' })

    expect(requiredFieldError).toEqual(missingParamError(field))
  })

  test('Should not return if validation succeeds', () => {
    const { sut, field } = makeSut()

    const requiredFieldError = sut.validate({ [field]: 'valid_field' })

    expect(requiredFieldError).toBeFalsy()
  })
})
