import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { IAcademicFaculty } from './../academicFaculty/academicFaculty.interface';
import { Model, Types } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName?: string;
};
export type IFaculty = {
  id: string;
  name: UserName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  department: Types.ObjectId | IAcademicDepartment;
  faculty: Types.ObjectId | IAcademicFaculty;
  designation: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  profileImage: string;
};

export type FacultyModel = Model<IFaculty, Record<string, unknown>>;
