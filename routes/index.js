const router = require('express').Router()
const ctrl = require('../controllers')

// Test route
router.get('/test', ctrl.testController.testController)

// Routes
router.post('/register', ctrl.userController.registerUser)

module.exports = router
