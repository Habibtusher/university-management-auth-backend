import express from 'express';
import { FacultyControllers } from './faculty.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyZodValidation } from './faculty.validation';

const router = express.Router();

router.get('/', FacultyControllers.getFaculties);
router.get('/:id', FacultyControllers.getSingleFaculty);
router.delete('/:id', FacultyControllers.deleteFaculty);
router.patch(
  '/:id',
  validateRequest(FacultyZodValidation.facultyUpdateZodSchema),
  FacultyControllers.updateFaculty
);

export const FacultyRoutes = router;
