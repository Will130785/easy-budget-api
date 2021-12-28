const mongoose = require('mongoose')

const newUserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  password: String
})

module.exports = new mongoose.model('User', newUserSchema)
