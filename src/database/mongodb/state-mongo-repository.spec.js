const { ObjectId } = require('mongodb')
const MongoHelper = require('./helpers/mongo-helper')
const stateMongoRepository = require('./state-mongo-repository')

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

const mockState = async () => {
  const stateData = await stateCollection.insertOne(mockAddStateParams())

  return MongoHelper.map(stateData.ops[0])
}

const mockUpdateStateParams = () => ({
  nome: 'new_nome',
  abreviacao: 'new_abreviacao'
})

const makeSut = () => stateMongoRepository()

describe('AccountMongoRepository', () => {
  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL))

  afterAll(async () => await MongoHelper.disconnect())

  beforeEach(async () => {
    stateCollection = await MongoHelper.getCollection('states')

    await stateCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should return an state on success', async () => {
      const sut = makeSut()

      const addStateParams = mockAddStateParams()

      const state = await sut.add(addStateParams)

      expect(state).toBeTruthy()
      expect(state.id).toBeTruthy()
      expect(state.nome).toBe(addStateParams.nome)
      expect(state.abreviacao).toBe(addStateParams.abreviacao)
      expect(state.data_de_criacao).toBe(addStateParams.data_de_criacao)
      expect(state.data_da_ultima_alteracao).toBe(
        addStateParams.data_da_ultima_alteracao
      )
    })
  })

  describe('load()', () => {
    test('Should return an list of states on success', async () => {
      const sut = makeSut()

      const addStateParams = mockAddStateParams()

      await mockState()

      const [state] = await sut.load()

      expect(state).toBeTruthy()
      expect(state.id).toBeTruthy()
      expect(state.nome).toBe(addStateParams.nome)
      expect(state.abreviacao).toBe(addStateParams.abreviacao)
      expect(state.data_de_criacao).toEqual(addStateParams.data_de_criacao)
      expect(state.data_da_ultima_alteracao).toEqual(
        addStateParams.data_da_ultima_alteracao
      )
    })
  })

  describe('loadById()', () => {
    test('Should return an state on success', async () => {
      const sut = makeSut()

      const addStateParams = mockAddStateParams()

      const { id } = await mockState()

      const state = await sut.loadById(id)

      expect(state).toBeTruthy()
      expect(state.id).toBeTruthy()
      expect(state.nome).toBe(addStateParams.nome)
      expect(state.abreviacao).toBe(addStateParams.abreviacao)
      expect(state.data_de_criacao).toEqual(addStateParams.data_de_criacao)
      expect(state.data_da_ultima_alteracao).toEqual(
        addStateParams.data_da_ultima_alteracao
      )
    })
  })

  describe('loadByName()', () => {
    test('Should return an state on success', async () => {
      const sut = makeSut()

      const addStateParams = mockAddStateParams()

      const { nome } = await mockState()

      const state = await sut.loadByName(nome)

      expect(state).toBeTruthy()
      expect(state.id).toBeTruthy()
      expect(state.nome).toBe(addStateParams.nome)
      expect(state.abreviacao).toBe(addStateParams.abreviacao)
      expect(state.data_de_criacao).toEqual(addStateParams.data_de_criacao)
      expect(state.data_da_ultima_alteracao).toEqual(
        addStateParams.data_da_ultima_alteracao
      )
    })
  })

  describe('update()', () => {
    test('Should update an state on success', async () => {
      const sut = makeSut()

      const { id } = await mockState()

      const updateStateParams = mockUpdateStateParams()

      await sut.update({ stateId: id, ...updateStateParams })

      const state = await stateCollection.findOne({ _id: new ObjectId(id) })

      expect(state).toBeTruthy()
      expect(state.nome).toBe(updateStateParams.nome)
      expect(state.abreviacao).toBe(updateStateParams.abreviacao)
    })
  })

  describe('delete()', () => {
    test('Should delete an state on success', async () => {
      const sut = makeSut()

      const { id } = await mockState()

      await sut.deleteById(id)

      const state = await stateCollection.findOne({
        _id: new ObjectId(id)
      })

      expect(state).toBeFalsy()
    })
  })
})
