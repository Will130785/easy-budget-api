const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')

module.exports = async (app) => {
  // Set cors
  app.use(cors())
  // Configure body parser
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  // Connect and configure passport
  app.use(passport.initialize())
  require('./passport')(passport)
  // Set routes
  app.use('/', require('../routes'))
}
