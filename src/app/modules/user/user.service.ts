import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import User from './user.model';
import { generateId } from './user.utils';

const createUserToDb = async (user: IUser): Promise<IUser | null> => {
  const id = await generateId();
  user.id = id;
  if (!user.password) {
    user.password = '###AAAaaa';
  }

  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new ApiError(400, 'faield to create user');
  }
  return createdUser;
};
const getUsersFromDb = async () => {
  const result = await User.find();
  // eslint-disable-next-line no-console
  // console.log("🚀 ~ file: user.service.ts:23 ~ getUsersFromDb ~ result:", result)
  return result;
};
export const UserService = {
  createUserToDb,
  getUsersFromDb,
};
