import { Schema, model } from 'mongoose';
import {
  AcademicsemeSterModel,
  IAcademinsemester,
} from './academicSemester.interface';
import {
  academicsemesterCodes,
  academicsemesterMonths,
  academicsemesterTitles,
} from './academicSemester.constant';
import ApiError from '../../../errors/ApiError';
import status from 'http-status';

const academicSemesterSchema = new Schema<IAcademinsemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicsemesterTitles,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicsemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicsemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicsemesterMonths,
    },
  },
  { timestamps: true }
);

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Academic semester is already exist!');
  } else {
    next();
  }
});
const AcademicSemester = model<IAcademinsemester, AcademicsemeSterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
export default AcademicSemester;
