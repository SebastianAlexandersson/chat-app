const express = require('express')
const router = express.Router()
const db = require('../../database/db.js')
const { asyncWrapper, StatusError } = require('../../utils.js')

router.get('/', asyncWrapper(async (req, res) =>  {

  const session_id = req.cookies.sessionid

  const conn = await db()
  await conn.query('DELETE FROM user_sessions WHERE session_id=?', [session_id])
  await conn.end()

  const maxAge = new Date(0)

  const cookieSettings = process.env.API_ENV === 'production' ?
  { expires: maxAge , httpOnly: true, sameSite: 'none', secure: true, domain: null }
  :
  { expires: maxAge , httpOnly: true, domain: null }

  res.clearCookie('sessionid', cookieSettings)
  res.status(200)
  .json('OK')

}))

module.exports = router


