const express = require('express')
const router = express.Router()
const logout = require('./logout')
const userinfo = require('./userinfo')
const postproject = require('./postproject')
const sendmessage = require('./sendmessage')
const getmessages = require('./getmessages')

router.use('/logout', logout)
router.use('/userinfo', userinfo)
router.use('/postproject', postproject)
router.use('/sendmessage', sendmessage)
router.use('/getmessages', getmessages)

module.exports = router