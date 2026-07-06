import { Request, Response } from "express";
import httpStatus from "http-status";
import { authServices } from "./auth.service";
import { catchAsync } from "../../utils/CathcAsync";

const createUserHandler = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const result = await authServices.createUserDB(body);
  res.status(httpStatus.CREATED).json({
    success: true,
    message: "User created successfully",
    data: result,
  });
});
const loginUserHandler = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const result = await authServices.loginUserDB(body);
  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 24,
  });
  res.status(httpStatus.OK).json({
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});
const myProfileHandler = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const result = await authServices.myProfileDB(userId);
  res.status(httpStatus.OK).json({
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});
export const authController = {
  createUserHandler,
  loginUserHandler,
  myProfileHandler,
};
