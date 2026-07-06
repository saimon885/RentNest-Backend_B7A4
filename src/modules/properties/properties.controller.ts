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
const getProperties = catchAsync(async (req: Request, res: Response) => {
  const result = await propertyService.getAllPropertiesDB();
  res.status(HttpStatus.OK).json({
    success: true,
    message: "All Property retrieved successfully",
    data: result,
  });
});
const getSingleProperty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await propertyService.getSinglePropertyDB(id as string);
  res.status(HttpStatus.OK).json({
    success: true,
    message: "single Property retrieved successfully",
    data: result,
  });
});
export const propertyController = {
  getProperties,
  getSingleProperty,
  getAllPropertyCategories,
  createPropertyCategory,
};
