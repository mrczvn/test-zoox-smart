const { invalidParamError } = require('../errors')

const cityStateIdValidation = (fieldName, cityValidatorAdapter) => ({
  validate(input) {
    const isValid = cityValidatorAdapter.isValidStateId(input[fieldName])

    if (!isValid) return invalidParamError(fieldName)
  }
})

module.exports = cityStateIdValidation
