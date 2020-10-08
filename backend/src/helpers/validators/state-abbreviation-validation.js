const { invalidParamError } = require('../errors')

const stateAbbreviationValidation = (fieldName, stateValidatorAdapter) => ({
  validate(input) {
    const isValid = stateValidatorAdapter.isValidAbbreviation(input[fieldName])

    if (!isValid) return invalidParamError(fieldName)
  }
})

module.exports = stateAbbreviationValidation
