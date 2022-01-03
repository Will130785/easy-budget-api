const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const key = require('../app/keys').secret

// Register user
module.exports.registerUser = async (req, res) => {
  // Get data from req
  const data = req.body
  try {
    if (data.password !== data.passwordConfirm) {
      return res.status(400).json({
        msg: 'Passwords do not match'
      })
    } else {
      const user = await User.findOne({ username: data.username })
      if (user) {
        return res.status(400).json({
          msg: 'Username is already taken'
        })
      } else {
        // Data is valid and we can register user
        // remove confirm password
        delete data.passwordConfirm
        const newUser = new User(data)
        // Hash password
        try {
          bcrypt.genSalt(10, (err, salt) => {
            if (!err) {
              bcrypt.hash(newUser.password, salt, async (err, hash) => {
                if (!err) {
                  newUser.password = hash
                  const user = await newUser.save()
                  if (user) {
                    return res.status(201).json({
                      success: true,
                      msg: 'User is now registered'
                    })
                  }
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
    }
  } catch (err) {
    console.log('There was an error registering the user')
  }
}

// Login
module.exports.loginUser = async (req, res) => {
  // Get data from request
  const data = req.body
  try {
    const user = await User.findOne({ username: data.username })
    if (!user) {
      return res.status(404).json({
        msg: 'Username not found',
        success: false
      })
    } else {
      // If there is a user we will compare the password
      const isMatch = await bcrypt.compare(data.password, user.password)
      if (isMatch) {
        // Users password is correct ant we send the web token
        const payload = {
          _id: user._id,
          username: user.username
        }
        jwt.sign(payload, key, {
          expiresIn: 604800
        }, (err, token) => {
          if (!err) {
            res.status(200).json({
              success: true,
              user: user,
              token: `Bearer ${token}`,
              msg: 'You are now logged in'
            })
          } else {
            console.log(err)
          }
        })
      } else {
        console.log('Incorrect password')
        return res.status(404).json({
          success: false,
          msg: 'Incorrect password'
        })
      }
    }
  } catch (err) {
    console.log('There was an error logging user in')
  }
}
