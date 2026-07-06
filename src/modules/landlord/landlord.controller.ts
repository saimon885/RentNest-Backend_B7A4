import { Request, Response } from "express";
import { catchAsync } from "../../utils/CathcAsync";
import { propertyService } from "../properties/properties.service";
import { landlordService } from "./landlord.service";

const createProperty = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const id = req.user.id;
  const result = await landlordService.createPropertyDB(data, id );
  res.status(201).json({
    success: true,
    message: "Property created successfully",
    data: result,
  });
});
const updateProperty = catchAsync(async (req: Request, res: Response) => {});
const deleteProperty = catchAsync(async (req: Request, res: Response) => {});
const getRequest = catchAsync(async (req: Request, res: Response) => {});
const updateRequest = catchAsync(async (req: Request, res: Response) => {});
export const landlordController = {
  createProperty,
  updateProperty,
  deleteProperty,
  getRequest,
  updateRequest,
};
