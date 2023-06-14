import { Schema, model } from 'mongoose';
import { FacultyModel, IFaculty } from './faculty.interface';
import { bloodGroup, gender } from './faculty.const';

const facultySchema = new Schema<IFaculty>({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: {
      firstName: {
        type: String,
        required: true,
      },
      middleName: {
        type: String,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    required: true,
  },
  gender: {
    type: String,
    enum: gender,
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  contactNo: {
    type: String,
    unique: true,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: bloodGroup,
  },
  profileImage: {
    type: String,
    // required: true,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
    required: true,
  },
  faculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicFaculty',
    required: true,
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
});

export const Faculty = model<IFaculty, FacultyModel>('Faculty', facultySchema);
