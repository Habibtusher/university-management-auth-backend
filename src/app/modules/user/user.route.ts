import express from 'express';
import { UserController } from './user.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);
router.get('/', UserController.getUsers);

export const UserRoutes = router;
