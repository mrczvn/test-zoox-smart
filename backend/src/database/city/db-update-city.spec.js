const { UpdateCityRepositorySpy } = require('../../test')
const dbUpdateCity = require('./db-update-city')

const mockUpdateCityParams = () => ({
  cityId: 'any_cityId',
  nome: 'any_name'
})

const makeSut = () => {
  const updateCityRepositorySpy = UpdateCityRepositorySpy()

  const sut = dbUpdateCity(updateCityRepositorySpy)

  return { sut, updateCityRepositorySpy }
}

describe('DbUpdateCity', () => {
  test('Should call UpdateCityRepository with correct values', async () => {
    const { sut, updateCityRepositorySpy } = makeSut()

    await sut.update(mockUpdateCityParams())

    expect(updateCityRepositorySpy.updateCityParams).toEqual(
      mockUpdateCityParams()
    )
  })

  test('Should throw if UpdateCityRepository throws', async () => {
    const { sut, updateCityRepositorySpy } = makeSut()

    jest.spyOn(updateCityRepositorySpy, 'update').mockImplementationOnce(() => {
      throw new Error()
    })

    const city = sut.update(mockUpdateCityParams())

    await expect(city).rejects.toThrow()
  })
})
