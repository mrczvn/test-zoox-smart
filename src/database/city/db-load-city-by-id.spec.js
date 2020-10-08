const { LoadCityByIdRepositorySpy } = require('../../test')
const dbLoadCityById = require('./db-load-city-by-id')

const cityId = 'any_cityId'

const makeSut = () => {
  const loadCityByIdRepositorySpy = LoadCityByIdRepositorySpy()

  const sut = dbLoadCityById(loadCityByIdRepositorySpy)

  return { sut, loadCityByIdRepositorySpy }
}

describe('DbLoadCityById', () => {
  test('Should call LoadCityByIdRepository with correct values', async () => {
    const { sut, loadCityByIdRepositorySpy } = makeSut()

    await sut.loadById(cityId)

    expect(loadCityByIdRepositorySpy.id).toBe(cityId)
  })

  test('Should return a null if LoadCityByIdRepository returns an null', async () => {
    const { sut, loadCityByIdRepositorySpy } = makeSut()

    loadCityByIdRepositorySpy.city = null

    const city = await sut.loadById(cityId)

    expect(city).toBeNull()
  })

  test('Should throw if LoadCityByIdRepository throws', async () => {
    const { sut, loadCityByIdRepositorySpy } = makeSut()

    jest
      .spyOn(loadCityByIdRepositorySpy, 'loadById')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const city = sut.loadById(cityId)

    await expect(city).rejects.toThrow()
  })

  test('Should return an city on success', async () => {
    const { sut, loadCityByIdRepositorySpy } = makeSut()

    const city = await sut.loadById(cityId)

    expect(city).toEqual(loadCityByIdRepositorySpy.city)
  })
})
