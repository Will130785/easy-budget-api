const mongoose = require('mongoose')

module.exports = async (connect) => {
  try {
    const conn = await mongoose.createConnection(connect, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    conn.on('connected', () => {
      console.log('Connected to database')
    })
    conn.on('error', () => {
      console.log('There was an error connecting to MongoDB')
    }) 
  } catch (err) {
    console.log('There was an error connecting to MongoDB')
  }
}