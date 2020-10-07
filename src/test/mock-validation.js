const ValidationSpy = () => ({
  error: null,
  input: null,

  validate(input) {
    this.input = input

    return this.error
  }
})

const AbbreviationValidatorSpy = () => ({
  isAbbreviationValid: true,
  abbreviation: null,

  isValid(abbreviation) {
    this.abbreviation = abbreviation

    return this.isAbbreviationValid
  }
})

module.exports = { ValidationSpy, AbbreviationValidatorSpy }
