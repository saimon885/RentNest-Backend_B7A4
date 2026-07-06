import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { prisma } from "../lib/prisma";

export const Auth = (...requireRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Authentication logic here
      const token = req.cookies.accessToken
        ? req.cookies.accessToken
        : req.headers.authorization?.startsWith("Bearer")
          ? req.headers.authorization.split(" ")[1]
          : req.headers.authorization;
      if (!token) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          message: "Unauthorized: No token provided",
        });
      }
      const decoded = (await jwt.verify(
        token,
        config.jwt_access_secret,
      )) as JwtPayload;
      if (!decoded) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          message: "Unauthorized: Invalid token",
        });
      }
      const user = await prisma.users.findUnique({
        where: {
          email: decoded.email,
        },
      });
      if (!user) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          message: "Unauthorized: User not found",
        });
      }
      if (requireRoles.length && !requireRoles.includes(user.role)) {
        return res.status(httpStatus.FORBIDDEN).json({
          success: false,
          message:
            "Forbidden: You do not have permission to access this resource",
        });
      }
      req.user = user;
      next();
    } catch (err: any) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Authentication failed",
        error: err,
      });
    }
  };
};
