const serverConfig = require('./serverConfig')
const dbConnect = require('./dbConnect')
const serverStart = require('./serverStart')
const { DB_CONNECT } = process.env

module.exports = async (app) => {
  serverConfig(app)
  dbConnect(DB_CONNECT)
  serverStart(app)
}
