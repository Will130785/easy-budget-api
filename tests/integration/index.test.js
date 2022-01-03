require('dotenv').config({
  path: '.test.env'
})
const express = require('express')
const { Mongoose } = require('mongoose')
const app = express()
const request = require('supertest')
const mongoose = require('mongoose')
// app.use('/', require('../../routes'))
require('../../app')(app)

describe('Budget api integrational tests', () => {
  // Test route
  it('Hits the test route', async () => {
    const res = await request(app).get('/test')
    expect(res.statusCode).toEqual(200)
  })

  // Register user route
  it('Creates new user', async () => {
    const res = await request(app).post('/register')
    .send({
      firstName: 'Will',
      lastName: 'Constable',
      email: 'will_constable@msn.com',
      username: 'will_constable',
      password: 'test',
      passwordConfirm: 'test'
    })
    expect(res.statusCode).toEqual(201)
  })

  // Passwords do not match
  it('Tries to create new user without matching passwords', async () => {
    const res = await request(app).post('/register')
    .send({
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@smith.com',
      username: 'john_smith',
      password: 'test',
      passwordConfirm: 'Tesfdfd'
    })
    expect(res.statusCode).toEqual(400)
  })

  // User already taken
  it('Tries to create a user with a taken username', async () => {
    const res = await request(app).post('/register')
    .send({
      firstName: 'Will',
      lastName: 'Constable',
      email: 'will_constable@msn.com',
      username: 'will_constable',
      password: 'test',
      passwordConfirm: 'test'
    })
    expect(res.statusCode).toEqual(400)
  })

  // Login user
  it('Attempts to log in the user', async () => {
    const res = await request(app).post('/login')
    .send({
      username: 'will_constable',
      password: 'test'
    })
    expect(res.statusCode).toEqual(200)
  })

  // Username not found
  it('Attempts to log in with a non existant username', async () => {
    const res = await request(app).post('/login')
    .send({
      username: 'test_test',
      password: 'test'
    })
    expect(res.statusCode).toEqual(404)
  })

  // Wrong password
  it('Attempts to log in with incorrect password', async () => {
    const res = await request(app).post('/login')
    .send({
      username: 'will_constable',
      password: 'wrong password'
    })
    expect(res.statusCode).toEqual(404)
  })
})

afterAll(async () => {
  await mongoose.connection.db.dropDatabase()
  await mongoose.disconnect()
})
