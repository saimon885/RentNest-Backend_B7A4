import { Router } from "express";
import { rentalController } from "./rental.controller";
import { Auth } from "../../middleware/Auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();
router.post("/", Auth(Role.TENANT), rentalController.createRentalRequest);
router.get("/", Auth(Role.TENANT), rentalController.getRentalRequest);
router.get("/:id", Auth(Role.TENANT), rentalController.getSingleRentalRequest);

export const RentalRoutes = router;
