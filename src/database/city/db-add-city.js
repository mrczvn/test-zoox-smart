const dbAddCity = (loadCityByNameRepository, addCityRepository) => ({
  add: async ({ stateId, nome }) => {
    const city = loadCityByNameRepository.loadByName(nome)

    if (!city) await addCityRepository.add({ stateId, nome })

    return null
  }
})

module.exports = dbAddCity
