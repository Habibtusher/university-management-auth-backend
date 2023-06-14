import { Request, Response } from 'express';
import catchasync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constant/pagination';
import { FacultyService } from './faculty.services';
import { facultyFilterableFields } from './faculty.const';
import sendResponse from '../../../shared/sendResponse';
import { IFaculty } from './faculty.interface';
import httpStatus from 'http-status';

const getFaculties = catchasync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields);

  const paginationOtp = pick(req.query, paginationFields);
  const result = await FacultyService.getFacutiesFromDb(filters, paginationOtp);

  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'students',
    data: result.data,
    meta: result.meta,
  });
});

export const FacultyControllers = {
  getFaculties,
};
