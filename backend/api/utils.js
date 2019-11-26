class StatusError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const { message } = err;
  const statusCode = err.statusCode || 500
  console.log(message)
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message
  })
}

const asyncWrapper = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next)
  }

const HOST = process.env.HOST

module.exports = {
  StatusError,
  handleError,
  asyncWrapper,
  HOST,
}

