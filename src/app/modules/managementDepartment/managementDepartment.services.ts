import { IManagementDepartment } from './managementDepartment.interface';
import { ManagementDepartment } from './managementDepartment.model';

const createManagementDepartmentDb = async (
  payload: IManagementDepartment
): Promise<IManagementDepartment> => {
  const result = await ManagementDepartment.create(payload);
  return result;
};
const getManagementDepartmentDb = async (): Promise<
  IManagementDepartment[]
> => {
  const result = await ManagementDepartment.find();
  return result;
};
const getSingleManagementDepartmentDb = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findOne({ _id: id });
  return result;
};
const updateManagementDepartmentDb = async (
  id: string,
  payload: Partial<IManagementDepartment>
): Promise<IManagementDepartment | null> => {
  // eslint-disable-next-line no-console
  console.log(payload);
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );
  return result;
};
const deleteManagementDepartmentDb = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findOneAndDelete({ _id: id });
  return result;
};
export const ManagementDepartmentService = {
  createManagementDepartmentDb,
  getManagementDepartmentDb,
  getSingleManagementDepartmentDb,
  updateManagementDepartmentDb,
  deleteManagementDepartmentDb,
};
