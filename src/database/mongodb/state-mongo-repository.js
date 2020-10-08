const { ObjectId } = require('mongodb')
const MongoHelper = require('./helpers/mongo-helper')

const stateMongoRepository = () => ({
  async add(data) {
    const stateCollection = await MongoHelper.getCollection('states')

    const state = await stateCollection.insertOne(data)

    return MongoHelper.map(state.ops[0])
  },

  async load() {
    const stateCollection = await MongoHelper.getCollection('states')

    const states = await stateCollection.find().toArray()

    return states.map((state) => MongoHelper.map(state))
  },

  async loadById(stateId) {
    const stateCollection = await MongoHelper.getCollection('states')

    const state = await stateCollection.findOne({ _id: new ObjectId(stateId) })

    return state ? MongoHelper.map(state) : state
  },

  async loadByName(name) {
    const stateCollection = await MongoHelper.getCollection('states')

    const state = await stateCollection.findOne({ nome: name })

    return state ? MongoHelper.map(state) : state
  },

  async update({ stateId, nome, abreviacao }) {
    const stateCollection = await MongoHelper.getCollection('states')

    const atThisMoment = new Date()

    await stateCollection.updateOne(
      {
        _id: stateId
      },
      {
        $set: {
          nome,
          abreviacao,
          data_da_ultima_alteracao: atThisMoment
        }
      }
    )
  },

  async deleteById(stateId) {
    const stateCollection = await MongoHelper.getCollection('states')

    await stateCollection.deleteOne({ _id: new ObjectId(stateId) })
  }
})

module.exports = stateMongoRepository
