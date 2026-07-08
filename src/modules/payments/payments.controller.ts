import { Request, Response } from "express";
import { catchAsync } from "../../utils/CathcAsync";
import { paymentServices } from "./payment.service";
import httpstatus from "http-status";
import { stripe } from "../../lib/stripe";
import config from "../../config";
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
  let event;
  const sig = req.headers["stripe-signature"] as string;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      config.stripe_webhook_Secret,
    );
  } catch (err: any) {
    console.error("Stripe Webhook Validation Failed:", err.message);
    return res
      .status(httpstatus.BAD_REQUEST)
      .send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    const sessionId = session.id;
    const rentalRequestId = session.metadata.rentalRequestId;
    const tenantId = session.metadata.tenantId;
    const amount = session.amount_total / 100;

    await paymentServices.confirmPaymentStripeDB(
      sessionId,
      rentalRequestId,
      tenantId,
      amount,
    );
  }

  res.status(httpstatus.OK).json({ received: true });
};

export const paymentController = {
  createPayment,
  confirmPayment,
};
