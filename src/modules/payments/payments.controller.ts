import { Request, Response } from "express";
import { catchAsync } from "../../utils/CathcAsync";
import { paymentServices } from "./payment.service";
import httpstatus from "http-status";
const createPayment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.body;
  const result = await paymentServices.createPaymentStripeDB(id);
  res.status(httpstatus.CREATED).json({
    success: true,
    message: "Payment created SuccessFully",
    data: result,
  });
});

export const paymentController = {
  createPayment,
};
