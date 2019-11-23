const express = require('express')
const app = express()
const passport = require('passport')
const cors = require('cors')
const helmet = require('helmet')
const PORT = 3333
const routes = require('./routes')
const { handleError } = require('./utils.js')

app.use(express.json())

app.use(cors())

app.use(helmet())

app.use(routes)

app.get('/', (req, res) => res.send('hello from api'))

app.get('/api/login', (req, res) => res.send('helloooooooooooooo'))

app.use((err, req, res, next) => {
  handleError(err, res)
})

app.listen(PORT, () => console.log('Api running on ' + PORT))