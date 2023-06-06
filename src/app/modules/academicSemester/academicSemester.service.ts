import { IAcademinsemester } from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';

const createSemesterToDb = async (
  payload: IAcademinsemester
): Promise<IAcademinsemester> => {
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
