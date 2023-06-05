import { ErrorRequestHandler } from 'express'
import config from '../../config'
import { genericErrorMeaagae } from '../../interfaces/error'
import handleValidationError from '../../errors/handleValidationError'
import ApiError from '../../errors/ApiError'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500
  let message = 'Internal Server Error'
  let errorMessages: genericErrorMeaagae[] = []

  if (err?.name === 'ValidatorError') {
    const simplefiedError = handleValidationError(err)
    statusCode = simplefiedError.statusCode
    message = simplefiedError.message
    errorMessages = simplefiedError.errorMessages
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  } else if (err instanceof Error) {
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })
  next()
}
export default globalErrorHandler
