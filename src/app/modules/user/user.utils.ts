import { IAcademinsemester } from '../academicSemester/academicSemester.interface';
import User from './user.model';

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent?.id.substring(4) : undefined;
};
export const findLastFacultytId = async (): Promise<string | undefined> => {
  const lastFacculty = await User.findOne(
    {
      role: 'faculty',
    },
    { id: 1, _id: 0 }
  ).sort({
    createdAt: -1,
  });

  return lastFacculty?.id ? lastFacculty.id.substring(2) : undefined;
};

export const generateStudentId = async (
  academicSemester: IAcademinsemester | null
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0'); //00000
  //increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${incrementedId}`;

  return incrementedId;
};
export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultytId()) || (0).toString().padStart(5, '0');
  //increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `F-${incrementedId}`;
  // eslint-disable-next-line no-console
  console.log(
    '🚀 ~ file: user.utils.ts:25 ~ incrementedId=`${academicSemester.year.substring ~ incrementedId:',
    incrementedId
  );

  return incrementedId;
};
