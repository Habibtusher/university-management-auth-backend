import { Request, Response } from 'express';
import catchasync from '../../../shared/catchAsync';
import { StudentServices } from './student.services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IStudent } from './student.interface';
import { paginationFields } from '../../../constant/pagination';
import pick from '../../../shared/pick';
import { studentFilterableFields } from './student.constant';

const getAllStudents = catchasync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);

  const paginationOtp = pick(req.query, paginationFields);
  const result = await StudentServices.getAllStudentsFromDb(
    filters,
    paginationOtp
  );

  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'students',
    data: result.data,
    meta: result.meta,
  });
});
const getAllStudentByID = catchasync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentServices.getAllStudentByIdFromDb(id);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'students',
    data: result,
  });
});
const deleteStudent = catchasync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await StudentServices.deleteStudentFromDb(id);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student delete successfully',
  });
});
const updateStudent = catchasync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const result = await StudentServices.updateStudentToDb(id, data);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student update successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getAllStudentByID,
  updateStudent,
  deleteStudent,
};
