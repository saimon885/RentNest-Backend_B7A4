import { prisma } from "../../lib/prisma";
import { IcreateProperty, IupdateProperty } from "./landlord.interface";

const createPropertyDB = async (
  payload: IcreateProperty,
  userId: string,
  isLandlord: boolean,
) => {
  const {
    title,
    description,
    location,
    pricePerMonth,
    amenities,
    images,
    categoryId,
  } = payload;
  if (!isLandlord) {
    throw new Error("You are not a Landlord!");
  }
  const result = await prisma.property.create({
    data: {
      title,
      description,
      location,
      pricePerMonth,
      amenities,
      images,
      categoryId,
      landlordId: userId,
    },
    include: {
      category: true,
    },
  });

  return result;
};

const updatePropertyDB = async (
  propertyId: string,
  payload: IupdateProperty,
  landLordId: string,
  isLandlord: boolean,
) => {
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });
  if (!property) {
    throw new Error("Property not found!");
  }
  if (!isLandlord || property.landlordId !== landLordId) {
    throw new Error("You are not a Owner of Property!");
  }
  const result = await prisma.property.update({
    where: {
      id: propertyId,
    },
    data: {
      ...payload,
    },
  });
  return result;
};

const deletePropertyDB = async (
  propertyId: string,
  landLordId: string,
  isLandlord: boolean,
) => {
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });
  if (!property) {
    throw new Error("Property Not Found!");
  }
  if (!isLandlord || property.landlordId !== landLordId) {
    throw new Error("You are not a Owner of Property!");
  }
  const result = await prisma.property.delete({
    where: {
      id: propertyId,
    },
  });
  return result;
};
const getRequestDB = async () => {
  const result = await prisma.rentalRequest.findMany({
    omit: {
      createdAt: true,
      updatedAt: true,
      propertyId: true,
    },
    include: {
      property: true,
    },
  });
  return result;
};
const updateRequestDB = async (requestId: string, requestData: any) => {
  
};

export const landlordService = {
  createPropertyDB,
  updatePropertyDB,
  deletePropertyDB,
  getRequestDB,
  updateRequestDB,
};
