const express = require('express')
const router = express.Router()
const db = require('../../database/db.js')
const uuid = require('uuid/v4')
const { asyncWrapper, StatusError } = require('../../utils.js')

router.post('/', asyncWrapper(async (req, res) => {

  const { message, from, to } = req.body

  console.log(req.body)

  if(!message || !from || !to) {
    throw new StatusError(400, 'Bad input')
  }

  const conn = await db()
  await conn.query('INSERT INTO messages (message_body, from_user, to_user) VALUES (?,?,?)', [message, from, to])
  await conn.end()

  res.status(200)
  .json('OK')

}))

module.exports = router