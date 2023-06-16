/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { genericErrorMeaagae } from '../../interfaces/error';
import handleValidationError from '../../errors/handleValidationError';
import ApiError from '../../errors/ApiError';
import { errrorLogger } from '../../shared/logger';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';
import { handleCastError } from '../../errors/handleCastError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  config.env === 'development'
    ? console.log('global error handler', err)
    : console.log('global error handler', err);

  let statusCode = 500;
  let message = 'Internal Server Error';
  let errorMessages: genericErrorMeaagae[] = [];

  if (err?.name === 'ValidatorError') {
    const simplefiedError = handleValidationError(err);
    statusCode = simplefiedError.statusCode;
    message = simplefiedError.message;
    errorMessages = simplefiedError.errorMessages;
  } else if (err instanceof ZodError) {
    const simplefiedError = handleZodError(err);
    statusCode = simplefiedError.statusCode;
    message = simplefiedError.message;
    errorMessages = simplefiedError.errorMessages;
  } else if (err?.name === 'CastError') {
    const simplefiedError = handleCastError(err);
    statusCode = simplefiedError.statusCode;
    message = simplefiedError.message;
    errorMessages = simplefiedError.errorMessages;
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  });
  // next();
};
export default globalErrorHandler;
