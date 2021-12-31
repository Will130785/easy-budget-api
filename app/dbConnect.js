const mongoose = require('mongoose')

module.exports = async (connect) => {
  try {
    mongoose.connect(connect, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    // Check database connection
    const db = mongoose.connection
    db.on('error', () => {
      console.log('Connection Error')
    })
    db.once('open', () => {
      console.log('Connected to database')
    })
  } catch (err) {
    console.log('There was an error connecting to MongoDB')
  }
}