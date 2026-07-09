import { Router } from "express";
import { Auth } from "../../middleware/Auth";
import { Role } from "../../../generated/prisma/enums";
import { reviewController } from "./reviews.controller";
import { chekBanned } from "../../middleware/checkBanned";

const router = Router();
router.post("/", Auth(Role.TENANT), chekBanned, reviewController.addReview);

export const reviewRoutes = router;
