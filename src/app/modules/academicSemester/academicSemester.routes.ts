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
router.get('/:id', AcademicSemesterControllers.getSingleSemister);
router.delete(
  '/delete-semester/:id',
  AcademicSemesterControllers.deleteSemester
);
router.patch(
  '/update-semester/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterControllers.updateSemester
);
export const AcademicSemesterRoutes = router;
