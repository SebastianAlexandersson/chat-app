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

  const expiresOn = new Date().getTime() + 86400000

  const registrationId = uuid()

  await conn.query('INSERT INTO register_confirm (userid, first_name, last_name, email, password, expires_on, registration_id) VALUES (?,?,?,?,?,?,?)',
    [uuid(), firstname, lastname, email, hash, expiresOn, registrationId])
  await conn.end()

  await mailer(
    'fortheloveofgood@gmail.com',
    'Bekräfta registrering',
    null, 
    `<b>Följ länken för att bekräfta din registrering: </b><a href="https://sebbe.dev/studentprojekt/register?id=${registrationId}">https://sebbe.dev/studentprojekt/register?id=${registrationId}</a></p>`
    )

  res.status(200)
  .json('OK')
}))

module.exports = router