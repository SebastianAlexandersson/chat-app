const express = require('express')
const router = express.Router()
const db = require('../database/db.js')
const bcrypt = require('bcrypt')
const { StatusError, asyncWrapper } = require('../utils.js')
const crypto = require('crypto')

const secret = () => crypto.randomBytes(20).toString('hex')
 
router.post('/', asyncWrapper(async (req, res) => {

  if(req.cookies.sessionid) {
    throw new StatusError(400, 'You are already logged in!')
  }

  const { username, password } = req.body

  if(!username || !password) {
    throw new StatusError(400, 'Bad input')
  }

  const conn = await db()
  const rows = await conn.query('SELECT password, userid from users WHERE email=?', [username])

  if(rows.length > 0) {
    await bcrypt.compare(password, rows[0].password, (err, match) => {
      if(err) {
        throw new StatusError(500, 'Server error')
      } else if(match) {
        return
      } else {
        throw new StatusError(401, 'Invalid authentication')
      }
    })

    const session_id = secret()

    await conn.query('INSERT INTO user_sessions (user_id, session_id) VALUES (?,?)', [rows[0].userid, session_id])

    const user = await conn.query('SELECT first_name, last_name, email FROM users WHERE userid=?', [rows[0].userid])
    const { first_name, last_name, email } = user[0]

    const maxAge = new Date(Date.now() + 99999999999)

    res.cookie('sessionid', session_id, { expires: maxAge , httpOnly: true, sameSite: 'none', secure: true, domain: null })
    res.status(200)
    .json({ first_name, last_name, email })
  } else {
    throw new StatusError(401, 'Invalid authentication')
  }
}))

module.exports = router