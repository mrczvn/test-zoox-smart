const stateController = require('./state-controller')
const {
  badRequest,
  missingParamError,
  serverError,
  forbidden,
  StateInUseError,
  created,
  noContent,
  ok
} = require('./state-controller-protocols')
const {
  AddStateSpy,
  DeleteStateByIdSpy,
  ValidationSpy,
  LoadStatesSpy,
  LoadStateByIdSpy,
  UpdateStateSpy
} = require('../../test')
const { invalidParamError } = require('../../helpers/errors')

const mockRequest = () => ({
  body: { nome: 'any_nome', abreviacao: 'any_abreviação' },
  params: { stateId: 'any_id' }
})

const throwError = () => {
  throw new Error()
}

const makeSut = () => {
  const validationSpy = ValidationSpy()
  const addStateSpy = AddStateSpy()
  const loadStatesSpy = LoadStatesSpy()
  const loadStateByIdSpy = LoadStateByIdSpy()
  const updateStateSpy = UpdateStateSpy()
  const deleteStateByIdSpy = DeleteStateByIdSpy()

  const sut = stateController(
    validationSpy,
    addStateSpy,
    loadStatesSpy,
    loadStateByIdSpy,
    updateStateSpy,
    deleteStateByIdSpy
  )

  return {
    sut,
    validationSpy,
    addStateSpy,
    loadStatesSpy,
    loadStateByIdSpy,
    updateStateSpy,
    deleteStateByIdSpy
  }
}

