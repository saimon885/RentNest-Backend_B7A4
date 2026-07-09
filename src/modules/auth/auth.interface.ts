import { Role } from "../../../generated/prisma/enums";

export interface IcreateUser {
  name: string;
  email: string;
  password: string;
  role: Role;
}
export interface IupdateUser {
  name?: string;
}
export interface IloginUser {
  email: string;
  password: string;
}
