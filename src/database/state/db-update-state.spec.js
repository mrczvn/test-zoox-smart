const { UpdateStateRepositorySpy } = require('../../test')
const dbUpdateState = require('./db-update-state')

const mockUpdateStateParams = () => ({
  stateId: 'any_stateId',
  nome: 'any_name',
  abreviacao: 'any_abbreviation'
})

const makeSut = () => {
  const updateStateRepositorySpy = UpdateStateRepositorySpy()

  const sut = dbUpdateState(updateStateRepositorySpy)

  return { sut, updateStateRepositorySpy }
}

describe('DbUpdateState', () => {
  test('Should call UpdateStateRepository with correct values', async () => {
    const { sut, updateStateRepositorySpy } = makeSut()

    await sut.update(mockUpdateStateParams())

    expect(updateStateRepositorySpy.updateStateParams).toEqual(
      mockUpdateStateParams()
    )
  })

  test('Should throw if UpdateStateRepository throws', async () => {
    const { sut, updateStateRepositorySpy } = makeSut()

    jest
      .spyOn(updateStateRepositorySpy, 'update')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const state = sut.update(mockUpdateStateParams())

    await expect(state).rejects.toThrow()
  })
})
