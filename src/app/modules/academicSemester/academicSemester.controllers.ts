import { IAcademinsemester } from './academicSemester.interface';
import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchasync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constant/pagination';
import { academicSemesterFilterableFields } from './academicSemester.constant';

const createAcademicSemister = catchasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemesterToDb(
      academicSemesterData
    );

    sendResponse<IAcademinsemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academic semester created successfully!',
      data: result,
    });
    next();
  }
);

const getAcademicSemester = catchasync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemesterFilterableFields);

  const paginationOtp = pick(req.query, paginationFields);
  const result = await AcademicSemesterService.getSemesterFromDb(
    filters,
    paginationOtp
  );
  sendResponse<IAcademinsemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'success!',
    data: result.data,
    meta: result.meta,
  });
  // next();
});
const getSingleSemister = catchasync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicSemesterService.getSingleSenesterFromDb(id);
  sendResponse<IAcademinsemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'success!',
    data: result,
  });
});
const updateSemester = catchasync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await AcademicSemesterService.updateSemesterInDb(
    id,
    updatedData
  );
  sendResponse<IAcademinsemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester updated succesfully!',
    data: result,
  });
});
const deleteSemester = catchasync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AcademicSemesterService.deleteSemesterInDb(id);
  sendResponse<IAcademinsemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester deleted succesfully!',
    data: result,
  });
});
export const AcademicSemesterControllers = {
  createAcademicSemister,
  getAcademicSemester,
  getSingleSemister,
  updateSemester,
  deleteSemester,
};
