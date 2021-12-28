const express = require('express')
const app = express()
const { NODE_ENV } = process.env

// Set env file
const dotEnvPath = NODE_ENV === 'production' ? '.env' : `.${NODE_ENV}.env`

require('dotenv').config({
  path: dotEnvPath
})

require('./app')(app)
