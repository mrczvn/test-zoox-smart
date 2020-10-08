const dbLoadCityById = require('../../../../database/city/db-load-city-by-id')
const loadCityByIdRepository = require('../../../../database/mongodb/city-mongo-repository')

const makeDbLoadCityById = () => dbLoadCityById(loadCityByIdRepository())

module.exports = makeDbLoadCityById
