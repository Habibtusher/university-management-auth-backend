import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import catchasync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser } from './user.interface';

const createStudent: RequestHandler = catchasync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body;
    const result = await UserService.createStudentToDb(student, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student created successfully!',
      data: result,
    });
    // next();
  }
);
const createFaculty: RequestHandler = catchasync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body;
    // eslint-disable-next-line no-console
    console.log('object', req.cookies, 'cookie');
    const result = await UserService.createFacultyToDb(faculty, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty created successfully!',
      data: result,
    });
    // next();
  }
);
const createAdmin: RequestHandler = catchasync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;

    const result = await UserService.createAdminDb(admin, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin created successfully!',
      data: result,
    });
    // next();
  }
);
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await UserService.getUsersFromDb();

    res.status(200).json({
      success: true,
      message: 'successfully!',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
  getUsers,
};
