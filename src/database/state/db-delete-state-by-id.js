const dbDeleteStateById = (deleteStateByIdRepository) => ({
  deleteById: async (stateId) =>
    await deleteStateByIdRepository.deleteById(stateId)
})

module.exports = dbDeleteStateById
