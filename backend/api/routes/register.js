const express = require('express')
const router = express.Router()
const uuid = require('uuid/v4')
const db = require('../database/db.js')
const bcrypt = require('bcrypt')
const saltRounds = 10
const {
  StatusError,
  asyncWrapper,
  HOST, 
  } = require('../utils.js')
const mailer = require('../mailer')


const validateRegisterInput = input => {
  return /^[\w.]+@iths.se$/i.test(input.email)
    && /^[a-z]+$/i.test(input.firstname)
    && /^[a-z]+$/i.test(input.lastname)
    && /.{8,}/.test(input.password)
    && input.passwordconfirm === input.password
    && input.program
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
    program
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

  await conn.query('INSERT INTO register_confirm (userid, first_name, last_name, email, program, password, expires_on, registration_id) VALUES (?,?,?,?,?,?,?,?)',
    [uuid(), firstname, lastname, email, program, hash, expiresOn, registrationId])
  await conn.end()

  await mailer(
    'fortheloveofgood@gmail.com',
    'Bekräfta registrering',
    null, 
    `<b>Följ länken för att bekräfta din registrering: </b><a href="${HOST}/api/register/${registrationId}">${HOST}/api/register?id=${registrationId}</a></p>`
    )

  res.status(200)
  .json('OK')
}))

router.get('/', (req, res) => res.send('test'))

router.get('/:id', asyncWrapper(async (req, res) => {

  const registrationId = req.params.id
  
  if(!registrationId) {
    throw new StatusError(400, 'Bad input')
  }

  const conn = await db()

  const rows = await conn.query('SELECT * FROM register_confirm WHERE registration_id=?', [registrationId])

  if(rows.length === 0) {
    await conn.end()
    throw new StatusError(403, 'Invalid registration id')
  }

  const {
    userid,
    email,
    first_name,
    last_name,
    program,
    password,
    expires_on,
  } = rows[0]

  const now = new Date().getTime()

  if(expires_on <= now) {
    await conn.end()
    throw new StatusError(403, 'Expired registration id')
  }

  await conn.query('INSERT INTO users (userid, first_name, last_name, email, password, program) VALUES (?,?,?,?,?,?)',
    [userid, first_name, last_name, email, password, program])

  await conn.query('DELETE FROM register_confirm WHERE registration_id=?', [registrationId])

  await conn.end()
 
  const redirectLink = process.env.API_ENV === 'production' ? 'https://sebbe.dev/studentprojekt/login' : 'http://dev.sebbelocal.com/login'

  res.status(200)
  .send(`Registrering lyckades. Skickar vidare...<script>setTimeout(() => location.assign("${redirectLink}"), 2000)</script>`)

}))

module.exports = router