describe('State Controller', () => {
  const mockFakeRequest = mockRequest()

  describe('add()', () => {
    test('Should call Validation with correct values', async () => {
      const { sut, validationSpy } = makeSut()

      await sut.add(mockFakeRequest)

      expect(validationSpy.input).toEqual(mockFakeRequest.body)
    })

    test('Should return 400 if Validation returns an error', async () => {
      const { sut, validationSpy } = makeSut()

      validationSpy.error = missingParamError('any_field')

      const httpResponse = await sut.add(mockFakeRequest)

      expect(httpResponse).toEqual(badRequest(validationSpy.error))
    })

    test('Should return 400 if Validation throws', async () => {
      const { sut, validationSpy } = makeSut()

      jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)

      const httpResponse = await sut.add(mockFakeRequest)

      expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should call AddState with correct values', async () => {
      const { sut, addStateSpy } = makeSut()

      await sut.add(mockFakeRequest)

      expect(addStateSpy.addStateParams).toEqual({
        nome: mockFakeRequest.body.nome,
        abreviacao: mockFakeRequest.body.abreviacao
      })
    })

    test('Should return 401 if AddAccount returns null', async () => {
      const { sut, addStateSpy } = makeSut()

      addStateSpy.state = null

      const httpResponse = await sut.add(mockFakeRequest)

      expect(httpResponse).toEqual(forbidden(StateInUseError()))
    })

    test('Should return 500 if AddAccount throws', async () => {
      const { sut, addStateSpy } = makeSut()

      jest.spyOn(addStateSpy, 'add').mockImplementationOnce(throwError)

      const httpResponse = await sut.add(mockFakeRequest)

      expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 200 an account on success', async () => {
      const { sut } = makeSut()

      const httpRequest = await sut.add(mockFakeRequest)

      expect(httpRequest).toEqual(created())
    })
  })

  describe('getAll()', () => {
    test('Should return 204 if LoadStates returns empty', async () => {
      const { sut, loadStatesSpy } = makeSut()

      loadStatesSpy.statesModels = []

      const httpResponse = await sut.getAll()

      expect(httpResponse).toEqual(noContent())
    })

    test('Should return 500 if LoadStates throws', async () => {
      const { sut, loadStatesSpy } = makeSut()

      jest.spyOn(loadStatesSpy, 'load').mockImplementationOnce(throwError)

      const httpResponse = await sut.getAll()

      expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 200 on success', async () => {
      const { sut, loadStatesSpy } = makeSut()

      const httpResponse = await sut.getAll()

      expect(httpResponse).toEqual(ok(loadStatesSpy.statesModels))
    })
  })

  describe('update()', () => {
    test('Should call LoadStateById with correct values', async () => {
      const { sut, loadStateByIdSpy } = makeSut()

      await sut.update(mockFakeRequest)

      expect(loadStateByIdSpy.id).toBe(mockFakeRequest.params.stateId)
    })

    test('Should return 403 if LoadStateById returns null', async () => {
      const { sut, loadStateByIdSpy } = makeSut()

      loadStateByIdSpy.stateModel = null

      const httpResponse = await sut.update(mockFakeRequest)

      expect(httpResponse).toEqual(forbidden(invalidParamError('stateId')))
    })

    test('Should return 500 if LoadStateById throws', async () => {
      const { sut, loadStateByIdSpy } = makeSut()

      jest
        .spyOn(loadStateByIdSpy, 'loadById')
        .mockImplementationOnce(throwError)

      const httpResponse = await sut.update(mockFakeRequest)

      expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should call Validation with correct values', async () => {
      const { sut, validationSpy } = makeSut()

      await sut.update(mockFakeRequest)

      expect(validationSpy.input).toEqual(mockFakeRequest.body)
    })

    test('Should return 400 if Validation returns an error', async () => {
      const { sut, validationSpy } = makeSut()

      validationSpy.error = missingParamError('any_field')

      const httpResponse = await sut.update(mockFakeRequest)

      expect(httpResponse).toEqual(badRequest(missingParamError('any_field')))
    })

    test('Should return 500 if Validation throws', async () => {
      const { sut, validationSpy } = makeSut()

      jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)

      const httpResponse = await sut.update(mockFakeRequest)

      expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should call UpdateState with correct values', async () => {
      const { sut, updateStateSpy } = makeSut()

      await sut.update(mockFakeRequest)

      expect(updateStateSpy.updateStateParams).toEqual({
        stateId: mockFakeRequest.params.stateId,
        ...mockFakeRequest.body
      })
    })

    test('Should return 500 if UpdateState throws', async () => {
      const { sut, updateStateSpy } = makeSut()

      jest.spyOn(updateStateSpy, 'update').mockImplementationOnce(throwError)

      const httpResponse = await sut.update(mockFakeRequest)

      expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 204 on success', async () => {
      const { sut } = makeSut()

      const httpResponse = await sut.update(mockFakeRequest)

      expect(httpResponse).toEqual(noContent())
    })
  })

  describe('delete()', () => {
    test('Should call LoadStateById with correct values', async () => {
      const { sut, loadStateByIdSpy } = makeSut()

      await sut.delete(mockFakeRequest)

      expect(loadStateByIdSpy.id).toBe(mockFakeRequest.params.stateId)
    })

    test('Should return 403 if LoadStateById retuns null', async () => {
      const { sut, loadStateByIdSpy } = makeSut()

      loadStateByIdSpy.stateModel = null

      const httpResponse = await sut.delete(mockFakeRequest)

      expect(httpResponse).toEqual(forbidden(invalidParamError('stateId')))
    })

    test('Should return 500 if LoadStateById throws', async () => {
      const { sut, loadStateByIdSpy } = makeSut()

      jest
        .spyOn(loadStateByIdSpy, 'loadById')
        .mockImplementationOnce(throwError)

      const httpResponse = await sut.delete(mockFakeRequest)

      expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should call DeleteStateById with correct values', async () => {
      const { sut, deleteStateByIdSpy } = makeSut()

      await sut.delete(mockFakeRequest)

      expect(deleteStateByIdSpy.id).toBe(mockFakeRequest.params.stateId)
    })

    test('Should return 500 if DeleteStateById throws', async () => {
      const { sut, deleteStateByIdSpy } = makeSut()

      jest
        .spyOn(deleteStateByIdSpy, 'deleteById')
        .mockImplementationOnce(throwError)

      const httpResponse = await sut.delete(mockFakeRequest)

      expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 204 on success', async () => {
      const { sut } = makeSut()

      const httpResponse = await sut.delete(mockFakeRequest)

      expect(httpResponse).toEqual(noContent())
    })
  })
})
