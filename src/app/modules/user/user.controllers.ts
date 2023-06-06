import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { ...userData } = req.body;
    const result = await UserService.createUserToDb(userData);

    res.status(200).json({
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  } catch (error) {
    // res.status(400).json({
    //   success: false,
    //   messgae: 'faield to create user',
    // })
    next(error);
  }
};
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
  createUser,
  getUsers,
};
