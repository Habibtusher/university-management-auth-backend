import { Request, Response } from 'express';
import catchasync from '../../../shared/catchAsync';
import { AuthService } from './auth.services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import config from '../../../config';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';

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
const refreshToken = catchasync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshTokenDb(refreshToken);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'New access token generate successfully !',
    data: result,
  });
});
const changePassword = catchasync(async (req: Request, res: Response) => {
  const user = req.user;
  const { ...passwordData } = req.body;
  const result = await AuthService.changePasswordDb(user, passwordData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'password changed successfully',
    data: result,
  });
});
export const AuthController = { loginUser, refreshToken, changePassword };
