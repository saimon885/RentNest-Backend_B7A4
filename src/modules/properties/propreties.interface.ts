import { PropertyWhereInput } from "../../../generated/prisma/models";

export interface IqueryInterface extends PropertyWhereInput {
  searchTerm?: string;
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  categoryId?: string;
  page?: string;
  limit?: string;
  sortOrder?: string;
  sortBy?: string;
}
