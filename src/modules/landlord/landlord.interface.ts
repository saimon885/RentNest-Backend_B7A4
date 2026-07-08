import { ReqStatus } from "../../../generated/prisma/enums";

export interface IcreateProperty {
  title: string;
  description: string;
  location: string;
  pricePerMonth: number;
  amenities: string[];
  images: string[];
  categoryId: string;
}
export interface IupdateProperty {
  title?: string;
  description?: string;
  location?: string;
  pricePerMonth?: number;
  amenities?: string[];
  images?: string[];
}

export interface IUpdateRequest {
  status: ReqStatus;
}
