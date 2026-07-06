import { Request, Response } from "express";
import { catchAsync } from "../../utils/CathcAsync";
import { propertyService } from "./properties.service";
import HttpStatus from "http-status";
const createPropertyCategory = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await propertyService.createPropertyCategoryDB(data);
    res.status(HttpStatus.CREATED).json({
      success: true,
      message: "Property category created successfully",
      data: result,
    });
  },
);
const getAllPropertyCategories = catchAsync(
  async (req: Request, res: Response) => {
    const result = await propertyService.getAllPropertyCategoriesDB();
    res.status(HttpStatus.OK).json({
      success: true,
      message: "Property categories retrieved successfully",
      data: result,
    });
  },
);
const getProperties = catchAsync(async (req: Request, res: Response) => {});
const getSingleProperty = catchAsync(async (req: Request, res: Response) => {});
export const propertyController = {
  getProperties,
  getSingleProperty,
  getAllPropertyCategories,
  createPropertyCategory,
};
