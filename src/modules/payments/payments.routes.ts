import { Router } from "express";
import { Auth } from "../../middleware/Auth";
import { Role } from "../../../generated/prisma/enums";
import { paymentController } from "./payments.controller";
import { chekBanned } from "../../middleware/checkBanned";

const router = Router();
router.post(
  "/create",
  Auth(Role.TENANT),
  chekBanned,
  paymentController.createPayment,
);
router.post("/confirm", paymentController.confirmPayment);
router.get(
  "/",
  Auth(Role.TENANT),
  chekBanned,
  paymentController.getYourPayment,
);
router.get(
  "/:id",
  Auth(Role.TENANT),
  chekBanned,
  paymentController.getYourSinglePayment,
);

export const paymentrRoutes = router;
