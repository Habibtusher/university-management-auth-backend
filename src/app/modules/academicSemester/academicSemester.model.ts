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

const academicSemesterSchema = new Schema<IAcademinsemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicsemesterTitles,
    },
    year: {
      type: Number,
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
const AcademicSemester = model<IAcademinsemester, AcademicsemeSterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
export default AcademicSemester;
