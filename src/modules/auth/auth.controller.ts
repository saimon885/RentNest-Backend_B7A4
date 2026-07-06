import { Request, Response } from "express";
import httpStatus from "http-status";
import { authServices } from "./auth.service";

const createUserHandler = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const result = await authServices.createUserDB(body);
    res.status(httpStatus.CREATED).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};
const loginUserHandler = async (req: Request, res: Response) => {
  try {
  } catch (err: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
      error: err,
    });
  }
};
const myProfileHandler = async (req: Request, res: Response) => {
  try {
  } catch (err: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
      error: err,
    });
  }
};

export const authController = {
  createUserHandler,
  loginUserHandler,
  myProfileHandler,
};
