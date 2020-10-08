const dbDeleteStateById = require('../../../../database/state/db-delete-state-by-id')
const deleteStateByIdRepository = require('../../../../database/mongodb/state-mongo-repository')

const makeDbDeleteStateById = () =>
  dbDeleteStateById(deleteStateByIdRepository())

module.exports = makeDbDeleteStateById
