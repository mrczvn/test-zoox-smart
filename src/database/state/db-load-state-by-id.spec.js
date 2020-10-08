const { LoadStateByIdRepositorySpy } = require('../../test')
const dbLoadStateById = require('./db-load-state-by-id')

const stateId = 'any_stateId'

const makeSut = () => {
  const loadStateByIdRepositorySpy = LoadStateByIdRepositorySpy()

  const sut = dbLoadStateById(loadStateByIdRepositorySpy)

  return { sut, loadStateByIdRepositorySpy }
}

describe('DbLoadStateById', () => {
  test('Should call LoadStateByIdRepository with correct values', async () => {
    const { sut, loadStateByIdRepositorySpy } = makeSut()

    await sut.loadById(stateId)

    expect(loadStateByIdRepositorySpy.id).toBe(stateId)
  })

  test('Should return a null if LoadStateByIdRepository returns an null', async () => {
    const { sut, loadStateByIdRepositorySpy } = makeSut()

    loadStateByIdRepositorySpy.state = null

    const state = await sut.loadById(stateId)

    expect(state).toBeNull()
  })

  test('Should throw if LoadStateByIdRepository throws', async () => {
    const { sut, loadStateByIdRepositorySpy } = makeSut()

    jest
      .spyOn(loadStateByIdRepositorySpy, 'loadById')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const states = sut.loadById(stateId)

    await expect(states).rejects.toThrow()
  })

  test('Should return an state on success', async () => {
    const { sut, loadStateByIdRepositorySpy } = makeSut()

    const state = await sut.loadById(stateId)

    expect(state).toEqual(loadStateByIdRepositorySpy.state)
  })
})
