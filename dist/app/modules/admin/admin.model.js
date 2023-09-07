'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Admin = void 0;
const mongoose_1 = require('mongoose');
const student_constant_1 = require('../student/student.constant');
const admin_constant_1 = require('./admin.constant');
const adminSchema = new mongoose_1.Schema(
  {
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
      enum: student_constant_1.gender,
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
      enum: admin_constant_1.bloodGroup,
    },
    profileImage: {
      type: String,
      // required: true,
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
    managementDepartment: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'ManagementDepartment',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
exports.Admin = (0, mongoose_1.model)('Admin', adminSchema);
