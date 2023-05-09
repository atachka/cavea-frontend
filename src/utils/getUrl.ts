import { apiUrl } from "../constants";
import { FilterParams } from "../types";

export const getUrl = (queryParams?: FilterParams) => {
  if (queryParams) {
    const { name, address, page, prices } = queryParams;
    return `${apiUrl}/inventory?offset=20&name=${name}&address=${address}&page=${page}
    &minPrice=${prices?.minPrice}&maxPrice=${prices?.maxPrice}`;
  }
  return `${apiUrl}/inventory`;
};
