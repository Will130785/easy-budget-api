const { PORT, NODE_ENV } = process.env

module.exports = async (app) => {
  // Only start the server if not in test mode
  if (NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  }
}
