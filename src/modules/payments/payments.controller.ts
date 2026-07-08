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

const confirmPayment = async (req: Request, res: Response) => {
  const event = req.body as Buffer;
  const signature = req.headers["stripe-signature"]!;
  await paymentServices.confirmPaymentStripeDB(event, signature as string);
  res.status(httpstatus.OK).json({
    success: true,
    message: "webhook triggerd successfull",
    data: null,
  });
};

export const paymentController = {
  createPayment,
  confirmPayment,
};
