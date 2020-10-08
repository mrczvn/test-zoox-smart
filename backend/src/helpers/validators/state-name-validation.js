const { invalidParamError } = require('../errors')

const stateNameValidation = (fieldName, stateValidatorAdapter) => ({
  validate(input) {
    const isValid = stateValidatorAdapter.isValidName(input[fieldName])

    if (!isValid) return invalidParamError(fieldName)
  }
})

module.exports = stateNameValidation
