const { LoadAllCitysRepositorySpy } = require('../../test')
const dbLoadAllCitys = require('./db-get-all-city')

const makeSut = () => {
  const loadAllCitysRepositorySpy = LoadAllCitysRepositorySpy()

  const sut = dbLoadAllCitys(loadAllCitysRepositorySpy)

  return { sut, loadAllCitysRepositorySpy }
}

describe('DbLoadAllCitys', () => {
  test('Should return a null if LoadAllCitysRepository returns an null', async () => {
    const { sut, loadAllCitysRepositorySpy } = makeSut()

    loadAllCitysRepositorySpy.citys = null

    const citys = await sut.load()

    expect(citys).toBeNull()
  })

  test('Should throw if LoadAllCitysRepository throws', async () => {
    const { sut, loadAllCitysRepositorySpy } = makeSut()

    jest.spyOn(loadAllCitysRepositorySpy, 'load').mockImplementationOnce(() => {
      throw new Error()
    })

    const citys = sut.load()

    await expect(citys).rejects.toThrow()
  })

  test('Should return a list of Citys on success', async () => {
    const { sut, loadAllCitysRepositorySpy } = makeSut()

    const citys = await sut.load()

    expect(citys).toEqual(loadAllCitysRepositorySpy.citys)
  })
})
