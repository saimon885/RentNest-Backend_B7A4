import { prisma } from "../../lib/prisma";
import { PaymentStatus, ReqStatus } from "../../../generated/prisma/enums";

export const handleCheckOutComplete = async (
  sessionId: string,
  rentalRequestId: string,
  tenantId: string,
  amount: number,
) => {
  const result = await prisma.$transaction(async (tx) => {
    const payment = await tx.payment.create({
      data: {
        rentalRequestId: rentalRequestId,
        tenantId: tenantId,
        amount: amount,
        transactionId: sessionId,
        status: PaymentStatus.COMPLETED,
        paidAt: new Date(),
      },
    });

    await tx.rentalRequest.update({
      where: {
        id: rentalRequestId,
      },
      data: {
        status: ReqStatus.COMPLETED,
      },
    });

    const rentalRequest = await tx.rentalRequest.findUnique({
      where: { id: rentalRequestId },
    });

    if (rentalRequest?.propertyId) {
      await tx.property.update({
        where: {
          id: rentalRequest.propertyId,
        },
        data: {
          isAvailable: false,
        },
      });
    }

    return payment;
  });

  return result;
};
