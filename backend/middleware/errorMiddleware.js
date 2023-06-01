// common approach to handling errors in an Express application.The notFound middleware handles 404 errors for routes that are not defined, while the errorHandler middleware handles other types of errors and provides appropriate responses based on the error type.
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error) //indicates that the error should be handled by the next error handling middleware
}

//handling errors that occur during the request processing.
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode //200: OK, 500: internal server error (error during request)
  let message = err.message
  //checks if the error has a specific name (CastError) and a specific kind (ObjectId). This condition is typically used to handle errors related to object ID casting in MongoDB or Mongoose.
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    //CastError can occur if the data you are trying to work with cannot be converted to the expected type.
    statusCode = 404
    message = 'Resource not found'
  }

  res.status(statusCode).json({
    message,
    //stack trace to see if its in development and not show sensitive info in production mode. Helpful as it shows file and line numbers. sends Json response to client
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

export { notFound, errorHandler }
//called in the server.
