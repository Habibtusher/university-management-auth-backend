import { Request, Response } from 'express';
import catchasync from '../../../shared/catchAsync';
import { AuthService } from './auth.services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import config from '../../../config';
import { ILoginUserResponse } from './auth.interface';

const loginUser = catchasync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUserDb(loginData);
  const { refreshToken, ...others } = result;
  const cookieOpt = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOpt);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User loggedin successfully',
    data: others,
  });
});
export const AuthController = { loginUser };
