const { invalidParamError } = require('../errors')

const abbreviationValidation = (fieldName, abbreviationAdapter) => ({
  validate(input) {
    const isValid = abbreviationAdapter.isValid(input[fieldName])

    if (!isValid) return invalidParamError(fieldName)
  }
})

module.exports = abbreviationValidation
