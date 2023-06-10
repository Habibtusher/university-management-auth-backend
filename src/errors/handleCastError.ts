import mongoose from 'mongoose';
import { genericErrorMeaagae } from '../interfaces/error';

export const handleCastError = (err: mongoose.Error.CastError) => {
  const errors: genericErrorMeaagae[] = [
    { path: err.path, message: 'Invalid Id' },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  };
};
