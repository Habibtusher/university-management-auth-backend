/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGenericResponse } from './../../../interfaces/common';
import mongoose, { SortOrder } from 'mongoose';
import { calculatePagination } from '../../../helper/paginationHelper';
import { IPaginatioOpts } from '../../../interfaces/pagination';
import { IStudent, IStudentFilters } from './student.interface';
import { Student } from './student.model';
import { studentSearchableFields } from './student.constant';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { logger } from '../../../shared/logger';
import User from '../user/user.model';

const getAllStudentsFromDb = async (
  filters: IStudentFilters,
  paginationOtp: IPaginatioOpts
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: studentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([fields, value]) => ({
        [fields]: value,
      })),
    });
  }

  const whereCondition =
    andCondition.length > 0
      ? {
          $and: andCondition,
        }
      : {};
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOtp);
  const sortOpts: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortOpts[sortBy] = sortOrder;
  }
  const result = await Student.find(whereCondition)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortOpts)
    .skip(skip)
    .limit(limit);
  const total = await Student.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleStudentFromDb = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findOne({ id })
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};
const updateStudentToDb = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  logger.info(id);
  const isExist = await Student.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Student not found!');
  }
  const { name, guardian, localGuardian, ...studentData } = payload;
  const updatedStudentData: Partial<IStudent> = { ...studentData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}`;
      (updatedStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian];
    });
  }
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey = `localGuardian.${key}`;
      (updatedStudentData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }

  const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  });
  return result;
};
const deleteStudentFromDb = async (id: string): Promise<IStudent | null> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const result = await Student.findOneAndDelete({ _id: id }, { session })
      .populate('academicSemester')
      .populate('academicDepartment')
      .populate('academicFaculty');
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Faield to delete student');
    }
    const userDelete = await User.findOneAndDelete(
      { student: id },
      { session }
    );
    if (!userDelete) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Faield to delete user');
    }
    await session.commitTransaction();
    session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
export const StudentServices = {
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  updateStudentToDb,
  deleteStudentFromDb,
};
