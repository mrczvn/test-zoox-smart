const dbAddState = (loadStateByNameRepository, addStateRepository) => ({
  async add({ nome, abreviacao }) {
    const state = await loadStateByNameRepository.loadByName(nome)

    if (!state) {
      const atThisMoment = new Date()
      console.log('dbAdd', state)

      return await addStateRepository.add({
        nome,
        abreviacao,
        data_criacao: atThisMoment,
        data_da_ultima_alteracao: atThisMoment
      })
    }
    return null
  }
})

module.exports = dbAddState
