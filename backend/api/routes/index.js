const express = require('express')
const router = express.Router()
const register = require('./register')
const login = require('./login')

router.use('/api/register', register)
router.use('/api/login', login)

module.exports = router