const createPropertyDB = async (payload: any) => {
  // const 
};
const updatePropertyDB = async (propertyId: string, propertyData: any) => {
  // Logic to update a property in the database
};
const deletePropertyDB = async (propertyId: string) => {
  // Logic to delete a property from the database
};
const getRequestDB = async (requestId: string) => {
  // Logic to get a request from the database
};
const updateRequestDB = async (requestId: string, requestData: any) => {
  // Logic to update a request in the database
};

export const landlordService = {
  createPropertyDB,
  updatePropertyDB,
  deletePropertyDB,
  getRequestDB,
  updateRequestDB,
};
