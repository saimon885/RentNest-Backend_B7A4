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

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const adminId = req.user.id;
  const result = await adminService.updateUserBannedReq(
    userId as string,
    req.body,
    adminId,
  );
  res.status(httpStatus.OK).json({
    success: true,
    message: "user BannedStatus Update successfully",
    data: result,
  });
});

export const adminController = {
  getAllUser,
  getAllProperties,
  getAllRentalRequest,
  getAllStates,
  updateUser,
};
