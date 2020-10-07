const {
  ValidationSpy,
  LoadStateByIdSpy,
  AddCitySpy,
  LoadCitysSpy,
  LoadCityByIdSpy,
  UpdateCitySpy,
  DeleteCityByIdSpy
} = require('../../test')
const cityController = require('./city-controller')
const {
  badRequest,
  invalidParamError,
  missingParamError,
  serverError,
  forbidden,
  CityInUseError,
  created,
  noContent,
  ok
} = require('./city-controller-protocols')

const mockRequest = () => ({
  body: { nome: 'any_nome' },
  params: { stateId: 'any_id', cityId: 'any_id' }
})

const throwError = () => {
  throw new Error()
}

const makeSut = () => {
  const validationSpy = ValidationSpy()
  const loadStateById = LoadStateByIdSpy()
  const addCitySpy = AddCitySpy()
  const loadCitysSpy = LoadCitysSpy()
  const loadCityByIdSpy = LoadCityByIdSpy()
  const updateCitySpy = UpdateCitySpy()
  const deleteCityByIdSpy = DeleteCityByIdSpy()

  const sut = cityController(
    validationSpy,
    loadStateById,
    addCitySpy,
    loadCitysSpy,
    loadCityByIdSpy,
    updateCitySpy,
    deleteCityByIdSpy
  )

  return {
    sut,
    validationSpy,
    loadStateById,
    addCitySpy,
    loadCitysSpy,
    loadCityByIdSpy,
    updateCitySpy,
    deleteCityByIdSpy
  }
}

describe('City Controller', () => {
  const mockFakeRequest = mockRequest()

  describe('add()', () => {
    test('Should call LoadStateById with correct values', async () => {
      const { sut, loadStateById } = makeSut()

      await sut.add(mockFakeRequest)

      expect(loadStateById.id).toBe(mockFakeRequest.params.stateId)
    })

    test('Should return 400 if LoadStateById returns an null', async () => {
      const { sut, loadStateById } = makeSut()

      loadStateById.stateModel = null

      const httpResponse = await sut.add(mockFakeRequest)

      expect(httpResponse).toEqual(badRequest(invalidParamError('stateId')))
    })

    test('Should return 500 if LoadStateById throws', async () => {
      const { sut, loadStateById } = makeSut()

      jest.spyOn(loadStateById, 'loadById').mockImplementationOnce(throwError)

      const httpResponse = await sut.add(mockFakeRequest)

      expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should call Validation with correct values', async () => {
      const { sut, validationSpy } = makeSut()

      await sut.add(mockFakeRequest)

      expect(validationSpy.input).toEqual(mockFakeRequest.body)
    })

    test('Should return 400 if Validation returns an error', async () => {
      const { sut, validationSpy } = makeSut()

      validationSpy.error = missingParamError('any_field')

      const httpResponse = await sut.add(mockFakeRequest)

      expect(httpResponse).toEqual(badRequest(missingParamError('any_field')))
    })

    test('Should return 500 if Validation throws', async () => {
      const { sut, validationSpy } = makeSut()

      jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)

      const httpResponse = await sut.add(mockFakeRequest)

      expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should call AddCity with correct values', async () => {
      const { sut, addCitySpy } = makeSut()

      await sut.add(mockFakeRequest)

      expect(addCitySpy.addCityParams).toEqual({
        stateId: mockFakeRequest.params.stateId,
        nome: mockFakeRequest.body.nome
      })
    })

    test('Should return 403 if addCity returns an null', async () => {
      const { sut, addCitySpy } = makeSut()

      addCitySpy.city = null

      const httpResponse = await sut.add(mockFakeRequest)

      expect(httpResponse).toEqual(forbidden(CityInUseError()))
    })

    test('Should return 500 if addCity throws', async () => {
      const { sut, addCitySpy } = makeSut()

      jest.spyOn(addCitySpy, 'add').mockImplementationOnce(throwError)

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
    test('Should return 204 if LoadCitys returns empty', async () => {
      const { sut, loadCitysSpy } = makeSut()

      loadCitysSpy.citysModels = []

      const httpResponse = await sut.getAll()

      expect(httpResponse).toEqual(noContent())
    })

    test('Should return 500 if LoadCitys throws', async () => {
      const { sut, loadCitysSpy } = makeSut()

      jest.spyOn(loadCitysSpy, 'load').mockImplementationOnce(throwError)

      const httpResponse = await sut.getAll()

      expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 200 on success', async () => {
      const { sut, loadCitysSpy } = makeSut()

      const httpResponse = await sut.getAll()

      expect(httpResponse).toEqual(ok(loadCitysSpy.citysModels))
    })
  })

  describe('update()', () => {
    test('Should call LoadCityById with correct values', async () => {
      const { sut, loadCityByIdSpy } = makeSut()

      await sut.update(mockFakeRequest)

      expect(loadCityByIdSpy.id).toBe(mockFakeRequest.params.cityId)
    })

    test('Should return 403 if LoadCityById returns null', async () => {
      const { sut, loadCityByIdSpy } = makeSut()

      loadCityByIdSpy.cityModel = null

      const httpResponse = await sut.update(mockFakeRequest)

      expect(httpResponse).toEqual(forbidden(invalidParamError('cityId')))
    })

    test('Should return 500 if LoadCityById throws', async () => {
      const { sut, loadCityByIdSpy } = makeSut()

      jest.spyOn(loadCityByIdSpy, 'loadById').mockImplementationOnce(throwError)

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

    test('Should call UpdateCity with correct values', async () => {
      const { sut, updateCitySpy } = makeSut()

      await sut.update(mockFakeRequest)

      expect(updateCitySpy.updateCityParams).toEqual({
        cityId: mockFakeRequest.params.cityId,
        ...mockFakeRequest.body
      })
    })

    test('Should return 500 if UpdateState throws', async () => {
      const { sut, updateCitySpy } = makeSut()

      jest.spyOn(updateCitySpy, 'update').mockImplementationOnce(throwError)

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
    test('Should call LoadCityById with correct values', async () => {
      const { sut, loadCityByIdSpy } = makeSut()

      await sut.delete(mockFakeRequest)

      expect(loadCityByIdSpy.id).toBe(mockFakeRequest.params.cityId)
    })

    test('Should return 403 if LoadCityById retuns null', async () => {
      const { sut, loadCityByIdSpy } = makeSut()

      loadCityByIdSpy.cityModel = null

      const httpResponse = await sut.delete(mockFakeRequest)

      expect(httpResponse).toEqual(forbidden(invalidParamError('stateId')))
    })

    test('Should return 500 if LoadCityById throws', async () => {
      const { sut, loadCityByIdSpy } = makeSut()

      jest.spyOn(loadCityByIdSpy, 'loadById').mockImplementationOnce(throwError)

      const httpResponse = await sut.delete(mockFakeRequest)

      expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should call DeleteCityById with correct values', async () => {
      const { sut, deleteCityByIdSpy } = makeSut()

      await sut.delete(mockFakeRequest)

      expect(deleteCityByIdSpy.id).toBe(mockFakeRequest.params.cityId)
    })

    test('Should return 500 if DeleteStateById throws', async () => {
      const { sut, deleteCityByIdSpy } = makeSut()

      jest
        .spyOn(deleteCityByIdSpy, 'deleteById')
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
