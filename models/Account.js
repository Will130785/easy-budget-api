const mongoose = require('mongoose')

const newAccountSchema = new mongoose.Schema({
  totalAmount: Number,
  allocation: [
    { name: String, amount: Number }
  ]
})