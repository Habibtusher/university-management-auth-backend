import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IAdmin } from '../admin/admin.interface';
import User from '../user/user.model';
import { ILoginUser } from './auth.interface';
import bcrypt from 'bcrypt';

const loginUserDb = async (payload: ILoginUser) => {
  // eslint-disable-next-line no-console
  const { id, password } = payload;
  const isUserExist = await User.findOne(
    { id },
    { id: 1, password: 1, needsPasswordChange: 1 }
  ).lean();
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorect');
  }
  return {};
};

export const AuthService = {
  loginUserDb,
};
