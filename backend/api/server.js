const express = require('express')
const app = express()
const passport = require('passport')
const cors = require('cors')
const helmet = require('helmet')
const PORT = 3333
const pool = require('./db/db.js')

app.use(express.json())

app.use(cors())

app.use(helmet())

app.get('/', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM test');
    res.send(rows)
  } catch (err) {
    console.log(err)
	  res.status(500)
    res.send('error')
  } finally {
	  if (conn) return conn.end();
  }
})

app.post('/register', async (req, res) => {
  res.send('success')
  console.log(req.body)
})

app.get('/test', (req, res) => res.send('working'))

app.listen(PORT, () => console.log('Api running on ' + PORT))