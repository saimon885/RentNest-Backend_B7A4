import express, { Application, Request, Response } from "express";
import cookieparser from "cookie-parser";
import cors from "cors";
import { authRoutes } from "./modules/auth/auth.routes";
import { LandlordRoutes } from "./modules/landlord/landlord.routes";
import { propertyRoutes } from "./modules/properties/properties.routes";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { RentalRoutes } from "./modules/rental/rental.routes";
import { adminRoutes } from "./modules/admin/admin.routes";
import { paymentrRoutes } from "./modules/payments/payments.routes";
import config from "./config";
import { reviewRoutes } from "./modules/reviews/reviews.routes";
import { notFound } from "./middleware/NotFound";
const app: Application = express();

app.use(cors({ origin: config.app_url, credentials: true }));
app.use("/api/payments/confirm", express.raw({ type: "application/json" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/landlord", LandlordRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/rentals", RentalRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentrRoutes);
app.use("/api/reviews", reviewRoutes);

app.use(notFound);
app.use(globalErrorHandler);
export default app;
