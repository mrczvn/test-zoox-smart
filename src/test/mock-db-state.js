const { mockStateModel } = require('./mock-state')

const mockStateModels = [mockStateModel(), mockStateModel()]

const mockAddStateParams = () => ({
  nome: 'any_name',
  abreviacao: 'any_abbreviation'
})

const LoadStateByNameRepositorySpy = () => ({
  name: null,
  state: null,

  loadByName(name) {
    this.name = name

    return this.state
  }
})

const LoadStateByIdRepositorySpy = () => ({
  id: null,
  state: null,

  loadById(id) {
    this.id = id

    return this.state
  }
})

const AddStateRepositorySpy = () => ({
  addStateParams: null,
  state: mockStateModel(),

  add(addStateParams) {
    this.addStateParams = addStateParams

    return this.state
  }
})

const LoadAllStatesRepositorySpy = () => ({
  states: mockStateModels,

  load() {
    return this.states
  }
})

const UpdateStateRepositorySpy = () => ({
  updateStateParams: null,

  update(updateStateParams) {
    this.updateStateParams = updateStateParams
  }
})

const DeleteStateByIdRepositorySpy = () => ({
  stateId: null,

  deleteById(stateId) {
    this.stateId = stateId
  }
})

module.exports = {
  mockAddStateParams,
  AddStateRepositorySpy,
  LoadStateByNameRepositorySpy,
  LoadStateByIdRepositorySpy,
  LoadAllStatesRepositorySpy,
  UpdateStateRepositorySpy,
  DeleteStateByIdRepositorySpy
}
