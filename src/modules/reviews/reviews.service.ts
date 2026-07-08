import { prisma } from "../../lib/prisma";
import { IaddReview } from "./reviews.interface";

const addReviewDB = async (payload: IaddReview, tenantId: string) => {
  const { comment, propertyId, rating } = payload;

  const isRented = await prisma.rentalRequest.findFirst({
    where: {
      propertyId: propertyId,
      tenantId: tenantId,
      status: "COMPLETED",
    },
  });

  if (!isRented) {
    throw new Error(
      "You cannot review a property you haven't successfully rented!",
    );
  }

  const alreadyReviewed = await prisma.review.findFirst({
    where: {
      propertyId: propertyId,
      tenantId: tenantId,
    },
  });

  if (alreadyReviewed) {
    throw new Error("You have already submitted a review for this property!");
  }

  const result = await prisma.review.create({
    data: {
      rating: Number(rating),
      comment,
      propertyId,
      tenantId,
    },
  });

  return result;
};

export const reviewService = {
  addReviewDB,
};
