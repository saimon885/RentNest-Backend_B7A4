import { Router } from "express";
import { propertyController } from "./properties.controller";

const router = Router();
router.get("/properties", propertyController.getProperties);
router.get("/properties/:id", propertyController.getSingleProperty);
router.get("/property-categories", propertyController.getAllPropertyCategories);
export const propertyRoutes = router;
