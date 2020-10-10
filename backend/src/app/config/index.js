require('dotenv').config()

module.exports = {
  MONGO_URL: process.env.MONGO_URL_DEV,
  API_URL: process.env.API_URL || 3000
}
