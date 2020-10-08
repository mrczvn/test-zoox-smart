const { DeleteCityByIdRepositorySpy } = require('../../test')
const dbDeleteCityById = require('./db-delete-city-by-id')

const cityId = 'any_cityId'

const makeSut = () => {
  const deleteCityByIdRepositorySpy = DeleteCityByIdRepositorySpy()

  const sut = dbDeleteCityById(deleteCityByIdRepositorySpy)

  return { sut, deleteCityByIdRepositorySpy }
}

describe('DbDeleteCityById', () => {
  test('Should call DeleteCityByIdRepository with correct values', async () => {
    const { sut, deleteCityByIdRepositorySpy } = makeSut()

    await sut.deleteById(cityId)

    expect(deleteCityByIdRepositorySpy.cityId).toBe(cityId)
  })

  test('Should throw if DeleteCityByIdRepository throws', async () => {
    const { sut, deleteCityByIdRepositorySpy } = makeSut()

    jest
      .spyOn(deleteCityByIdRepositorySpy, 'deleteById')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const city = sut.deleteById(cityId)

    await expect(city).rejects.toThrow()
  })
})
