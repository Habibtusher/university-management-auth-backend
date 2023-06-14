import express from 'express';
import { StudentControllers } from './student.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);
router.get('/:id', StudentControllers.getSingleStudentByID);
router.patch(
  '/:id',
  validateRequest(StudentValidation.studentZodSchema),
  StudentControllers.updateStudent
);
router.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoute = router;
