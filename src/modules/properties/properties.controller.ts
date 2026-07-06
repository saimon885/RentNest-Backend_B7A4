import { Request, Response } from "express";
import { cathcAsync } from "../../utils/CathcAsync";

const getProperties = cathcAsync(async (req: Request, res: Response) => {});
const getSingleProperty = cathcAsync(async (req: Request, res: Response) => {});
const getAllPropertyCategories = cathcAsync(
  async (req: Request, res: Response) => {},
);

export const propertyController = {
  getProperties,
  getSingleProperty,
  getAllPropertyCategories,
};
