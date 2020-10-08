const dbLoadStateById = require('../../../../database/state/db-load-state-by-id')
const loadStateByIdRepository = require('../../../../database/mongodb/state-mongo-repository')

const makeDbLoadStateById = () => dbLoadStateById(loadStateByIdRepository())

module.exports = makeDbLoadStateById
