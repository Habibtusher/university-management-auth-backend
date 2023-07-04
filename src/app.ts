import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';

import globalErrorHandler from './app/middlewares/globalErrorHandler';
import Routes from './app/routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
// import ApiError from './errors/ApiError'

const app: Application = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//!application routes
app.use('/api/v1', Routes);
// app.use('/api/v1/users', UserRoutes);
// app.use('/api/v1/academic-semester', AcademicSemesterRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use(globalErrorHandler);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API Not Found!',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found!',
      },
    ],
  });
  next();
});
export default app;
