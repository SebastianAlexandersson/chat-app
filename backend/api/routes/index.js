const express = require('express')
const router = express.Router()
const register = require('./register')
const login = require('./login')
const auth = require('./auth')
const verify = require('./auth/verify')
const getprojects = require('./getprojects.js')

router.use('/register', register)
router.use('/login', login)
router.use('/auth', verify)
router.use('/auth', auth)
router.use('/getprojects', getprojects)

module.exports = router