import express from 'express';
import { ManagementDepartmentValidation } from './managementDepartment.validation';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentController } from './managementDepartment.controllers';
const router = express.Router();

router.post(
  '/create-management',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.createManagementDepartment
);

router.get('/', ManagementDepartmentController.getAllManagementDepartment);

router.get(
  '/:id',
  ManagementDepartmentController.getSingleManagementDepartment
);
router.delete(
  '/:id',
  ManagementDepartmentController.deleteManagementDepartment
);

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.updateManagementDepartment
);

export const ManagementDepartmentRoutes = router;
