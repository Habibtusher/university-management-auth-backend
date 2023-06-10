import {
  IAcademicSemesterCodes,
  IAcademicSemesterMonths,
  IAcademicSemesterTitles,
} from './academicSemester.interface';

export const academicsemesterMonths: IAcademicSemesterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicsemesterCodes: IAcademicSemesterCodes[] = [
  '01',
  '02',
  '03',
];
export const academicsemesterTitles: IAcademicSemesterTitles[] = [
  'Autum',
  'Summer',
  'Fall',
];
export const academicsemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autum: '01',
  Summer: '02',
  Fall: '03',
};
export const academicSemesterSearchFields = ['title', 'code', 'year'];
export const academicSemesterFilterableFields = [
  'searchTerm',
  'title',
  'year',
  'code',
];
