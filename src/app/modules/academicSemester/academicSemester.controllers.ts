import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchasync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createAcademicSemister = catchasync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemesterToDb(
      academicSemesterData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academic semester created successfully!',
      data: result,
    });
    next();
  }
);

const getAcademicSemester = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await AcademicSemesterService.getSemesterFromDb();
    res.status(200).json({
      success: true,
      message: 'successfully!',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
export const AcademicSemesterControllers = {
  createAcademicSemister,
  getAcademicSemester,
};
