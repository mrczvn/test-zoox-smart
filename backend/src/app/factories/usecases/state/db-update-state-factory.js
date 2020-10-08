const dbUpdateState = require('../../../../database/state/db-update-state')
const updateStateRepository = require('../../../../database/mongodb/state-mongo-repository')

const makeDbUpdateState = () => dbUpdateState(updateStateRepository())

module.exports = makeDbUpdateState
