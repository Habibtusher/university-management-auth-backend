import mongoose from 'mongoose'
import { genericErrorMeaagae } from '../interfaces/error'
import { genericErrorResponse } from '../interfaces/common'

const handleValidationError = (
  err: mongoose.Error.ValidationError
): genericErrorResponse => {
  const errors: genericErrorMeaagae[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      }
    }
  )
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}
export default handleValidationError
