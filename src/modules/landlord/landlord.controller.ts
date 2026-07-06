import { Request, Response } from "express";
import { cathcAsync } from "../../utils/CathcAsync";

const createProperty = cathcAsync(async (req: Request, res: Response) => {});
const updateProperty = cathcAsync(async (req: Request, res: Response) => {});
const deleteProperty = cathcAsync(async (req: Request, res: Response) => {});
const getRequest = cathcAsync(async (req: Request, res: Response) => {});
const updateRequest = cathcAsync(async (req: Request, res: Response) => {});
export const landlordController = {
  createProperty,
  updateProperty,
  deleteProperty,
  getRequest,
  updateRequest,
};
