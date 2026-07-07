import { Router } from "express";
import { landlordController } from "./landlord.controller";
import { Auth } from "../../middleware/Auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/properties",
  Auth(Role.LANDLORD),
  landlordController.createProperty,
);
router.put(
  "/properties/:id",
  Auth(Role.LANDLORD),
  landlordController.updateProperty,
);
router.delete(
  "/properties/:id",
  Auth(Role.LANDLORD),
  landlordController.deleteProperty,
);
router.get("/requests", Auth(Role.LANDLORD), landlordController.getRequest);
router.patch(
  "/requests/:id",
  Auth(Role.LANDLORD),
  landlordController.updateRequest,
);

export const LandlordRoutes = router;
