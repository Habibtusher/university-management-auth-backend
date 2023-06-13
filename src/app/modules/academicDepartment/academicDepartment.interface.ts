import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';

export type IAcademicDepartment = {
  title: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
};

export type AacademicDepartmentModel = Model<IAcademicDepartment>;
export type IAcademicDepartmentFilters = {
  searchTerm?: string;
  title?: string;
};
