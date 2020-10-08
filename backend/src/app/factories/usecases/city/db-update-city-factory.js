const dbUpdateCity = require('../../../../database/city/db-update-city')
const updateCityRepository = require('../../../../database/mongodb/city-mongo-repository')

const makeDbUpdateCity = () => dbUpdateCity(updateCityRepository())

module.exports = makeDbUpdateCity
