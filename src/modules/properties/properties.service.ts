import { prisma } from "../../lib/prisma";

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

const getAllPropertiesDB = async () => {
  const result = await prisma.property.findMany();
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
