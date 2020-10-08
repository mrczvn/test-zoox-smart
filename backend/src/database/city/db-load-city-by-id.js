const dbLoadCityById = (loadCityByIdRepository) => ({
  loadById: async (cityId) => {
    if (cityId.length !== 24) return null

    return await loadCityByIdRepository.loadById(cityId)
  }
})

module.exports = dbLoadCityById
