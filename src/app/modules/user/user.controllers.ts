import { RequestHandler, Response } from 'express';
import { UserService } from './user.service';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;
    const result = await UserService.createUserToDb(user);

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
const getUsers = async (res: Response) => {
  try {
    const result = await UserService.getUsersFromDb();
    if (result) {
      res.status(200).json({
        success: true,
        message: 'successfully!',
        data: result,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      messgae: 'faield to create user',
    });
  }
};
export const UserController = {
  createUser,
  getUsers,
};
