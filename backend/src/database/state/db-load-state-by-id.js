const dbLoadStateById = (loadStateByIdRepository) => ({
  loadById: async (stateId) => {
    if (stateId.length !== 24) return null

    return await loadStateByIdRepository.loadById(stateId)
  }
})

module.exports = dbLoadStateById
