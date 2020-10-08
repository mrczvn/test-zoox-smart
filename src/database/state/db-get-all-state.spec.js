const { LoadAllStatesRepositorySpy } = require('../../test')
const dbLoadAllStates = require('./db-get-all-state')

const makeSut = () => {
  const loadAllStatesRepositorySpy = LoadAllStatesRepositorySpy()

  const sut = dbLoadAllStates(loadAllStatesRepositorySpy)

  return { sut, loadAllStatesRepositorySpy }
}

describe('DbLoadAllStates', () => {
  test('Should return a null if LoadAllStatesRepository returns an null', async () => {
    const { sut, loadAllStatesRepositorySpy } = makeSut()

    loadAllStatesRepositorySpy.states = null

    const states = await sut.load()

    expect(states).toBeNull()
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadAllStatesRepositorySpy } = makeSut()

    jest
      .spyOn(loadAllStatesRepositorySpy, 'load')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const states = sut.load()

    await expect(states).rejects.toThrow()
  })

  test('Should return a list of States on success', async () => {
    const { sut, loadAllStatesRepositorySpy } = makeSut()

    const states = await sut.load()

    expect(states).toEqual(loadAllStatesRepositorySpy.states)
  })
})
