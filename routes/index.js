const router = require('express').Router()
const ctrl = require('../controllers')

// Test route
router.get('/test', ctrl.testController.testController)

// Routes
router.post('/register', ctrl.authController.registerUser)

module.exports = router
