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

const getAllProperties = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAllProperties();
  res.status(httpStatus.OK).json({
    success: true,
    message: "All Property retrieved successfully",
    data: result,
  });
});
const getAllRentalRequest = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAllRentals();
  res.status(httpStatus.OK).json({
    success: true,
    message: "All rental Request retrieved successfully",
    data: result,
  });
});
// advanced
const getAllStates = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAllStates();
  res.status(httpStatus.OK).json({
    success: true,
    message: "All States retrieved successfully",
    data: result,
  });
});

const updateUser = catchAsync((req: Request, res: Response) => {});

export const adminController = {
  getAllUser,
  getAllProperties,
  getAllRentalRequest,
  getAllStates,
  updateUser,
};
