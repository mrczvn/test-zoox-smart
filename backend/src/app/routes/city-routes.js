const {
  adaptRouteAdd,
  adaptRouteGetAll,
  adaptRouteUpdate,
  adaptRouteDelete
} = require('../adapters/express-router-adapter')
const makeCityController = require('../factories/controllers/city-factory')

module.exports = (router) => {
  router.post('/city/:stateId', adaptRouteAdd(makeCityController()))
  router.get('/city', adaptRouteGetAll(makeCityController()))
  router.put('/city/:cityId', adaptRouteUpdate(makeCityController()))
  router.delete('/city/:cityId', adaptRouteDelete(makeCityController()))
}
