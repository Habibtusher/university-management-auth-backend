import { z } from 'zod';
import { gender, bloodGroup } from '../student/student.constant';

const createStudentUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z
          .string({
            required_error: 'First name is required',
          })
          .nonempty('First name is required'),
        middleName: z.string({}).optional(),
        lastName: z
          .string({
            required_error: 'Last name is required',
          })
          .nonempty('Last name is required'),
      }),
      dateOfBirth: z
        .string({
          required_error: 'Date of birth is required',
        })
        .nonempty('Date of birth is required'),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact number is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      academicSemester: z.string({
        required_error: 'Academic semester is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic faculty is required',
      }),
      guardian: z.object({
        fatherName: z.string({
          required_error: 'Father name is required',
        }),
        fatherOccupation: z.string({
          required_error: 'Father occupation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father contact number is required',
        }),
        motherName: z.string({
          required_error: 'Mother name is required',
        }),
        motherOccupation: z.string({
          required_error: 'Mother occupation is required',
        }),
        motherContactNo: z.string({
          required_error: 'Mother contact number is required',
        }),
        address: z.string({
          required_error: 'Guardian address is required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: 'Local guardian name is required',
        }),
        occupation: z.string({
          required_error: 'Local guardian occupation is required',
        }),
        contactNo: z.string({
          required_error: 'Local guardian contact number is required',
        }),
        address: z.string({
          required_error: 'Local guardian address is required',
        }),
      }),
      profileImage: z.string().optional(),
    }),
  }),
});
const createFacultyUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      name: z.object({
        firstName: z
          .string({
            required_error: 'First name is required',
          })
          .nonempty('First name is required'),
        middleName: z.string({}).optional(),
        lastName: z
          .string({
            required_error: 'Last name is required',
          })
          .nonempty('Last name is required'),
      }),
      dateOfBirth: z
        .string({
          required_error: 'Date of birth is required',
        })
        .nonempty('Date of birth is required'),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact number is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      department: z.string({
        required_error: 'Academic department is required',
      }),
      faculty: z.string({
        required_error: 'Academic faculty is required',
      }),
      profileImage: z.string().optional(),
      designation: z.string({
        required_error: 'Designation is required',
      }),
    }),
  }),
});
const createAdminUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      name: z.object({
        firstName: z
          .string({
            required_error: 'First name is required',
          })
          .nonempty('First name is required'),
        middleName: z.string({}).optional(),
        lastName: z
          .string({
            required_error: 'Last name is required',
          })
          .nonempty('Last name is required'),
      }),
      dateOfBirth: z
        .string({
          required_error: 'Date of birth is required',
        })
        .nonempty('Date of birth is required'),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact number is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      managementDepartment: z.string({
        required_error: 'Academic faculty is required',
      }),
      profileImage: z.string().optional(),
      designation: z.string({
        required_error: 'Designation is required',
      }),
    }),
  }),
});
export const UserValidation = {
  createStudentUserZodSchema,
  createFacultyUserZodSchema,
  createAdminUserZodSchema,
};
