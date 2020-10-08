const { invalidParamError } = require('../errors')

const cityNameValidation = (fieldName, cityValidatorAdapter) => ({
  validate(input) {
    const isValid = cityValidatorAdapter.isValidName(input[fieldName])

    if (!isValid) return invalidParamError(fieldName)
  }
})

module.exports = cityNameValidation
