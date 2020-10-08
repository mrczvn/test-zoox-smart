const dbDeleteCityById = (deleteCityByIdRepository) => ({
  deleteById: async (cityId) =>
    await deleteCityByIdRepository.deleteById(cityId)
})

module.exports = dbDeleteCityById
