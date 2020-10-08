const {
  adaptRouteAdd,
  adaptRouteGetAll,
  adaptRouteUpdate,
  adaptRouteDelete
} = require('../adapters/express-router-adapter')
const makeStateController = require('../factories/controllers/state-factory')

module.exports = (router) => {
  router.post('/state', adaptRouteAdd(makeStateController()))
  router.get('/state', adaptRouteGetAll(makeStateController()))
  router.put('/state/:stateId', adaptRouteUpdate(makeStateController()))
  router.delete('/state/:stateId', adaptRouteDelete(makeStateController()))
}
