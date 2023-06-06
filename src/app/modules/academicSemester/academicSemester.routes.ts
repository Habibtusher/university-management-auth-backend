import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterControllers } from './academicSemester.controllers';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterControllers.createAcademicSemister
);
router.get('/', AcademicSemesterControllers.getAcademicSemester);
export const AcademicSemesterRoutes = router;
