const { PORT, NODE_ENV } = process.env

module.exports = async (app) => {
  // If not test start server
  if (NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  }
}
