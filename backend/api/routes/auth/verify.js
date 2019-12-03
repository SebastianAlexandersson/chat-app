const db = require('../../database/db.js')
const { asyncWrapper, StatusError } = require('../../utils')

const verify = async (req, res, next) => {

  try {

    const sessionId = req.cookies.sessionid

    if(!sessionId) {
      throw new StatusError(401, 'Please login')
    }

    const conn = await db()
    const rows = conn.query('SELECT * FROM user_sessions WHERE session_id=?', [sessionId])
    await conn.end()

    if(rows.length === 0) {
      throw new StatusError(401, 'Invalid session')
    }

    console.log('user verified')

    next()
  } catch(error) {
    next(error)
  }
  
}

module.exports = verify


