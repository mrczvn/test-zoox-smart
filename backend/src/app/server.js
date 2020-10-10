const app = require('./app')
const config = require('./config')
const MongoHelper = require('../database/mongodb/helpers/mongo-helper')

MongoHelper.connect(config.MONGO_URL)
  .then(async () => {
    app.listen(config.API_URL, () =>
      console.log(`Server running at http://localhost:${config.API_URL}`)
    )
  })
  .catch(console.error)
