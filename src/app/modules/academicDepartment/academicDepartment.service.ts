import { SortOrder } from 'mongoose';
import { calculatePagination } from '../../../helper/paginationHelper';
import { IPaginatioOpts } from '../../../interfaces/pagination';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import AcademicDepartment from './academicDepartment.model';
import { IGenericResponse } from '../../../interfaces/common';
import { academicDepartmentsearchFields } from './academicDepartment.constant';

const createDepartmentToDb = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  );
  return result;
};
const getDepartmentFromDb = async (
  pagination: IPaginatioOpts,
  filters: IAcademicDepartmentFilters
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(pagination);
  const { searchTerm, ...filterData } = filters;
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: academicDepartmentsearchFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([fields, value]) => ({
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
  const sortOpt: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortOpt[sortBy] = sortOrder;
  }

  const result = await AcademicDepartment.find(whereCondition);
  const total = await AcademicDepartment.countDocuments()
    .sort(sortOpt)
    .skip(skip)
    .limit(limit)
    .populate('academicFaculty');
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const deleteDepartmentFromDb = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id);
  return result;
};
const updaterDepartmentInDb = async (
  id: string,
  payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  ).populate('academicFaculty');
  return result;
};
const getSingleDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  );
  return result;
};

export const AcademicDepartmentService = {
  createDepartmentToDb,
  getDepartmentFromDb,
  deleteDepartmentFromDb,
  updaterDepartmentInDb,
  getSingleDepartment,
};
