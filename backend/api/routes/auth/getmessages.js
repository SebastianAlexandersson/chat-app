const express = require('express')
const router = express.Router()
const db = require('../../database/db.js')
const { asyncWrapper, StatusError } = require('../../utils.js')

router.get('/', asyncWrapper(async (req, res) => {

  const sessionId = req.cookies.sessionid

  const conn = await db()
  const user = await conn.query('SELECT user_id FROM user_sessions WHERE session_id=?', [sessionId])
  const messages = await conn.query(
    'SELECT messages.message_body, messages.from_user, messages.date_sent, users.first_name, users.last_name, users.email '
    + 'FROM messages, users WHERE messages.to_user=? AND messages.from_user = users.userid', 
    [user[0].user_id])


  const from_user = await conn.query('SELECT first_name, last_name, email FROM users WHERE userid =?', [user[0].user_id])

  const sendername = from_user[0].first_name + ' ' + from_user[0].last_name

  await conn.end()
  if(messages.length === 0) {
    await conn.end()
    throw new StatusError(400, 'No messages')
  }

  res.status(200)
  .json(messages)
  
}))

module.exports = router