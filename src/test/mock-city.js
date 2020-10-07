const mockCityModel = (
  creationDate = new Date('2020-09-29 12:00'),
  dataUpdate = new Date('2020-09-29 12:00')
) => ({
  id: 'any_id',
  nome: 'any_nome',
  stateId: 'any_stateId',
  data_de_criacao: creationDate,
  data_da_última_alteracao: dataUpdate
})

const mockCityModels = [mockCityModel(), mockCityModel()]

const AddCitySpy = () => ({
  addCityParams: null,
  city: mockCityModel(),

  add(addCityParams) {
    this.addCityParams = addCityParams

    return this.city
  }
})

const LoadCityByIdSpy = () => ({
  id: null,
  cityModel: mockCityModel(),

  loadById(id) {
    this.id = id

    return this.cityModel
  }
})

const LoadCitysSpy = () => ({
  citysModels: mockCityModels,

  load() {
    return this.citysModels
  }
})

const UpdateCitySpy = () => ({
  updateCityParams: null,
  cityModel: mockCityModel(),

  update(updateCityParams) {
    this.updateCityParams = updateCityParams

    return this.cityModel
  }
})

const DeleteCityByIdSpy = () => ({
  id: null,

  deleteById(id) {
    this.id = id
  }
})

module.exports = {
  AddCitySpy,
  LoadCitysSpy,
  LoadCityByIdSpy,
  UpdateCitySpy,
  DeleteCityByIdSpy
}
