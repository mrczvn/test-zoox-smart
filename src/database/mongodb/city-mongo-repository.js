const { ObjectId } = require('mongodb')
const MongoHelper = require('./helpers/mongo-helper')

const cityMongoRepository = () => ({
  async add({ stateId, ...rest }) {
    const cityCollection = await MongoHelper.getCollection('citys')

    const city = await cityCollection.insertOne({
      ...rest,
      state_id: new ObjectId(stateId)
    })

    return MongoHelper.map(city.ops[0])
  },

  async load() {
    const cityCollection = await MongoHelper.getCollection('citys')

    const citys = await cityCollection.find().toArray()

    return citys.length ? citys.map((city) => MongoHelper.map(city)) : null
  },

  async loadById(cityId) {
    const cityCollection = await MongoHelper.getCollection('citys')

    const city = await cityCollection.findOne({ _id: new ObjectId(cityId) })

    return city ? MongoHelper.map(city) : city
  },

  async loadByName(name) {
    const cityCollection = await MongoHelper.getCollection('citys')

    const city = await cityCollection.findOne({ nome: name })

    return city ? MongoHelper.map(city) : city
  },

  async update({ cityId, nome }) {
    const cityCollection = await MongoHelper.getCollection('citys')

    const atThisMoment = new Date()

    await cityCollection.updateOne(
      {
        _id: cityId
      },
      {
        $set: {
          nome,
          data_da_ultima_alteracao: atThisMoment
        }
      }
    )
  },

  async deleteById(cityId) {
    const cityCollection = await MongoHelper.getCollection('citys')

    await cityCollection.deleteOne({ _id: new ObjectId(cityId) })
  }
})

module.exports = cityMongoRepository
