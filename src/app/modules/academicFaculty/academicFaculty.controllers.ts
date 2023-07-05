import { Request, Response } from 'express';
import catchasync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicFaculty } from './academicFaculty.interface';
import httpStatus from 'http-status';
import { AcademicFacultyService } from './academicFaculty.services';
import pick from '../../../shared/pick';
import { academicFacultyFilters } from './academicFaculty.constant';
import { paginationFields } from '../../../constant/pagination';

const createAcademicFaculty = catchasync(
  async (req: Request, res: Response) => {
    const { ...academicFacultyrData } = req.body;
    const result = await AcademicFacultyService.createAcademicFacultyToDb(
      academicFacultyrData
    );

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academic faculty created successfully!',
      data: result,
    });
    // next();
  }
);
const getAcademicFaculty = catchasync(async (req: Request, res: Response) => {
  const filter = pick(req.query, academicFacultyFilters);
  const pagination = pick(req.query, paginationFields);
  const result = await AcademicFacultyService.getAcademicFacultyFromDb(
    filter,
    pagination
  );

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic faculty retrieved successfully!',
    data: result.data,
    meta: result.meta,
  });
  // next();
});
const getSingleAcademicFaculty = catchasync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AcademicFacultyService.getSingleAcademicFacultyFromDb(
      id
    );

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'single academic faculty ',
      data: result,
    });
    // next();
  }
);
const updateAcademicFaculty = catchasync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    const result = await AcademicFacultyService.updateAcademicFacultyFromDb(
      id,
      updateData
    );

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academic faculty update successfully!',
      data: result,
    });
    // next();
  }
);
const deleteAcademicFaculty = catchasync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AcademicFacultyService.deleteAcademicFacultyFromDb(id);

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academic faculty delete successfully!',
      data: result,
    });
    // next();
  }
);
export const AcademicFacultyController = {
  createAcademicFaculty,
  getAcademicFaculty,
  getSingleAcademicFaculty,
  deleteAcademicFaculty,
  updateAcademicFaculty,
};
