const express = require('express')
const router = express.Router()
const register = require('./register')
const login = require('./login')
const auth = require('./auth')
const logout = require('./logout')

router.use('/api/register', register)
router.use('/api/login', login)
router.use('/api/auth', auth)
router.use('/api/logout', logout)

module.exports = router