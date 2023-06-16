import { IAdmin } from './admin.interface';
import { Request, Response } from 'express';
import catchasync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { adminFilterableFields } from './admin.constant';
import { paginationFields } from '../../../constant/pagination';
import { AdminService } from './admin.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const getAllAdmin = catchasync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const paginationOpt = pick(req.query, paginationFields);
  const result = await AdminService.getAllAdminDb(filters, paginationOpt);

  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'successfully',
    data: result.data,
    meta: result.meta,
  });
});
const getSingleAdmin = catchasync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.getSingleAdminDb(id);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'successfully',
    data: result,
  });
});
const deleteAdmin = catchasync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.deleteAdminDb(id);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin delete successfully',
    data: result,
  });
});
const updateAdmin = catchasync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const result = await AdminService.updateAdminDb(id, data);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin update successfully',
    data: result,
  });
});
export const AdminControllers = {
  getAllAdmin,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
};
