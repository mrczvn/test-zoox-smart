const dbGetAllCity = require('../../../../database/city/db-get-all-city')
const loadAllCitysRepository = require('../../../../database/mongodb/city-mongo-repository')

const makeDbGetAllCity = () => dbGetAllCity(loadAllCitysRepository())

module.exports = makeDbGetAllCity
