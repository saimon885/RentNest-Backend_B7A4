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

const confirmPayment = catchAsync(async (req: Request, res: Response) => {
  const event = req.body as Buffer;
  const signature = req.headers["stripe-signature"]!;
  await paymentServices.confirmPaymentStripeDB(event, signature as string);
  res.status(httpstatus.OK).json({
    success: true,
    message: "webhook triggerd successfull",
    data: null,
  });
});

const getYourPayment = catchAsync(async (req: Request, res: Response) => {
  const tanentId = req.user.id;
  const result = await paymentServices.getYourPaymentDB(tanentId);
  res.status(httpstatus.OK).json({
    success: true,
    message: "Your all Payment History Retrive successfull",
    data: result,
  });
});
const getYourSinglePayment = catchAsync(async (req: Request, res: Response) => {
  const tanentId = req.user.id;
  const payID = req.params.id;
  const result = await paymentServices.getYourSinglePaymentDB(
    tanentId,
    payID as string,
  );
  res.status(httpstatus.OK).json({
    success: true,
    message: "Your Payment History Retrive successfull",
    data: result,
  });
});
export const paymentController = {
  createPayment,
  confirmPayment,
  getYourPayment,
  getYourSinglePayment,
};
