import express from 'express';
import { UserController } from './user.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentUserZodSchema),
  UserController.createStudent
);
router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyUserZodSchema),
  UserController.createFaculty
);
router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminUserZodSchema),
  UserController.createAdmin
);
router.get('/', UserController.getUsers);

export const UserRoutes = router;
