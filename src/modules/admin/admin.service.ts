import { prisma } from "../../lib/prisma";

const getAllUserDB = async () => {
  const result = await prisma.users.findMany({
    omit: {
      password: true,
    },
  });
  return result;
};
const getAllProperties = () => {};
const getAllRentals = () => {};
const getAllStates = () => {};
const updateUserBannedReq = () => {};
export const adminService = {
  getAllUserDB,
  getAllProperties,
  getAllRentals,
  getAllStates,
  updateUserBannedReq,
};
