import { Request, Response } from "express";
import { catchAsync } from "../../utils/CathcAsync";
import { propertyService } from "../properties/properties.service";
import { landlordService } from "./landlord.service";
import httpstatus from "http-status";
const createProperty = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const user = req.user;
  const id = user.id;
  const role = user.role === "LANDLORD";
  const result = await landlordService.createPropertyDB(data, id, role);
  res.status(httpstatus.CREATED).json({
    success: true,
    message: "Property created successfully",
    data: result,
  });
});

const updateProperty = catchAsync(async (req: Request, res: Response) => {
  const propertyId = req.params.id;
  const payload = req.body;
  const user = req.user;
  const landLordId = user.id;
  const isLandLord = user.role === "LANDLORD";
  const result = await landlordService.updatePropertyDB(
    propertyId as string,
    payload,
    landLordId,
    isLandLord,
  );
  res.status(httpstatus.OK).json({
    success: true,
    message: "Property Update successfully",
    data: result,
  });
});
const deleteProperty = catchAsync(async (req: Request, res: Response) => {
  const propertyId = req.params.id;
  const user = req.user;
  const landLordId = user.id;
  const isLandLord = user.role === "LANDLORD";
  await landlordService.deletePropertyDB(
    propertyId as string,
    landLordId,
    isLandLord,
  );
  res.status(httpstatus.OK).json({
    success: true,
    message: "Property Delete successfully",
    data: null,
  });
});
const getRequest = catchAsync(async (req: Request, res: Response) => {});
const updateRequest = catchAsync(async (req: Request, res: Response) => {});
export const landlordController = {
  createProperty,
  updateProperty,
  deleteProperty,
  getRequest,
  updateRequest,
};
