import { PropertyWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { IqueryInterface } from "./propreties.interface";

const createPropertyCategoryDB = async (categoryData: { name: string }) => {
  const { name } = categoryData;
  const existingCategory = await prisma.category.findUnique({
    where: {
      name: name,
    },
  });

  if (existingCategory) {
    throw new Error("category name already exist");
  }
  const result = await prisma.category.create({
    data: {
      name: name,
    },
  });
  return result;
};

const getAllPropertyCategoriesDB = async () => {
  const result = await prisma.category.findMany();
  return result;
};

const getAllPropertiesDB = async (query: IqueryInterface) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy ? query.sortBy : "pricePerMonth";
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";
  const andConditions: PropertyWhereInput[] = [];

  if (query?.searchTerm) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  if (query?.location) {
    andConditions.push({
      location: {
        contains: query.location,
        mode: "insensitive",
      },
    });
  }

  if (query?.minPrice || query?.maxPrice) {
    andConditions.push({
      pricePerMonth: {
        gte: query.minPrice ? Number(query.minPrice) : undefined,
        lte: query.maxPrice ? Number(query.maxPrice) : undefined,
      },
    });
  }

  if (query?.categoryId) {
    andConditions.push({
      categoryId: query.categoryId,
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.property.findMany({
    where: {
      ...whereConditions,
      isAvailable: true,
    },
    take: limit,
    skip: skip,
    orderBy: {
      [sortBy]: sortOrder,
    },
    omit: {
      categoryId: true,
    },
    include: {
      category: true,
      reviews: true,
    },
  });

  return result;
};

const getSinglePropertyDB = async (propertyId: string) => {
  const result = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
    include: {
      category: true,
    },
  });
  if (!result) {
    throw new Error("Property Not found!");
  }
  return result;
};

export const propertyService = {
  getAllPropertiesDB,
  getSinglePropertyDB,
  createPropertyCategoryDB,
  getAllPropertyCategoriesDB,
};
