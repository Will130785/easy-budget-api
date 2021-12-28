const router = require('express').Router()
const ctrl = require('../controllers')

router.get('/test', ctrl.testController.testController)

module.exports = router
