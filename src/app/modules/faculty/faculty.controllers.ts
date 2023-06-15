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
    message: 'faculty retrieved successfully!',
    data: result.data,
    meta: result.meta,
  });
});
const getSingleFaculty = catchasync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FacultyService.getSingleFacultyFromDb(id);
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty retrieved successfully!',
    data: result,
  });
});
const updateFaculty = catchasync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await FacultyService.updateFacultyDb(id, data);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student update successfully',
    data: result,
  });
});
const deleteFaculty = catchasync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FacultyService.deleteFacultyFromDb(id);
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty deleted successfully!',
    data: result,
  });
});
export const FacultyControllers = {
  getFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};
