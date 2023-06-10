import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { calculatePagination } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginatioOpts } from '../../../interfaces/pagination';
import {
  academicSemesterSearchFields,
  academicsemesterTitleCodeMapper,
} from './academicSemester.constant';
import {
  IAcademicSemesterFilters,
  IAcademinsemester,
} from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';
import status from 'http-status';

const createSemesterToDb = async (
  payload: IAcademinsemester
): Promise<IAcademinsemester> => {
  if (academicsemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(status.BAD_REQUEST, 'Invalid semester code!');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getSemesterFromDb = async (
  filters: IAcademicSemesterFilters,
  paginationOtp: IPaginatioOpts
): Promise<IGenericResponse<IAcademinsemester[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: academicSemesterSearchFields.map(field => ({
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
  const result = await AcademicSemester.find(whereCondition)
    .sort(sortOpts)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleSenesterFromDb = async (
  id: string
): Promise<IAcademinsemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};
const updateSemesterInDb = async (
  id: string,
  payload: Partial<IAcademinsemester>
): Promise<IAcademinsemester | null> => {
  if (
    payload.title &&
    payload.code &&
    academicsemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(status.BAD_REQUEST, 'Invalid semester code!');
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteSemesterInDb = async (
  id: string
): Promise<IAcademinsemester | null> => {
  // const result = await AcademicSemester.findOneAndDelete({ _id: id });
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
};
export const AcademicSemesterService = {
  createSemesterToDb,
  getSemesterFromDb,
  getSingleSenesterFromDb,
  updateSemesterInDb,
  deleteSemesterInDb,
};
