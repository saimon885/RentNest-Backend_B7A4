import { Router } from "express";
import { Auth } from "../../middleware/Auth";
import { Role } from "../../../generated/prisma/enums";
import { reviewController } from "./reviews.controller";

const router = Router();
router.post("/", Auth(Role.TENANT), reviewController.addReview);

export const reviewRoutes = router;
