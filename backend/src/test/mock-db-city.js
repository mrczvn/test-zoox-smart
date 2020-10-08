const { mockCityModel } = require('./mock-city')

const mockCityModels = [mockCityModel(), mockCityModel()]

const mockAddCityParams = () => ({
  stateId: 'any_stateId',
  nome: 'any_nome'
})

const LoadCityByNameRepositorySpy = () => ({
  name: null,
  city: null,

  loadByName(name) {
    this.name = name

    return this.city
  }
})

const LoadCityByIdRepositorySpy = () => ({
  id: null,
  city: null,

  loadById(id) {
    this.id = id

    return this.city
  }
})

const AddCityRepositorySpy = () => ({
  addCityParams: null,
  city: mockCityModel(),

  add(addCityParams) {
    this.addCityParams = addCityParams

    return this.city
  }
})

const LoadAllCitysRepositorySpy = () => ({
  citys: mockCityModels,

  load() {
    return this.citys
  }
})

const UpdateCityRepositorySpy = () => ({
  updateCityParams: null,

  update(updateCityParams) {
    this.updateCityParams = updateCityParams
  }
})

const DeleteCityByIdRepositorySpy = () => ({
  cityId: null,

  deleteById(cityId) {
    this.cityId = cityId
  }
})

module.exports = {
  mockAddCityParams,
  AddCityRepositorySpy,
  LoadCityByNameRepositorySpy,
  LoadCityByIdRepositorySpy,
  LoadAllCitysRepositorySpy,
  UpdateCityRepositorySpy,
  DeleteCityByIdRepositorySpy
}
