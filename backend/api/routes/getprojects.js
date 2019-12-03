const express = require('express')
const router = express.Router()
const db = require('../database/db.js')
const { StatusError, asyncWrapper } = require('../utils.js')

router.get('/', asyncWrapper(async (req, res) => {

  const conn = await db()
  const rows = await conn.query(
    'SELECT users.first_name, users.last_name, users.email, users.userid, users.program, '
    + 'projects.headline, projects.text_body, projects.created_on, projects.tags, projects.author_id, projects.project_id '
    + 'FROM users, projects WHERE users.userid = projects.author_id '
    + 'ORDER BY projects.created_on DESC'
  )

  await conn.end()

  res.status(200)
  .json(rows)

}))

module.exports = router