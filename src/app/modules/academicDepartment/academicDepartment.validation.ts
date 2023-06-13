import { z } from 'zod';

const createAcademicDepartmentSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .nonempty('Title is required'),
    academicFaculty: z
      .string({
        required_error: 'Academic faculty is required',
      })
      .nonempty('Academic faculty is required'),
  }),
});
const updateAcademicDepartmentSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        required_error: 'Academic faculty is required',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentSchema,
  updateAcademicDepartmentSchema,
};
