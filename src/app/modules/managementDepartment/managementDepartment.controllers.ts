import { Request, Response } from 'express';
import catchasync from '../../../shared/catchAsync';
import { ManagementDepartmentService } from './managementDepartment.services';
import sendResponse from '../../../shared/sendResponse';
import { IManagementDepartment } from './managementDepartment.interface';
import httpStatus from 'http-status';

const createManagementDepartment = catchasync(
  async (req: Request, res: Response) => {
    const { ...data } = req.body;
    const result =
      await ManagementDepartmentService.createManagementDepartmentDb(data);
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department created successfully',
      data: result,
    });
  }
);
const getAllManagementDepartment = catchasync(
  async (req: Request, res: Response) => {
    const result =
      await ManagementDepartmentService.getManagementDepartmentDb();
    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department retrieved successfully',
      data: result,
    });
  }
);
const getSingleManagementDepartment = catchasync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await ManagementDepartmentService.getSingleManagementDepartmentDb(id);
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department retrieved successfully',
      data: result,
    });
  }
);
const updateManagementDepartment = catchasync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...data } = req.body;
    const result =
      await ManagementDepartmentService.updateManagementDepartmentDb(id, data);
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department update successfully',
      data: result,
    });
  }
);
const deleteManagementDepartment = catchasync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result =
      await ManagementDepartmentService.deleteManagementDepartmentDb(id);
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department delete successfully',
      data: result,
    });
  }
);

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartment,
  getSingleManagementDepartment,
  deleteManagementDepartment,
  updateManagementDepartment,
};
