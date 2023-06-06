import express, { Application } from 'express';
import cors from 'cors';

import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/user/user.route';
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.routes';
// import ApiError from './errors/ApiError'

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//!application routes
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/academic-semester', AcademicSemesterRoutes);
// app.get('/', (req: Request, res: Response) => {
//   throw new Error('testing error logger')
//   // res.send('Hello World!')
// })
app.use(globalErrorHandler);
export default app;
