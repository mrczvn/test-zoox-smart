const dbAddCity = require('../../../../database/city/db-add-city')
const loadCityByNameRepository = require('../../../../database/mongodb/city-mongo-repository')
const addCityRepository = require('../../../../database/mongodb/city-mongo-repository')

const makeDbAddCity = () =>
  dbAddCity(loadCityByNameRepository(), addCityRepository())

module.exports = makeDbAddCity
