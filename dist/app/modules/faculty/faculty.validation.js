'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FacultyZodValidation = void 0;
const zod_1 = require('zod');
const faculty_const_1 = require('./faculty.const');
const facultyUpdateZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z
      .object({
        firstName: zod_1.z.string().optional(),
        middleName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
      })
      .optional(),
    dateOfBirth: zod_1.z.string().optional(),
    gender: zod_1.z.enum([...faculty_const_1.gender]).optional(),
    email: zod_1.z.string().email().optional(),
    contactNo: zod_1.z.string().optional(),
    emergencyContactNo: zod_1.z.string().optional(),
    bloodGroup: zod_1.z.enum([...faculty_const_1.bloodGroup]).optional(),
    presentAddress: zod_1.z.string().optional(),
    permanentAddress: zod_1.z.string().optional(),
    department: zod_1.z.string().optional(),
    faculty: zod_1.z.string().optional(),
    profileImage: zod_1.z.string().optional(),
    designation: zod_1.z.string().optional(),
  }),
});
exports.FacultyZodValidation = {
  facultyUpdateZodSchema,
};
