import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import config from "../../config";
import { handleCheckOutComplete } from "./subscription.utils";

const createPaymentStripeDB = async (rentalReqId: string) => {
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
    success_url: `${config.app_url}/premium?success=true`,
    cancel_url: `${config.app_url}/payment?success=false`,
    metadata: {
      rentalRequestId: rentalReqId,
      tenantId: rentalRequest.tenantId,
    },
  });

  return session.url;
};

const confirmPaymentStripeDB = async (payload: Buffer, signature: string) => {
  const endPointSecret = config.stripe_webhook_Secret;
  try {
    const event = await stripe.webhooks.constructEventAsync(
      payload,
      signature,
      endPointSecret,
    );
    console.log("event", event);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as any;

        const sessionId = session.id;
        const rentalRequestId = session.metadata.rentalRequestId;
        const tenantId = session.metadata.tenantId;
        const amount = session.amount_total / 100;

        await handleCheckOutComplete(
          sessionId,
          rentalRequestId,
          tenantId,
          amount,
        );
        break;
      }
      case "customer.subscription.updated": {
        const paymentMethod = event.data.object;
        break;
      }
      case "customer.subscription.deleted": {
        const paymentMethod = event.data.object;
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    throw err;
  }
};
export const paymentServices = {
  createPaymentStripeDB,
  confirmPaymentStripeDB,
};
