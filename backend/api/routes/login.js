const express = require('express')
const router = express.Router()
const db = require('../database/db.js')
const bcrypt = require('bcrypt')
const { StatusError, asyncWrapper } = require('../utils.js')

router.post('/', asyncWrapper(async (req, res) => {

  const { username, password } = req.body

  if(!username || !password) {
    throw new StatusError(400, 'Bad input')
  }

  const conn = await db()
  const rows = await conn.query('SELECT password from users WHERE email=?', [username])
  await conn.end()

  if(rows.length > 0) {
    await bcrypt.compare(password, rows[0].password, (err, match) => {
      if(err) {
        throw new StatusError(500, 'Server error')
      } else if(match) {
        res.status(200)
        .json('OK')
      } else {
        throw new StatusError(401, 'Invalid authentication')
      }
    })
  } else {
    throw new StatusError(401, 'Invalid authentication')
  }
}))

module.exports = router