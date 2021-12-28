const { PORT } = process.env

module.exports = async (app) => {
  // Start server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}
