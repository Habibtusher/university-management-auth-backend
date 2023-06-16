import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import User from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';

const createStudentToDb = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = '###AAAaaa';
  }
  user.role = 'student';
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );
  let newUserData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;
    const newStudent = await Student.create([student], { session });
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Faield to create student');
    }
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(400, 'Faield to create user');
    }
    newUserData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  }
  if (newUserData) {
    newUserData = await User.findOne({ id: newUserData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserData;
};
const createFacultyToDb = async (faculty: IFaculty, user: IUser) => {
  let newUserData = null;
  if (!user.password) {
    user.password = '###AAAaaa';
  }
  user.role = 'faculty';
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;
    const newFaculty = await Faculty.create([faculty], { session });
    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Faield to create faculty');
    }
    user.faculty = newFaculty[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Faield to create faculty');
    }
    newUserData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  }
  if (newUserData) {
    newUserData = await User.findOne({ id: newUserData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'department',
        },
        {
          path: 'faculty',
        },
      ],
    });
  }

  return newUserData;
};
const createAdminDb = async (admin: IAdmin, user: IUser) => {
  let newUserData = null;
  if (!user.password) {
    user.password = '###AAAaaa';
  }
  user.role = 'admin';
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateAdminId();
    user.id = id;
    admin.id = id;
    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Faield to create admin!');
    }
    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Faield to create user!');
    }
    newUserData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  }
  if (newUserData) {
    newUserData = await User.findOne({ id: newUserData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    });
  }
  return newUserData;
};
const getUsersFromDb = async () => {
  const result = await User.find();

  return result;
};
export const UserService = {
  createStudentToDb,
  getUsersFromDb,
  createFacultyToDb,
  createAdminDb,
};
