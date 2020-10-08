const dbAddState = require('./db-add-state')
const {
  AddStateRepositorySpy,
  LoadStateByNameRepositorySpy,
  mockAddStateParams,
  mockStateModel
} = require('../../test')

const throwError = () => {
  throw new Error()
}

const makeSut = () => {
  const addStateRepositorySpy = AddStateRepositorySpy()
  const loadStateByNameRepositorySpy = LoadStateByNameRepositorySpy()

  const sut = dbAddState(loadStateByNameRepositorySpy, addStateRepositorySpy)

  return { sut, loadStateByNameRepositorySpy, addStateRepositorySpy }
}

describe('DbAddState', () => {
  const { nome, abreviacao } = mockAddStateParams()

  test('Should call LoadStateByNameRepository with correct values', async () => {
    const { sut, loadStateByNameRepositorySpy } = makeSut()

    await sut.add({ nome, abreviacao })

    expect(loadStateByNameRepositorySpy.name).toBe(nome)
  })

  test('Should return null if LoadStateByNameRepository returns an null', async () => {
    const { sut, loadStateByNameRepositorySpy } = makeSut()

    loadStateByNameRepositorySpy.state = mockStateModel()

    const stateData = await sut.add({ nome, abreviacao })

    expect(stateData).toBeNull()
  })

  test('Should throw if LoadStateByNameRepository throws', async () => {
    const { sut, loadStateByNameRepositorySpy } = makeSut()

    jest
      .spyOn(loadStateByNameRepositorySpy, 'loadByName')
      .mockImplementationOnce(throwError)

    const stateData = sut.add({ nome, abreviacao })

    await expect(stateData).rejects.toThrow()
  })

  test('Should call AddStateRepository with correct values', async () => {
    const { sut, addStateRepositorySpy } = makeSut()

    await sut.add({ nome, abreviacao })
    expect(addStateRepositorySpy.addStateParams.nome).toBe(nome)
    expect(addStateRepositorySpy.addStateParams.abreviacao).toBe(abreviacao)
  })

  test('Should throw if AddStateRepository throws', async () => {
    const { sut, addStateRepositorySpy } = makeSut()

    jest.spyOn(addStateRepositorySpy, 'add').mockImplementationOnce(throwError)

    const stateData = sut.add({ nome, abreviacao })

    await expect(stateData).rejects.toThrow()
  })
})
