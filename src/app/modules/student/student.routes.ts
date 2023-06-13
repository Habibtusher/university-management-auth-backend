import express from 'express';
import { StudentControllers } from './student.controllers';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);
router.get('/:id', StudentControllers.getAllStudentByID);
router.patch('/:id', StudentControllers.updateStudent);
router.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoute = router;
