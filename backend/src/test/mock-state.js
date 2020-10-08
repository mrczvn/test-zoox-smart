const mockStateModel = (
  creationDate = new Date('2020-09-29 12:00'),
  dataUpdate = new Date('2020-09-29 12:00')
) => ({
  id: 'any_id',
  nome: 'any_nome',
  abreviacao: 'any_abreviação',
  data_de_criacao: creationDate,
  data_da_última_alteracao: dataUpdate
})

const mockStateModels = [mockStateModel(), mockStateModel()]

const AddStateSpy = () => ({
  addStateParams: null,
  state: mockStateModel(),

  add(addStateParams) {
    this.addStateParams = addStateParams

    return this.state
  }
})

const LoadStatesSpy = () => ({
  statesModels: mockStateModels,

  load() {
    return this.statesModels
  }
})

const LoadStateByIdSpy = () => ({
  id: null,
  stateModel: mockStateModel(),

  loadById(id) {
    this.id = id

    return this.stateModel
  }
})

const UpdateStateSpy = () => ({
  updateStateParams: null,
  stateModel: mockStateModel(),

  update(updateStateParams) {
    this.updateStateParams = updateStateParams

    return this.stateModel
  }
})

const DeleteStateByIdSpy = () => ({
  id: null,

  deleteById(id) {
    this.id = id
  }
})

module.exports = {
  mockStateModel,
  AddStateSpy,
  LoadStatesSpy,
  LoadStateByIdSpy,
  UpdateStateSpy,
  DeleteStateByIdSpy
}
