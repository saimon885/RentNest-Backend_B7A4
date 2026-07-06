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
  // Logic to get all properties from the database
};
const getSinglePropertyDB = async (propertyId: string) => {
  // Logic to get a single property from the database
};

export const propertyService = {
  getAllPropertiesDB,
  getSinglePropertyDB,
  createPropertyCategoryDB,
  getAllPropertyCategoriesDB,
};
