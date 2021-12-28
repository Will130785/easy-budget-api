const cors = require('cors')

module.exports = async (app) => {
  app.use(cors())
  app.use('/', require('../routes'))
}
