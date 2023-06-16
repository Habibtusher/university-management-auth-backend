import mongoose, { SortOrder } from 'mongoose';
import { calculatePagination } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginatioOpts } from '../../../interfaces/pagination';
import { IAdmin, IAdminFilters } from './admin.interface';
import { Admin } from './admin.model';
import { adminSearchableFields } from './admin.constant';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import User from '../user/user.model';

const getAllAdminDb = async (
  filters: IAdminFilters,
  paginationOpt: IPaginatioOpts
): Promise<IGenericResponse<IAdmin[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOpt);
  const sortOpts: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortOpts[sortBy] = sortOrder;
  }
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: adminSearchableFields.map(field => ({
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
  const result = await Admin.find(whereCondition)
    .populate('managementDepartment')
    .sort(sortOpts)
    .skip(skip)
    .limit(limit);
  return {
    meta: {
      total: await Admin.countDocuments(),
      page: page,
      limit: limit,
    },
    data: result,
  };
};
export const getSingleAdminDb = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findOne({ id });
  return result;
};
export const deleteAdminDb = async (id: string): Promise<IAdmin | null> => {
  const admin = await Admin.findOne({ id });
  if (!admin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No admin found with this id');
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deleteAdmin = await Admin.findOneAndDelete(
      { id },
      { session }
    ).populate('managementDepartment');
    if (!deleteAdmin) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Faield to delete admin');
    }
    const deleteUser = await User.findOneAndDelete({ id }, { session });
    if (!deleteUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Faield to delete user');
    }
    await session.commitTransaction();
    await session.endSession();
    return deleteAdmin;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  }
};
export const updateAdminDb = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Student not found!');
  }
  const { name, ...studentData } = payload;
  const updatedStudentData: Partial<IAdmin> = { ...studentData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Admin.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  }).populate('managementDepartment');

  return result;
};
export const AdminService = {
  getAllAdminDb,
  getSingleAdminDb,
  deleteAdminDb,
  updateAdminDb,
};
