'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserValidation = void 0;
const zod_1 = require('zod');
const student_constant_1 = require('../student/student.constant');
const createStudentUserZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    password: zod_1.z.string().optional(),
    student: zod_1.z.object({
      name: zod_1.z.object({
        firstName: zod_1.z
          .string({
            required_error: 'First name is required',
          })
          .nonempty('First name is required'),
        middleName: zod_1.z.string({}).optional(),
        lastName: zod_1.z
          .string({
            required_error: 'Last name is required',
          })
          .nonempty('Last name is required'),
      }),
      dateOfBirth: zod_1.z
        .string({
          required_error: 'Date of birth is required',
        })
        .nonempty('Date of birth is required'),
      gender: zod_1.z.enum([...student_constant_1.gender], {
        required_error: 'Gender is required',
      }),
      email: zod_1.z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: zod_1.z.string({
        required_error: 'Contact number is required',
      }),
      emergencyContactNo: zod_1.z.string({
        required_error: 'Emergency contact number is required',
      }),
      bloodGroup: zod_1.z.enum([...student_constant_1.bloodGroup]).optional(),
      presentAddress: zod_1.z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: zod_1.z.string({
        required_error: 'Permanent address is required',
      }),
      academicSemester: zod_1.z.string({
        required_error: 'Academic semester is required',
      }),
      academicDepartment: zod_1.z.string({
        required_error: 'Academic department is required',
      }),
      academicFaculty: zod_1.z.string({
        required_error: 'Academic faculty is required',
      }),
      guardian: zod_1.z.object({
        fatherName: zod_1.z.string({
          required_error: 'Father name is required',
        }),
        fatherOccupation: zod_1.z.string({
          required_error: 'Father occupation is required',
        }),
        fatherContactNo: zod_1.z.string({
          required_error: 'Father contact number is required',
        }),
        motherName: zod_1.z.string({
          required_error: 'Mother name is required',
        }),
        motherOccupation: zod_1.z.string({
          required_error: 'Mother occupation is required',
        }),
        motherContactNo: zod_1.z.string({
          required_error: 'Mother contact number is required',
        }),
        address: zod_1.z.string({
          required_error: 'Guardian address is required',
        }),
      }),
      localGuardian: zod_1.z.object({
        name: zod_1.z.string({
          required_error: 'Local guardian name is required',
        }),
        occupation: zod_1.z.string({
          required_error: 'Local guardian occupation is required',
        }),
        contactNo: zod_1.z.string({
          required_error: 'Local guardian contact number is required',
        }),
        address: zod_1.z.string({
          required_error: 'Local guardian address is required',
        }),
      }),
      profileImage: zod_1.z.string().optional(),
    }),
  }),
});
const createFacultyUserZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    password: zod_1.z.string().optional(),
    faculty: zod_1.z.object({
      name: zod_1.z.object({
        firstName: zod_1.z
          .string({
            required_error: 'First name is required',
          })
          .nonempty('First name is required'),
        middleName: zod_1.z.string({}).optional(),
        lastName: zod_1.z
          .string({
            required_error: 'Last name is required',
          })
          .nonempty('Last name is required'),
      }),
      dateOfBirth: zod_1.z
        .string({
          required_error: 'Date of birth is required',
        })
        .nonempty('Date of birth is required'),
      gender: zod_1.z.enum([...student_constant_1.gender], {
        required_error: 'Gender is required',
      }),
      email: zod_1.z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: zod_1.z.string({
        required_error: 'Contact number is required',
      }),
      emergencyContactNo: zod_1.z.string({
        required_error: 'Emergency contact number is required',
      }),
      bloodGroup: zod_1.z.enum([...student_constant_1.bloodGroup]).optional(),
      presentAddress: zod_1.z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: zod_1.z.string({
        required_error: 'Permanent address is required',
      }),
      department: zod_1.z.string({
        required_error: 'Academic department is required',
      }),
      faculty: zod_1.z.string({
        required_error: 'Academic faculty is required',
      }),
      profileImage: zod_1.z.string().optional(),
      designation: zod_1.z.string({
        required_error: 'Designation is required',
      }),
    }),
  }),
});
const createAdminUserZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    password: zod_1.z.string().optional(),
    admin: zod_1.z.object({
      name: zod_1.z.object({
        firstName: zod_1.z
          .string({
            required_error: 'First name is required',
          })
          .nonempty('First name is required'),
        middleName: zod_1.z.string({}).optional(),
        lastName: zod_1.z
          .string({
            required_error: 'Last name is required',
          })
          .nonempty('Last name is required'),
      }),
      dateOfBirth: zod_1.z
        .string({
          required_error: 'Date of birth is required',
        })
        .nonempty('Date of birth is required'),
      gender: zod_1.z.enum([...student_constant_1.gender], {
        required_error: 'Gender is required',
      }),
      email: zod_1.z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: zod_1.z.string({
        required_error: 'Contact number is required',
      }),
      emergencyContactNo: zod_1.z.string({
        required_error: 'Emergency contact number is required',
      }),
      bloodGroup: zod_1.z.enum([...student_constant_1.bloodGroup]).optional(),
      presentAddress: zod_1.z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: zod_1.z.string({
        required_error: 'Permanent address is required',
      }),
      managementDepartment: zod_1.z.string({
        required_error: 'Academic faculty is required',
      }),
      profileImage: zod_1.z.string().optional(),
      designation: zod_1.z.string({
        required_error: 'Designation is required',
      }),
    }),
  }),
});
exports.UserValidation = {
  createStudentUserZodSchema,
  createFacultyUserZodSchema,
  createAdminUserZodSchema,
};
