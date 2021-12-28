const serverConfig = require('./serverConfig')
const serverStart = require('./serverStart')

module.exports = async (app) => {
  serverConfig(app)
  serverStart(app)
}
