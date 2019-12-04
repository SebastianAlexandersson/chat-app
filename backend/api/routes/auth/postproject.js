const express = require('express')
const router = express.Router()
const db = require('../../database/db.js')
const uuid = require('uuid/v4')
const { asyncWrapper, StatusError } = require('../../utils.js')

router.post('/', asyncWrapper(async (req, res) => {

  const { headline, textBody, tags, userId } = req.body

  console.log(tags)

  if(!headline || !textBody || !tags || tags.length < 1) {
    throw new StatusError(400, 'Bad input')
  }

  let tagsString

  if(tags.length === 1) {
    tagsString = tags.join()
  } else {
    tagsString = tags.join(',')
  }

  const conn = await db()

  await conn.query(
    'INSERT INTO projects (headline, text_body, tags, project_id, author_id) VALUES (?,?,?,?,?)',
    [headline, textBody, tagsString, uuid(), userId]
    )

  await conn.end()

  res.status(200)
  .json('OK')

}))

module.exports = router