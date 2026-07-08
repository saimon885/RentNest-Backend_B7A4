import { Router } from "express";
import { Auth } from "../../middleware/Auth";
import { Role } from "../../../generated/prisma/enums";
import { paymentController } from "./payments.controller";

const router = Router();
router.post("/create", Auth(Role.TENANT), paymentController.createPayment);
router.post("/confirm", paymentController.confirmPayment);
router.get("/", Auth(Role.TENANT), paymentController.getYourPayment);
router.get("/:id", Auth(Role.TENANT), paymentController.getYourSinglePayment);

export const paymentrRoutes = router;
