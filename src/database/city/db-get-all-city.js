const dbLoadAllCitys = (loadAllCitysRepository) => ({
  load: async () => await loadAllCitysRepository.load()
})

module.exports = dbLoadAllCitys
