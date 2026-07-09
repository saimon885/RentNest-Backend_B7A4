import { Router } from "express";
import { landlordController } from "./landlord.controller";
import { Auth } from "../../middleware/Auth";
import { Role } from "../../../generated/prisma/enums";
import { chekBanned } from "../../middleware/checkBanned";

const router = Router();

router.post(
  "/properties",
  Auth(Role.LANDLORD),
  chekBanned,
  landlordController.createProperty,
);
router.get(
  "/properties/my",
  Auth(Role.LANDLORD),
  chekBanned,
  landlordController.getMyProperty,
);
router.get(
  "/requests",
  Auth(Role.LANDLORD),
  chekBanned,
  landlordController.getRequest,
);
router.put(
  "/properties/:id",
  Auth(Role.LANDLORD),
  chekBanned,
  landlordController.updateProperty,
);
router.delete(
  "/properties/:id",
  Auth(Role.LANDLORD),
  chekBanned,
  landlordController.deleteProperty,
);

router.patch(
  "/requests/:id",
  Auth(Role.LANDLORD),
  chekBanned,
  landlordController.updateRequest,
);

export const LandlordRoutes = router;
