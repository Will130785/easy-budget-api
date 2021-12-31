const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const key = require('../app/keys').secret

// Register user
module.exports.registerUser = async (req, res) => {
  // Get data from req
  const data = await req.body
  try {
    if (data.password !== data.passwordConfirm) {
      return res.status(400).json({
        msg: 'Passwords do not match'
      })
    } else {
      User.findOne({ username: data.username })
        .then(user => {
          if (user) {
            return res.status(400).json({
              msg: 'Username is already taken'
            })
          }
          else {
            // Data is valid and we can register user
            // remove confirm password
            delete data.passwordConfirm
            const newUser = new User(data)
            // Hash password
            try {
              bcrypt.genSalt(10, (err, salt) => {
                if (!err) {
                  bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (!err) {
                      newUser.password = hash
                      newUser.save().then(user => {
                        return res.status(201).json({
                          success: true,
                          msg: 'User is now registered'
                        })
                      })
                    } else {
                      throw err
                    }
                  })
                }
              })
            } catch (err) {
              console.log('There was an error hashing the password')
            }
          }
        })
    }
  } catch (err) {
    console.log('There was an error registering the user')
  }
}