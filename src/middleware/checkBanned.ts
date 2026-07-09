import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const chekBanned = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.user.id;
  const user = await prisma.users.findUnique({
    where: {
      id: id,
    },
  });
  if (user && user.isBanned) {
    return res.status(403).json({
      success: false,
      message: "Your account has been banned. Please contact administration.",
      data: null,
    });
  }
  next();
};
