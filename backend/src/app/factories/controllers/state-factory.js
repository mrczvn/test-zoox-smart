const stateController = require('../../../controllers/state/state-controller')
const makeStateValidation = require('./state-validation-factory')
const makeDbloadStateById = require('../usecases/state/db-load-state-by-id-factory')
const makeDbAddState = require('../usecases/state/db-add-state-factory')
const makeDbGetAllState = require('../usecases/state/db-get-all-state-factory')
const makeDbUpdateState = require('../usecases/state/db-update-state-factory')
const makeDbDeleteStateById = require('../usecases/state/db-delete-state-by-id-factory')

const makeStateController = () =>
  stateController(
    makeStateValidation(),
    makeDbAddState(),
    makeDbGetAllState(),
    makeDbloadStateById(),
    makeDbUpdateState(),
    makeDbDeleteStateById()
  )

module.exports = makeStateController
