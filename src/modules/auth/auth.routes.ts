import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();
router.post("/register", authController.createUserHandler);
router.post("/login", authController.loginUserHandler);
router.get("/me", authController.myProfileHandler);
export const authRoutes = router;
