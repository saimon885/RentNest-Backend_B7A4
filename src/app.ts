import express, { Request, Response } from "express";
import cookieparser from "cookie-parser";
import { authRoutes } from "./modules/auth/auth.routes";
import { LandlordRoutes } from "./modules/landlord/landlord.routes";
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/landlord", LandlordRoutes);
