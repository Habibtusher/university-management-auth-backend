import { Request, Response } from 'express'
import userService from './users.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await userService.createUserToDb(user)

    res.status(200).json({
      success: true,
      message: 'user created successfully!',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      messgae: 'faield to create user',
    })
  }
}
const getUsers = async (res: Response) => {
  try {
    const result = await userService.getUsersFromDb()

    res.status(200).json({
      success: true,
      message: 'successfully!',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      messgae: 'something went wrong',
    })
  }
}

export default {
  createUser,
  getUsers,
}
