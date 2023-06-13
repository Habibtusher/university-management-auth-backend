import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controllers';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(AcademicDepartmentValidation.createAcademicDepartmentSchema),
  AcademicDepartmentControllers.createDepartment
);
router.get('/:id', AcademicDepartmentControllers.singleDepartment);
router.get('/', AcademicDepartmentControllers.getDepartment);

router.delete('/:id', AcademicDepartmentControllers.deleteDepartment);
router.patch(
  '/:id',
  validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentSchema),
  AcademicDepartmentControllers.updateDepartment
);

export const AcademicDepartmentRouter = router;
