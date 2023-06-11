import { IGenericResponse } from './../../../interfaces/common';
import { SortOrder } from 'mongoose';
import { calculatePagination } from '../../../helper/paginationHelper';
import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from './academicFaculty.interface';
import AcademicFaculty from './academicFaculty.model';
import { IPaginatioOpts } from '../../../interfaces/pagination';
import { academicFacultysearchFields } from './academicFaculty.constant';

const createAcademicFacultyToDb = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(payload);
  return result;
};
const getAcademicFacultyFromDb = async (
  filters: IAcademicFacultyFilters,
  pagination: IPaginatioOpts
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: academicFacultysearchFields.map(field => ({
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
    calculatePagination(pagination);
  const sortOpts: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortOpts[sortBy] = sortOrder;
  }
  const result = await AcademicFaculty.find(whereCondition)
    .sort(sortOpts)
    .skip(skip)
    .limit(limit);
  const total = await AcademicFaculty.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleAcademicFacultyFromDb = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};
const deleteAcademicFacultyFromDb = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};
const updateAcademicFacultyFromDb = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicFacultyService = {
  createAcademicFacultyToDb,
  getAcademicFacultyFromDb,
  getSingleAcademicFacultyFromDb,
  deleteAcademicFacultyFromDb,
  updateAcademicFacultyFromDb,
};
