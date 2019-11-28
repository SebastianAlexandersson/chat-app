const express = require('express')
const router = express.Router()
const db = require('../database/db.js')
const { asyncWrapper, StatusError } = require('../utils.js')

router.get('/', asyncWrapper(async (req, res) =>  {

  const session_id = req.cookies.sessionid

  if (session_id) {
    const conn = await db()
    await conn.query('DELETE FROM user_sessions WHERE session_id=?', [session_id])
    await conn.end()

    const maxAge = new Date(0)

    res.status(200)
    .cookie('sessionid', '', { expires: maxAge })
    .json('OK')
    
  } else {
    throw new StatusError(400, 'You are not logged in')
  }
}))

module.exports = router


