import { Request, Response } from 'express';
import catchasync from '../../../shared/catchAsync';
import { AcademicDepartmentService } from './academicDepartment.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IAcademicDepartment } from './academicDepartment.interface';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constant/pagination';
import { academicDepartmentFilters } from './academicDepartment.constant';

const createDepartment = catchasync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await AcademicDepartmentService.createDepartmentToDb(data);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department created successfully!',
    data: result,
  });
});
const getDepartment = catchasync(async (req: Request, res: Response) => {
  const pagination = pick(req.query, paginationFields);
  const filterData = pick(req.query, academicDepartmentFilters);
  const result = await AcademicDepartmentService.getDepartmentFromDb(
    pagination,
    filterData
  );

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department retrived successfully!',
    data: result,
  });
});
const deleteDepartment = catchasync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.deleteDepartmentFromDb(id);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department deleted successfully!',
    data: result,
  });
});
const updateDepartment = catchasync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await AcademicDepartmentService.updaterDepartmentInDb(
    id,
    updatedData
  );

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department updated successfully!',
    data: result,
  });
});
const singleDepartment = catchasync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.getSingleDepartment(id);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department updated successfully!',
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createDepartment,
  getDepartment,
  deleteDepartment,
  updateDepartment,
  singleDepartment,
};
