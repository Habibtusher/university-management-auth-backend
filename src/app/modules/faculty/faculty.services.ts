import { IGenericResponse } from './../../../interfaces/common';
import { SortOrder } from 'mongoose';
import { calculatePagination } from '../../../helper/paginationHelper';
import { IPaginatioOpts } from '../../../interfaces/pagination';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { Faculty } from './faculty.model';
import { facultySearchableFields } from './faculty.const';

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
export const FacultyService = {
  getFacutiesFromDb,
};
