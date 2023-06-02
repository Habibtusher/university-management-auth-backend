// import config from '../../../config'
import { IUser } from './users.interface'
import User from './users.model'
import { generateId } from './users.utils'

const createUserToDb = async (user: IUser): Promise<IUser | null> => {
  const id = await generateId()
  user.id = id
  if (!user.password) {
    // user.password = config.default_user_password as string
    user.password = '###AAAaaa'
  }
  console.log('object', user)
  const createdUser = await User.create(user)

  if (!createdUser) {
    throw new Error('faield to create user')
  }
  return createdUser
}
const getUsersFromDb = async (): Promise<IUser[]> => {
  return User.find({})
}
export default {
  createUserToDb,
  getUsersFromDb,
}
