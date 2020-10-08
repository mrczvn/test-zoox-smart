const MongoHelper = require('../database/mongodb/helpers/mongo-helper')
const app = require('./app')

MongoHelper.connect(
  'mongodb+srv://test_sky:test_sky@cluster0.rnk3s.mongodb.net/Cluste0?retryWrites=true&w=majority'
)
  .then(async () => {
    app.listen(3000, () => console.log('api is running'))
  })
  .catch(console.error)
