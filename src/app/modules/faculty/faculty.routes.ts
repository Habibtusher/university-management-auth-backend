import express from 'express';
import { FacultyControllers } from './faculty.controllers';

const router = express.Router();

router.get('/', FacultyControllers.getFaculties);

export const FacultyRoutes = router;
