const express = require('express')
const router = express.Router()
const db = require('../database/db.js')
const { asyncWrapper, StatusError } = require('../utils.js')

router.get('/', asyncWrapper(async (req, res) =>  {

  const session_id = req.cookies.sessionid
  console.log(session_id)

  if (session_id) {
    console.log('sessionid:' + session_id)
    const conn = await db()
    await conn.query('DELETE FROM user_sessions WHERE session_id=?', [session_id])
    await conn.end()

    const maxAge = new Date(0)

    res.clearCookie('sessionid', { expires: maxAge , httpOnly: true, sameSite: 'none', secure: true, domain: null })
    res.status(200)
    .json('OK')
    
  } else {
    throw new StatusError(400, 'You are not logged in')
  }
}))

module.exports = router


