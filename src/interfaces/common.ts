import { genericErrorMeaagae } from './error';
export type genericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: genericErrorMeaagae[];
};
