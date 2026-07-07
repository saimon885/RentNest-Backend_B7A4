import { prisma } from "../../lib/prisma";
import { IUserBannedPayload } from "./admin.interface";

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

const updateUserBannedReq = async (
  userId: string,
  payload: IUserBannedPayload,
  adminId: string,
) => {
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new Error("User not found!");
  }
  if (user.id === adminId) {
    throw new Error("You cannot ban yourself!");
  }
  if (user.role === "ADMIN") {
    throw new Error("You cannot ban another Admin!");
  }
  if (user.isBanned === payload.isBanned) {
    throw new Error(
      `User is already ${payload.isBanned ? "Banned" : "UnBanned"}!`,
    );
  }
  const result = await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      isBanned: payload.isBanned,
    },
  });
  return result;
};
export const adminService = {
  getAllUserDB,
  getAllProperties,
  getAllRentals,
  getAllStates,
  updateUserBannedReq,
};
