const dbAddState = require('../../../../database/state/db-add-state')
const loadStateByNameRepository = require('../../../../database/mongodb/state-mongo-repository')
const addStateRepository = require('../../../../database/mongodb/state-mongo-repository')

const makeDbAddState = () =>
  dbAddState(loadStateByNameRepository(), addStateRepository())

module.exports = makeDbAddState
