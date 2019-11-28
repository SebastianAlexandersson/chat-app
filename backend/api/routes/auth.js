const express = require('express')
const router = express.Router()
const db = require('../database/db.js')
const { asyncWrapper, StatusError } = require('../utils.js')

router.get('/', asyncWrapper(async (req, res) =>  {

  const cookie = req.cookies

  if (cookie) {

    const sessionId = req.cookies.sessionid

    const conn = await db()
    const rows = await conn.query('SELECT * from user_sessions WHERE session_id=?', [sessionId])

    if(rows.length > 0) {
      const user = await conn.query('SELECT first_name, last_name, email FROM users WHERE userid=?', [rows[0].userid])
      await conn.end()
      const { first_name, last_name, email } = user[0]

      res.status(200)
      .json({ first_name, last_name, email })
    } else {
      throw new StatusError(401, 'Not authorized.')
    }
  } else {
    throw new StatusError(401, 'Not authorized.')
  }
}))

module.exports = router


