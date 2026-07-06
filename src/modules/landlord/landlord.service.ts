import { prisma } from "../../lib/prisma";
import { IcreateProperty } from "./landlord.interface";

const createPropertyDB = async (payload: IcreateProperty, userId: string) => {
  const {
    title,
    description,
    location,
    pricePerMonth,
    amenities,
    images,
    categoryId,
  } = payload;
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
const updatePropertyDB = async (propertyId: string, propertyData: any) => {
  // Logic to update a property in the database
};
const deletePropertyDB = async (propertyId: string) => {
  // Logic to delete a property from the database
};
const getRequestDB = async (requestId: string) => {
  // Logic to get a request from the database
};
const updateRequestDB = async (requestId: string, requestData: any) => {
  // Logic to update a request in the database
};

export const landlordService = {
  createPropertyDB,
  updatePropertyDB,
  deletePropertyDB,
  getRequestDB,
  updateRequestDB,
};
