import { Router } from "express";
import { propertyController } from "./properties.controller";
import { Auth } from "../../middleware/Auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/categories",
  Auth(Role.ADMIN),
  propertyController.createPropertyCategory,
);
router.get("/categories", propertyController.getAllPropertyCategories);
router.get("/properties", propertyController.getProperties);
router.get("/properties/:id", propertyController.getSingleProperty);
export const propertyRoutes = router;
