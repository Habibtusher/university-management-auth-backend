import ApiError from '../../../errors/ApiError';
import { academicsemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademinsemester } from './academicSemester.interface';
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
const getSemesterFromDb = async () => {
  const result = await AcademicSemester.find();
  return result;
};
export const AcademicSemesterService = {
  createSemesterToDb,
  getSemesterFromDb,
};
