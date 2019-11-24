const express = require('express')
const router = express.Router()
const uuid = require('uuid/v4')
const db = require('../database/db.js')
const bcrypt = require('bcrypt')
const saltRounds = 10
const { StatusError, asyncWrapper } = require('../utils.js')
const mailer = require('../mailer')

const validateRegisterInput = input => {
  return /^\w+@iths.se$/i.test(input.email)
    && /^[a-z]+$/i.test(input.firstname)
    && /^[a-z]+$/i.test(input.lastname)
    && /^([a-zA-Z0-9@*#]{8,15})$/.test(input.password)
    && input.passwordconfirm === input.password
}

router.post('/', asyncWrapper(async (req, res) => {

  const validate = validateRegisterInput(req.body)

  if(!validate) {
    throw new StatusError(400, 'Bad input')
  }

  const {
    email,
    firstname,
    lastname,
    password,
  } = req.body

  const conn = await db()
  const rows = await conn.query('SELECT * FROM users WHERE email=?', [email])

  if(rows.length > 0) {
    await conn.end()
    throw new StatusError(401, 'Invalid email')
  }

  const hash = await bcrypt.hash(password, saltRounds)

  await conn.query('INSERT INTO users (userid, first_name, last_name, email, password) VALUES (?,?,?,?,?)',
    [uuid(), firstname, lastname, email, hash])
  await conn.end()

  res.status(200)
  .json('OK')
}))

module.exports = router