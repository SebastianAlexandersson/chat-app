const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const PORT = 3333
const routes = require('./routes')
const { handleError } = require('./utils.js')
const cookieParser = require('cookie-parser')

app.use(cors())

app.use(express.json())

app.use(helmet())

app.use(cookieParser())

app.use(routes)

app.use((err, req, res, next) => {
  handleError(err, res)
})

app.listen(PORT, () => console.log('Api running on ' + PORT))