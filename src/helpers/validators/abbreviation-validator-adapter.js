const { getAllStates } = require('easy-location-br')

const abbreviationValidatorAdapter = () => ({
  isValid: (abbreviation) => {
    const findAbbreviation = (acc, abv) => acc || abv.id.includes(abbreviation)

    return getAllStates().reduce(findAbbreviation, false)
  }
})

module.exports = abbreviationValidatorAdapter
