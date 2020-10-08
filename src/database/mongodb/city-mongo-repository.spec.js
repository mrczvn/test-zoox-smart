const { ObjectId } = require('mongodb')
const MongoHelper = require('./helpers/mongo-helper')
const cityMongoRepository = require('./city-mongo-repository')

let cityCollection
let stateCollection

const mockAddStateParams = (
  creationDate = new Date('2020-09-29 12:00'),
  dataUpdate = new Date('2020-09-29 12:00')
) => ({
  nome: 'any_nome',
  abreviacao: 'any_abreviação',
  data_de_criacao: creationDate,
  data_da_ultima_alteracao: dataUpdate
})

const mockAddCityParams = (
  stateId = 'any_stateId',
  creationDate = new Date('2020-09-29 12:00'),
  dataUpdate = new Date('2020-09-29 12:00')
) => ({
  nome: 'any_nome',
  stateId,
  data_de_criacao: creationDate,
  data_da_ultima_alteracao: dataUpdate
})

const mockCity = async (idState) => {
  const { stateId, ...rest } = mockAddCityParams()

  const cityData = await cityCollection.insertOne({
    state_id: new ObjectId(idState),
    ...rest
  })

  return MongoHelper.map(cityData.ops[0])
}

const mockState = async () => {
  const stateData = await stateCollection.insertOne(mockAddStateParams())

  return MongoHelper.map(stateData.ops[0])
}

const mockUpdateCityParams = () => ({ nome: 'new_nome' })

const makeSut = () => cityMongoRepository()

describe('CityMongoRepository', () => {
  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL))

  afterAll(async () => await MongoHelper.disconnect())

  beforeEach(async () => {
    cityCollection = await MongoHelper.getCollection('citys')
    await cityCollection.deleteMany({})

    stateCollection = await MongoHelper.getCollection('states')
    await stateCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should return an city on success', async () => {
      const sut = makeSut()

      const state = await mockState()

      const city = await sut.add(mockAddCityParams(state.id))

      const count = await cityCollection.countDocuments()

      expect(count).toBe(1)
      expect(city.state_id).toEqual(state.id)
    })
  })

  describe('load()', () => {
    test('Should return an list of citys on success', async () => {
      const sut = makeSut()

      const state = await mockState()

      await mockCity(state.id)

      const [city] = await sut.load()

      expect(city).toBeTruthy()
      expect(city.state_id).toEqual(state.id)
    })
  })

  describe('loadById()', () => {
    test('Should return an city on success', async () => {
      const sut = makeSut()

      const state = await mockState()

      const { id } = await mockCity(state.id)

      const city = await sut.loadById(id)

      expect(city).toBeTruthy()
      expect(city.id).toEqual(id)
    })
  })

  describe('loadByName()', () => {
    test('Should return an city on success', async () => {
      const sut = makeSut()

      const state = await mockState()

      const { id, nome } = await mockCity(state.id)

      const city = await sut.loadByName(nome)

      expect(city).toBeTruthy()
      expect(city.id).toEqual(id)
      expect(city.nome).toBe(nome)
    })
  })

  describe('update()', () => {
    test('Should update an city on success', async () => {
      const sut = makeSut()

      const state = await mockState()

      const { id } = await mockCity(state.id)

      const updateCityParams = mockUpdateCityParams()

      await sut.update({ cityId: id, ...updateCityParams })

      const city = await cityCollection.findOne({ _id: new ObjectId(id) })

      expect(city).toBeTruthy()
      expect(city.nome).toBe(updateCityParams.nome)
    })
  })

  describe('delete()', () => {
    test('Should delete an city on success', async () => {
      const sut = makeSut()

      const state = await mockState()

      const { id } = await mockCity(state.id)

      await sut.deleteById(id)

      const city = await stateCollection.findOne({
        _id: new ObjectId(id)
      })

      expect(city).toBeFalsy()
    })
  })
})
