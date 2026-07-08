import { prisma } from "../../lib/prisma";
import { ICreateRequest } from "./rental.interface";

const createRentalRequestDB = async (
  payload: ICreateRequest,
  tenantId: string,
) => {
  const { propertyId, startDate, endDate } = payload;
  const rentalExist = await prisma.users.findUnique({
    where: {
      id: tenantId,
    },
  });
  if (!rentalExist) {
    throw new Error("Rental not found!");
  }
  const propertyExist = await prisma.property.findUnique({
    where: {
      id: payload?.propertyId,
    },
  });
  if (!propertyExist) {
    throw new Error("property not found!");
  }
  const rentalRequest = await prisma.rentalRequest.create({
    data: {
      propertyId,
      tenantId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    },
  });
  return rentalRequest;
};
const getRentalRequestDB = async (tenantId: string) => {
  const result = await prisma.rentalRequest.findMany({
    where: {
      tenantId,
    },
  });
  if (result.length === 0) {
    throw new Error("request Not found! Please added the Request.");
  }
  return result;
};
const getSingleRentalRequest = async (requestId: string, tenantId: string) => {
  const result = await prisma.rentalRequest.findFirst({
    where: {
      id: requestId,
      tenantId,
    },
  });
  // if (result?.tenantId !== tenantId) {
  //   throw new Error("You are not a owner of Request!");
  // }
  if (!result) {
    throw new Error("Request not found.");
  }

  return result;
};
export const rentalServices = {
  createRentalRequestDB,
  getRentalRequestDB,
  getSingleRentalRequest,
};
