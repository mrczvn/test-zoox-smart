const dbGetAllState = require('../../../../database/state/db-get-all-state')
const loadAllStatesRepository = require('../../../../database/mongodb/state-mongo-repository')

const makeDbGetAllState = () => dbGetAllState(loadAllStatesRepository())

module.exports = makeDbGetAllState
