const bodyParser = require('./body-parser')
const contentType = require('./content-type')
const cors = require('./cors')

module.exports = (app) => {
  app.use(bodyParser)
  app.use(contentType)
  app.use(cors)
}
