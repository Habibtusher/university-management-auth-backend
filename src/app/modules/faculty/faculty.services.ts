import { IGenericResponse } from './../../../interfaces/common';
import mongoose, { SortOrder } from 'mongoose';
import { calculatePagination } from '../../../helper/paginationHelper';
import { IPaginatioOpts } from '../../../interfaces/pagination';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { Faculty } from './faculty.model';
import { facultySearchableFields } from './faculty.const';
import User from '../user/user.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const getFacutiesFromDb = async (
  filters: IFacultyFilters,
  paginationOpt: IPaginatioOpts
): Promise<IGenericResponse<IFaculty[]>> => {
  const andCondition = [];
  const { searchTerm, ...filtersData } = filters;
  // const andConditions = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ];
  if (searchTerm) {
    andCondition.push({
      $or: facultySearchableFields.map(field => ({
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
    calculatePagination(paginationOpt);
  const sortOpts: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortOpts[sortBy] = sortOrder;
  }
  const result = await Faculty.find(whereCondition)
    .populate('department')
    .populate('faculty')
    .sort(sortOpts)
    .skip(skip)
    .limit(limit);
  const total = await Faculty.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleFacultyFromDb = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findOne({ id })
    .populate('department')
    .populate('faculty');
  return result;
};
const deleteFacultyFromDb = async (id: string): Promise<IFaculty | null> => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteFaculty = await Faculty.findOneAndDelete({ id }, { session })
      .populate('department')
      .populate('faculty');
    if (!deleteFaculty) {
      throw new Error('No faculty found with this id');
    }
    const deleteUser = await User.findOneAndDelete({ id }, { session });
    if (!deleteUser) {
      throw new Error('Faield to delete user');
    }
    await session.commitTransaction();
    session.endSession();
    return deleteFaculty;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }

  // return result;
};
const updateFacultyDb = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Faculty not found!');
  }
  const { name, ...facultyData } = payload;
  const updatedFacultytData: Partial<IFaculty> = { ...facultyData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedFacultytData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const result = Faculty.findOneAndUpdate({ id }, updatedFacultytData, {
    new: true,
  })
    .populate('department')
    .populate('faculty');
  return result;
};
export const FacultyService = {
  getFacutiesFromDb,
  getSingleFacultyFromDb,
  deleteFacultyFromDb,
  updateFacultyDb,
};
