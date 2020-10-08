const dbLoadStateById = (loadStateByIdRepository) => ({
  loadById: async (stateId) => await loadStateByIdRepository.loadById(stateId)
})

module.exports = dbLoadStateById
