const ValidationSpy = () => ({
  error: null,
  input: null,

  validate(input) {
    this.input = input

    return this.error
  }
})

const StateValidatorAdapterSpy = () => ({
  isAbbreviationValid: true,
  isStateNameValid: true,
  abbreviation: null,
  stateName: null,

  isValidAbbreviation(abbreviation) {
    this.abbreviation = abbreviation

    return this.isAbbreviationValid
  },

  isValidName(stateName) {
    this.stateName = stateName

    return this.isStateNameValid
  }
})

const CityValidatorAdapterSpy = () => ({
  isStateIdValid: true,
  isCityNameValid: true,
  stateId: null,
  cityName: null,

  isValidStateId(stateId) {
    this.stateId = stateId

    return this.isStateIdValid
  },

  isValidName(cityName) {
    this.cityName = cityName

    return this.isCityNameValid
  }
})

module.exports = {
  ValidationSpy,
  StateValidatorAdapterSpy,
  CityValidatorAdapterSpy
}
