import { Request, Response } from 'express';
import catchasync from '../../../shared/catchAsync';
import { AuthService } from './auth.services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const loginUser = catchasync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUserDb(loginData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User loggedin successfully',
    data: result,
  });
});
export const AuthController = { loginUser };
