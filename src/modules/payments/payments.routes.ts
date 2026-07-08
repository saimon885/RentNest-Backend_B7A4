import { Router } from "express";
import { Auth } from "../../middleware/Auth";
import { Role } from "../../../generated/prisma/enums";
import { paymentController } from "./payments.controller";

const router = Router();
router.post("/create", Auth(Role.TENANT), paymentController.createPayment);
router.post("/confirm", paymentController.confirmPayment);

export const paymentrRoutes = router;
