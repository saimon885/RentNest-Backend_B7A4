import { Request, Response } from "express";
import { catchAsync } from "../../utils/CathcAsync";
import { reviewService } from "./reviews.service";
import httpStatus from "http-status";
const addReview = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const tenantId = req.user.id;
  const result = await reviewService.addReviewDB(payload, tenantId);
  res.status(httpStatus.CREATED).json({
    success: true,
    messege: "Review Created SuccessFull.",
    data: result,
  });
});

export const reviewController = {
  addReview,
};
