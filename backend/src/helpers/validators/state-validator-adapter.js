const { getAllStates } = require('easy-location-br')
const equalsIgnoreCase = require('../../util/equals-ignore-case')

const stateValidatorAdapter = () => ({
  isValidAbbreviation: (abbreviation) =>
    getAllStates().reduce(
      (acc, abv) => acc || equalsIgnoreCase(abv.id, abbreviation),
      false
    ),

  isValidName: (stateName) =>
    getAllStates().reduce(
      (acc, state) => acc || equalsIgnoreCase(state.name, stateName),
      false
    )
})

module.exports = stateValidatorAdapter
