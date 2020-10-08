const { getAllCities } = require('easy-location-br')
const equalsIgnoreCase = require('../../util/equals-ignore-case')

const cityValidatorAdapter = () => ({
  isValidStateId: (stateId) =>
    getAllCities().reduce(
      (acc, city) => acc || equalsIgnoreCase(city.stateId, stateId),
      false
    ),

  isValidName: (cityName) =>
    getAllCities().reduce(
      (acc, city) => acc || equalsIgnoreCase(city.name, cityName),
      false
    )
})

module.exports = cityValidatorAdapter
