import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import config from "../../config";
import { IcreateUser, IloginUser, IupdateUser } from "./auth.interface";

const createUserDB = async (payload: IcreateUser) => {
  const { name, email, password, role } = payload;
  if ([name, email, password].some((value) => !value.trim())) {
    throw new Error("Required fields cannot be empty");
  }
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
const loginUserDB = async (payload: IloginUser) => {
  const { email, password } = payload;

  const user = await prisma.users.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error("Invalid email!");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password!");
  }
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const accessToken = await jwt.sign(jwtPayload, config.jwt_access_secret, {
    expiresIn: config.jwt_access_expire_in,
  } as SignOptions);
  return { user, accessToken };
};
const myProfileDB = async (userId: string) => {
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
    omit: {
      password: true,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

const updateProfileDB = async (userId: string, payload: IupdateUser) => {
  const { name } = payload;
  if (!name?.trim()) {
    throw new Error("Name is required");
  }
  const updateResult = await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      name,
    },
    omit: {
      password: true,
    },
  });
  return updateResult;
};

export const authServices = {
  createUserDB,
  loginUserDB,
  myProfileDB,
  updateProfileDB,
};
