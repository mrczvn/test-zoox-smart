const { DeleteStateByIdRepositorySpy } = require('../../test')
const dbDeleteStateById = require('./db-delete-state-by-id')

const stateId = 'any_stateId'

const makeSut = () => {
  const deleteStateByIdRepositorySpy = DeleteStateByIdRepositorySpy()

  const sut = dbDeleteStateById(deleteStateByIdRepositorySpy)

  return { sut, deleteStateByIdRepositorySpy }
}

describe('DbDeleteStateById', () => {
  test('Should call DeleteStateByIdRepository with correct values', async () => {
    const { sut, deleteStateByIdRepositorySpy } = makeSut()

    await sut.deleteById(stateId)

    expect(deleteStateByIdRepositorySpy.stateId).toBe(stateId)
  })

  test('Should throw if DeleteStateByIdRepository throws', async () => {
    const { sut, deleteStateByIdRepositorySpy } = makeSut()

    jest
      .spyOn(deleteStateByIdRepositorySpy, 'deleteById')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const state = sut.deleteById(stateId)

    await expect(state).rejects.toThrow()
  })
})
