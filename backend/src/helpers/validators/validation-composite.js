const validationComposite = (validations) => ({
  validate: (input) =>
    validations.reduce(
      (acc, validation) => acc || validation.validate(input),
      validations[0].validate(input)
    )
})

module.exports = validationComposite
