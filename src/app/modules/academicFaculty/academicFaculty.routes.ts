import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controllers';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createAcademicFaculty
);
router.get('/faculties', AcademicFacultyController.getAcademicFaculty);
router.get(
  '/faculties/:id',
  AcademicFacultyController.getSingleAcademicFaculty
);
router.delete(
  '/faculties/:id',
  AcademicFacultyController.deleteAcademicFaculty
);
router.patch(
  '/update-faculty/:id',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.updateAcademicFaculty
);

export const AcademicFacultyRoutes = router;
