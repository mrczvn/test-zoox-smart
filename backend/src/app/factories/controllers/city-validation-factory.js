const validationComposite = require('../../../helpers/validators/validation-composite')
const requiredFieldValidation = require('../../../helpers/validators/required-field-validation')
const cityNameValidation = require('../../../helpers/validators/city-name-validation')
const cityNameValidator = require('../../../helpers/validators/city-validator-adapter')

const makeCityValidation = () => {
  const validations = []

  const requiredFields = ['nome']

  requiredFields.forEach((field) => {
    validations.push(requiredFieldValidation(field))
  })

  validations.push(cityNameValidation('nome', cityNameValidator()))

  return validationComposite(validations)
}

module.exports = makeCityValidation
