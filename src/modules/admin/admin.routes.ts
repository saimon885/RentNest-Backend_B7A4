import { Router } from "express";
import { adminController } from "./admin.controller";
import { Auth } from "../../middleware/Auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();
router.get("/users", Auth(Role.ADMIN), adminController.getAllUser);
router.get("/properties", Auth(Role.ADMIN), adminController.getAllProperties);
router.get("/rentals", Auth(Role.ADMIN), adminController.getAllRentalRequest);
// advanced
router.get("/states", Auth(Role.ADMIN), adminController.getAllStates);
router.patch("/users/:id", Auth(Role.ADMIN), adminController.updateUser);
export const adminRoutes = router;
