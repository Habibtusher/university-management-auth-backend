import { Model } from 'mongoose';
export type IAcademicSemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
export type IAcademicSemesterTitles = 'Autum' | 'Summer' | 'Fall';
export type IAcademicSemesterCodes = '01' | '02' | '03';

export type IAcademinsemester = {
  title: IAcademicSemesterTitles;
  year: string;
  code: IAcademicSemesterCodes;
  startMonth: IAcademicSemesterMonths;
  endMonth: IAcademicSemesterMonths;
};
export type AcademicsemeSterModel = Model<IAcademinsemester>;
export type IAcademicSemesterFilters = {
  searchTerm?: string;
};
