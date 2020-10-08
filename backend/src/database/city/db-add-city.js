const dbAddCity = (loadCityByNameRepository, addCityRepository) => ({
  add: async ({ stateId, nome }) => {
    const city = loadCityByNameRepository.loadByName(nome)

    if (!city) {
      const atThisMoment = new Date()

      return await addCityRepository.add({
        nome,
        stateId,
        data_criacao: atThisMoment,
        data_da_ultima_alteracao: atThisMoment
      })
    }

    return null
  }
})

module.exports = dbAddCity
