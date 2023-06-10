import { genericErrorMeaagae } from './error';
export type genericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: genericErrorMeaagae[];
};
export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
