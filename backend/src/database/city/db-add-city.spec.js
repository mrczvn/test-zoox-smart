const dbAddCity = require('./db-add-city')
const {
  AddCityRepositorySpy,
  mockAddCityParams,
  LoadCityByNameRepositorySpy
} = require('../../test')
const { mockCityModel } = require('../../test/mock-city')

const throwError = () => {
  throw new Error()
}

const makeSut = () => {
  const loadCityByNameRepositorySpy = LoadCityByNameRepositorySpy()
  const addCityRepositorySpy = AddCityRepositorySpy()

  const sut = dbAddCity(loadCityByNameRepositorySpy, addCityRepositorySpy)

  return { sut, loadCityByNameRepositorySpy, addCityRepositorySpy }
}

describe('DbAddCity', () => {
  const { stateId, nome } = mockAddCityParams()

  test('Should call LoadCityByNameRepository with correct values', async () => {
    const { sut, loadCityByNameRepositorySpy } = makeSut()

    await sut.add({ stateId, nome })

    expect(loadCityByNameRepositorySpy.name).toBe(nome)
  })

  test('Should return null if LoadCityByNameRepository returns an null', async () => {
    const { sut, loadCityByNameRepositorySpy } = makeSut()

    loadCityByNameRepositorySpy.city = mockCityModel()

    const stateData = await sut.add({ stateId, nome })

    expect(stateData).toBeNull()
  })

  test('Should throw if LoadCityByNameRepository throws', async () => {
    const { sut, loadCityByNameRepositorySpy } = makeSut()

    jest
      .spyOn(loadCityByNameRepositorySpy, 'loadByName')
      .mockImplementationOnce(throwError)

    const stateData = sut.add({ stateId, nome })

    await expect(stateData).rejects.toThrow()
  })

  test('Should call AddCityRepository with correct values', async () => {
    const { sut, addCityRepositorySpy } = makeSut()

    await sut.add({ stateId, nome })

    expect(addCityRepositorySpy.addCityParams.nome).toBe(nome)
    expect(addCityRepositorySpy.addCityParams.stateId).toBe(stateId)
  })

  test('Should return null if AddCityRepository returns an null', async () => {
    const { sut, addCityRepositorySpy } = makeSut()

    addCityRepositorySpy.city = null

    const stateData = await sut.add({ stateId, nome })

    expect(stateData).toBeNull()
  })

  test('Should throw if LoadStateByNameRepositorySpy throws', async () => {
    const { sut, addCityRepositorySpy } = makeSut()

    jest.spyOn(addCityRepositorySpy, 'add').mockImplementationOnce(throwError)

    const stateData = sut.add({ stateId, nome })

    await expect(stateData).rejects.toThrow()
  })
})
