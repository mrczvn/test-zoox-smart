const dbLoadAllStates = (loadAllStatesRepository) => ({
  load: async () => await loadAllStatesRepository.load()
})

module.exports = dbLoadAllStates
