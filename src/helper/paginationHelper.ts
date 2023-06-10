import { SortOrder } from 'mongoose';

type IOpts = {
  page?: number;
  limit?: number;
  sortOrder?: SortOrder;
  sortBy?: string;
};
type IReturn = {
  page: number;
  limit: number;
  skip: number;
  sortOrder: SortOrder;
  sortBy: string;
};
export const calculatePagination = (options: IOpts): IReturn => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
