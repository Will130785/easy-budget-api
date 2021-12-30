const express = require('express')
const app = express()
const request = require('supertest')
app.use('/', require('../../routes'))

describe('Budget api integrational tests', () => {
  // Test route
  it('Hits the test route', async () => {
    const res = await request(app).get('/test')
    expect(res.statusCode).toEqual(200)
  })

  // Register user route
  it('Hits and posts data to the register user route', async () => {
    const res = await request(app).post('/register')
    expect(res.statusCode).toEqual(200)
  })
})
