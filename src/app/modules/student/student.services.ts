import { IGenericResponse } from './../../../interfaces/common';
import { SortOrder } from 'mongoose';
import { calculatePagination } from '../../../helper/paginationHelper';
import { IPaginatioOpts } from '../../../interfaces/pagination';
import { IStudent, IStudentFilters } from './student.interface';
import { Student } from './student.model';
import { studentSearchableFields } from './student.constant';

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

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOtp);
  const sortOpts: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortOpts[sortBy] = sortOrder;
  }
  const whereCondition =
    andCondition.length > 0
      ? {
          $and: andCondition,
        }
      : {};
  const result = await Student.find(whereCondition)
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
const getAllStudentByIdFromDb = async (
  id: string
): Promise<IStudent | null> => {
  const result = await Student.findById(id);
  return result;
};
const updateStudentToDb = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const result = await Student.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteStudentFromDb = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findOneAndDelete({ _id: id });
  return result;
};
export const StudentServices = {
  getAllStudentsFromDb,
  getAllStudentByIdFromDb,
  updateStudentToDb,
  deleteStudentFromDb,
};
