const express = require('express')
const app = express()
const request = require('supertest')
app.use('/', require('../../routes'))

describe('Budget api integrational tests', () => {
  it('Hits the test route', async () => {
    const res = await request(app).get('/test')
    expect(res.statusCode).toEqual(200)
  })
})
