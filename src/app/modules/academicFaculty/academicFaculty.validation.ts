import { z } from 'zod';

const createAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .nonempty('Title is required'),
  }),
});

export const AcademicFacultyValidation = {
  createAcademicFacultyZodSchema,
};
