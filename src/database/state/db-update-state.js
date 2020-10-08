const dbUpdateState = (updateStateRepository) => ({
  update: async (stateParams) => await updateStateRepository.update(stateParams)
})

module.exports = dbUpdateState
