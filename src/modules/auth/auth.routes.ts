import { Router } from "express";
import { authController } from "./auth.controller";
import { Auth } from "../../middleware/Auth";
import { Role } from "../../../generated/prisma/enums";
const router = Router();

router.post("/register", authController.createUserHandler);
router.post("/login", authController.loginUserHandler);
router.get(
  "/me",
  Auth(Role.ADMIN, Role.LANDLORD, Role.TENANT),
  authController.myProfileHandler,
);
router.patch(
  "/me/update",
  Auth(Role.ADMIN, Role.LANDLORD, Role.TENANT),
  authController.updateProfile,
);
export const authRoutes = router;
