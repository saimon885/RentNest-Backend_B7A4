import { prisma } from "../../lib/prisma";

const getAllUserDB = async () => {
  const result = await prisma.users.findMany({
    omit: {
      password: true,
    },
  });
  return result;
};
const getAllProperties = async () => {
  const result = await prisma.property.findMany();
  return result;
};
const getAllRentals = async () => {
  const result = await prisma.rentalRequest.findMany();
  return result;
};
const getAllStates = async () => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    const [
      totalUsers,
      TotalAdmin,
      TotalLandLord,
      TotalTenant,
      totalProperty,
      totalCategory,
      totalRentalRequest,
    ] = await Promise.all([
      await tx.users.count(),
      await tx.users.count({
        where: {
          role: "ADMIN",
        },
      }),
      await tx.users.count({
        where: {
          role: "LANDLORD",
        },
      }),
      await tx.users.count({
        where: {
          role: "TENANT",
        },
      }),
      await tx.property.count(),
      await tx.category.count(),
      await tx.rentalRequest.count(),
    ]);
    return {
      totalUsers,
      TotalAdmin,
      TotalLandLord,
      TotalTenant,
      totalProperty,
      totalCategory,
      totalRentalRequest,
    };
  });
  return transactionResult;
};
const updateUserBannedReq = () => {};
export const adminService = {
  getAllUserDB,
  getAllProperties,
  getAllRentals,
  getAllStates,
  updateUserBannedReq,
};
