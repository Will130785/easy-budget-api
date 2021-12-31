const mongoose = require('mongoose')

const newUserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  password: String,
  passwordConfirm: String,
  account: {
    totalAmount: Number,
    allocation: [
      { name: String, amount: Number }
    ]
  }
})

module.exports = new mongoose.model('User', newUserSchema)
