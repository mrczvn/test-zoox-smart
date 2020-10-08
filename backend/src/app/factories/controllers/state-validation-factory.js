const validationComposite = require('../../../helpers/validators/validation-composite')
const requiredFieldValidation = require('../../../helpers/validators/required-field-validation')
const stateNameValidation = require('../../../helpers/validators/state-name-validation')
const stateAbbreviationValidation = require('../../../helpers/validators/state-abbreviation-validation')
const stateValidator = require('../../../helpers/validators/state-validator-adapter')

const makeStateValidation = () => {
  const validations = []

  const requiredFields = ['nome', 'abreviacao']

  requiredFields.forEach((field) => {
    validations.push(requiredFieldValidation(field))
  })

  validations.push(stateNameValidation('nome', stateValidator()))
  validations.push(stateAbbreviationValidation('abreviacao', stateValidator()))

  return validationComposite(validations)
}

module.exports = makeStateValidation
