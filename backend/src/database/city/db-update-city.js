const dbUpdateCity = (updateCityRepository) => ({
  update: async (cityParams) => await updateCityRepository.update(cityParams)
})

module.exports = dbUpdateCity
