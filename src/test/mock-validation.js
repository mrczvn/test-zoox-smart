const ValidationSpy = () => ({
  error: null,
  input: null,

  validate(input) {
    this.input = input

    return this.error
  }
})

module.exports = ValidationSpy
