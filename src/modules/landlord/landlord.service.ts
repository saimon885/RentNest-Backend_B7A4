import { prisma } from "../../lib/prisma";
import {
  IcreateProperty,
  IupdateProperty,
  IUpdateRequest,
} from "./landlord.interface";

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

  if (!title.trim() || !description.trim() || !location.trim()) {
    throw new Error("Required fields cannot be empty");
  }

  if (pricePerMonth <= 0) {
    throw new Error("Invalid price");
  }

  if (!amenities.length) {
    throw new Error("Amenities are required");
  }

  if (!images.length) {
    throw new Error("Images are required");
  }

  if (!categoryId.trim()) {
    throw new Error("Category is required");
  }
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

const getMyPropertyDb = async (landLordId: string) => {
  const result = await prisma.property.findMany({
    where: {
      landlordId: landLordId,
    },
    include: {
      category: {
        omit: {
          id: true,
          createdAt: true,
        },
      },
      reviews: true,
      rentalRequest: {
        omit: {
          updatedAt: true,
        },
      },
    },
  });
  if (result.length === 0) {
    throw new Error("Your properties not available .. please add Properties.");
  }
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
  const existingProperty = await prisma.property.findFirst({
    where: {
      landlordId: landLordId,
      title: payload.title,
      location: payload.location,
      pricePerMonth: payload.pricePerMonth,
    },
  });

  if (existingProperty) {
    throw new Error("This property already exists.");
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
const getLandlordRequestsDB = async (landlordId: string) => {
  const result = await prisma.rentalRequest.findMany({
    where: {
      property: {
        landlordId: landlordId,
      },
    },
    omit: {
      createdAt: true,
      updatedAt: true,
      propertyId: true,
    },
    include: {
      property: true,
    },
  });
  if (result.length === 0) {
    throw new Error("not Available Request. please add Properties.");
  }
  return result;
};
const updateRequestDB = async (
  requestId: string,
  requestData: IUpdateRequest,
  loginLandlordId: string,
) => {
  const rentalRequest = await prisma.rentalRequest.findUnique({
    where: { id: requestId },
    include: {
      property: true,
    },
  });

  if (!rentalRequest) {
    throw new Error("Rental Request not Found!");
  }

  if (rentalRequest.property.landlordId !== loginLandlordId) {
    throw new Error(
      "You are not the owner of this property. You cannot update this request!",
    );
  }
  const result = await prisma.rentalRequest.update({
    where: {
      id: requestId,
    },
    data: {
      status: requestData.status,
    },
  });
  if (result.id !== requestId) {
    throw new Error("Request not Found!");
  }
  return result;
};

export const landlordService = {
  createPropertyDB,
  getMyPropertyDb,
  updatePropertyDB,
  deletePropertyDB,
  getLandlordRequestsDB,
  updateRequestDB,
};
