const missingParamError = require('../errors/missing-param-error')

const requiredFieldValidation = (fieldName) => ({
  validate(input) {
    if (!input[fieldName]) return missingParamError(fieldName)
  }
})

module.exports = requiredFieldValidation
