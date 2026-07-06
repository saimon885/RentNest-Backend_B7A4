import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";

const createUserDB = async (payload: any) => {
  const { name, email, password, role } = payload;
  const allowedRoles = ["LANDLORD", "TENANT"];

  if (!allowedRoles.includes(role)) {
    throw new Error("Invalid role");
  }
  const userExists = await prisma.users.findUnique({
    where: { email },
  });
  if (userExists) {
    throw new Error("User already exists");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await prisma.users.create({
    data: {
      name,
      email,
      password: hashPassword,
      role,
    },
  });
  return user;
};
const loginUserDB = async (payload: any) => {};
const myProfileDB = async (payload: any) => {};
export const authServices = {
  createUserDB,
  loginUserDB,
  myProfileDB,
};
