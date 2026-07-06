import { NextFunction, Request, Response } from "express";
import httpstatus from "http-status";
export const cathcAsync = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      fn(req, res, next);
    } catch (err: any) {
      res.status(httpstatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message,
        error: err,
      });
      next(err);
    }
  };
};
