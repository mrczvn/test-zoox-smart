const dbLoadCityById = (loadCityByIdRepository) => ({
  loadById: async (cityId) => await loadCityByIdRepository.loadById(cityId)
})

module.exports = dbLoadCityById
