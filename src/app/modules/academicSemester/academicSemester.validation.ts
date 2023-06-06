import { z } from 'zod';
import {
  academicsemesterCodes,
  academicsemesterMonths,
  academicsemesterTitles,
} from './academicSemester.constant';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicsemesterTitles] as [string, ...string[]], {
      required_error: 'title is required',
    }),
    year: z.number({
      required_error: 'year is required',
    }),
    code: z.enum([...academicsemesterCodes] as [string, ...string[]], {
      required_error: 'code is required',
    }),
    startMonth: z.enum([...academicsemesterMonths] as [string, ...string[]], {
      required_error: 'start month is required',
    }),
    endMonth: z.enum([...academicsemesterMonths] as [string, ...string[]], {
      required_error: 'end month is required',
    }),
  }),
});
export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
};
