import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import config from "../../config";

const createPaymentStripeDB = async (rentalReqId: string): Promise<any> => {
  const rentalRequest = await prisma.rentalRequest.findUnique({
    where: {
      id: rentalReqId,
    },
    include: {
      property: true,
      tenant: {
        omit: {
          password: true,
        },
      },
    },
  });

  if (!rentalRequest) {
    throw new Error("Rental Request not found!");
  }
  if (rentalRequest.status !== "APPROVED") {
    throw new Error("Your request status is not Approved!");
  }

  const amount = rentalRequest.property.pricePerMonth;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "bdt",
          unit_amount: Number(amount) * 100,
          product_data: {
            name: rentalRequest.property.title,
            description: rentalRequest.property.description || undefined,
          },
        },
        quantity: 1,
      },
    ],
    payment_method_types: ["card"],
    customer_email: rentalRequest.tenant.email,
    mode: "payment",
    success_url: `${config.app_url}/premium?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.app_url}/payment?success=false`,
    metadata: {
      rentalRequestId: rentalReqId,
      tenantId: rentalRequest.tenantId,
    },
  });

  return session.url;
};

export const paymentServices = {
  createPaymentStripeDB,
};
