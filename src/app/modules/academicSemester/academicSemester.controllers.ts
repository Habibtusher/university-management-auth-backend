import { Request, RequestHandler, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemister: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemesterToDb(
      academicSemesterData
    );

    res.status(200).json({
      success: true,
      message: 'academic semester created successfully!',
      data: result,
    });
  } catch (error) {
    // res.status(400).json({
    //   success: false,
    //   messgae: 'faield to create user',
    // })
    next(error);
  }
};
const getAcademicSemester = async (req: Request, res: Response) => {
  try {
    const response = await AcademicSemesterService.getSemesterFromDb();
    res.status(200).json({
      success: true,
      message: 'successfully!',
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      messgae: 'faield load user',
    });
  }
};
export const AcademicSemesterControllers = {
  createAcademicSemister,
  getAcademicSemester,
};
