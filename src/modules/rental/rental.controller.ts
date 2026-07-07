import { Request, Response } from "express";
import { catchAsync } from "../../utils/CathcAsync";
import { rentalServices } from "./rental.service";
import httpStatus from "http-status";
const createRentalRequest = catchAsync(async (req: Request, res: Response) => {
  const id = req.user.id;
  const result = await rentalServices.createRentalRequestDB(req.body, id);
  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Request Created Successfull",
    data: result,
  });
});
const getRentalRequest = catchAsync(async (req: Request, res: Response) => {
  const rentalId = req.user.id;
  const result = await rentalServices.getRentalRequestDB(rentalId);
  res.status(httpStatus.OK).json({
    success: true,
    message: "Request Retrive Successfull",
    data: result,
  });
});
const getSingleRentalRequest = catchAsync(
  async (req: Request, res: Response) => {
    const rentalId = req.user.id;
    const reqId = req.params.id;
    const result = await rentalServices.getSingleRentalRequest(
      reqId as string,
      rentalId,
    );
    res.status(httpStatus.OK).json({
      success: true,
      message: "Single Request Retrive Successfull",
      data: result,
    });
  },
);

export const rentalController = {
  createRentalRequest,
  getRentalRequest,
  getSingleRentalRequest,
};
