import { Request, Response } from 'express';
import catchasync from '../../../shared/catchAsync';

const getFaculties = catchasync(async (req: Request, res: Response) => {
  // eslint-disable-next-line no-console
  console.log('object');
});

export const FacultyControllers = {
  getFaculties,
};
