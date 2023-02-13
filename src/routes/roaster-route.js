const express = require('express')

const roasterController = require('../controllers/roaster-controller');

const router = express.Router()

router.get('/roasters', roasterController.getAllRoaster)

module.exports = router