const cityController = require('../../../controllers/city/city-controller')
const makeCityValidation = require('./city-validation-factory')
const makeDbloadStateById = require('../usecases/state/db-load-state-by-id-factory')
const makeDbAddCity = require('../usecases/city/db-add-city-factory')
const makeDbGetAllCity = require('../usecases/city/db-get-all-city-factory')
const makeDbloadCityById = require('../usecases/city/db-load-city-by-id-factory')
const makeDbUpdateCity = require('../usecases/city/db-update-city-factory')
const makeDbDeleteCityById = require('../usecases/city/db-delete-city-by-id-factory')

const makeCityController = () =>
  cityController(
    makeCityValidation(),
    makeDbloadStateById(),
    makeDbAddCity(),
    makeDbGetAllCity(),
    makeDbloadCityById(),
    makeDbUpdateCity(),
    makeDbDeleteCityById()
  )

module.exports = makeCityController
