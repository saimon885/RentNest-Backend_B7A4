import { Request, Response } from "express";
import { catchAsync } from "../../utils/CathcAsync";
import { adminService } from "./admin.service";
import httpStatus from "http-status";
const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAllUserDB();
  res.status(httpStatus.OK).json({
    success: true,
    message: "All Users retrieved successfully",
    data: result,
  });
});
const getAllProperties = catchAsync((req: Request, res: Response) => {});
const getAllRentalRequest = catchAsync((req: Request, res: Response) => {});
// advanced
const getAllStates = catchAsync((req: Request, res: Response) => {});

const updateUser = catchAsync((req: Request, res: Response) => {});

export const adminController = {
  getAllUser,
  getAllProperties,
  getAllRentalRequest,
  getAllStates,
  updateUser,
};
