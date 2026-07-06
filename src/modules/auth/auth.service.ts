import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import config from "../../config";
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
const loginUserDB = async (payload: any) => {
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
const myProfileDB = async (payload: any) => {};
export const authServices = {
  createUserDB,
  loginUserDB,
  myProfileDB,
};
