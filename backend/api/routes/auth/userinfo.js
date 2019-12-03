const express = require('express')
const router = express.Router()
const db = require('../../database/db.js')
const { asyncWrapper, StatusError } = require('../../utils.js')

router.get('/', asyncWrapper(async (req, res) =>  {

  const sessionId = req.cookies.sessionid

  const conn = await db()
  const rows = await conn.query('SELECT user_id FROM user_sessions WHERE session_id=?', [sessionId])

  if(rows.length > 0) {

    const user = await conn.query('SELECT first_name, last_name, email FROM users WHERE userid=?', [rows[0].user_id])
    await conn.end()
    const { first_name, last_name, email } = user[0]

    res.status(200)
    .json({ first_name, last_name, email, userid: rows[0].user_id })

  } else {
    await conn.end()
    throw new StatusError(401, 'Not authorized')
  }
}))

module.exports = router


