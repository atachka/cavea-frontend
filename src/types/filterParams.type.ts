export interface FilterParams {
  name?: string;
  address?: string;
  page?: string | null;
  prices?: {
    minPrice?: string;
    maxPrice?: string;
  };
  sortBy: string;
  sort: string;
}
