import { Router } from "express";
import { rentalController } from "./rental.controller";
import { Auth } from "../../middleware/Auth";
import { Role } from "../../../generated/prisma/enums";
import { chekBanned } from "../../middleware/checkBanned";

const router = Router();
router.post(
  "/",
  Auth(Role.TENANT),
  chekBanned,
  rentalController.createRentalRequest,
);
router.get(
  "/",
  Auth(Role.TENANT),
  chekBanned,
  rentalController.getRentalRequest,
);
router.get(
  "/:id",
  Auth(Role.TENANT),
  chekBanned,
  rentalController.getSingleRentalRequest,
);

export const RentalRoutes = router;
