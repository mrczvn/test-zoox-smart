const dbDeleteCityById = require('../../../../database/city/db-delete-city-by-id')
const deleteCityByIdRepository = require('../../../../database/mongodb/city-mongo-repository')

const makeDbDeleteCityById = () => dbDeleteCityById(deleteCityByIdRepository())

module.exports = makeDbDeleteCityById
