import { apiUrl } from "../constants";
import { FilterParams } from "../types";

export const getUrl = (queryParams?: FilterParams) => {
  if (queryParams) {
    const { name, address, page, prices, sortBy, sort } = queryParams;
    return `${apiUrl}/inventories?offset=20&name=${name}&address=${address}&page=${page}
    &minPrice=${prices?.minPrice}&maxPrice=${prices?.maxPrice}&price&sortBy=${sortBy}&sort=${sort}`;
  }
  return `${apiUrl}/inventories`;
};
